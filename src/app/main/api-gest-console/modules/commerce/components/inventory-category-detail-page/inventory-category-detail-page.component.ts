import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryCategoryDTO, InventoryCategoryResourceService, InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryCategoryNewUpdateModalComponent } from '../inventory-category-new-update-modal/inventory-category-new-update-modal.component';

@Component({
    selector: 'aig-inventory-category-detail-page',
    templateUrl: './inventory-category-detail-page.component.html',
    styleUrls: ['./inventory-category-detail-page.component.scss']
})
export class AigInventoryCategoryDetailPageComponent extends GenericComponent {
    constructor(

        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
        private inventoryItemResourceService: InventoryItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryCategoryDTO: InventoryCategoryDTO;

    loadPage() {
        this.inventoryCategoryDTO = this.route.snapshot.data.inventoryCategory;
        this.loadOther();
    }

    async reloadPage() {
        this.inventoryCategoryDTO = await this.inventoryCategoryResourceService.getInventoryCategoryUsingGET(this.inventoryCategoryDTO.id).toPromise();
        this.loadOther();
    }

    async loadOther() {
        this.loadInventoryItem();
    }

    editInventoryCategory(inventoryCategoryDTO: InventoryCategoryDTO) {
        this.dialog.open(AigInventoryCategoryNewUpdateModalComponent, { data: { inventoryCategory: inventoryCategoryDTO } });
    }

    async deleteInventoryCategory(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.inventoryCategoryResourceService.deleteInventoryCategoryUsingDELETE(id).toPromise();

            this._snackBar.open(`Inventory Category: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/commerce', 'inventory-category']);
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory category: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    inventoryItemDC: string[] = ["id", "name", "producerName", "buttons"];
    inventoryItemDTOs: InventoryItemDTO[];
    inventoryItemError: any;
    async loadInventoryItem() {
        let filters = {
            inventoryCategoryIDEquals: this.inventoryCategoryDTO.id
        };
        try {
            this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(filters).toPromise();
        } catch (e) {
            this.inventoryItemError = e;
        }
    }
}
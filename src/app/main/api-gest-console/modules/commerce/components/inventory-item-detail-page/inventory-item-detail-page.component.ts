import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService, InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from '../inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';
import { AigInventoryItemDialogComponent } from '../inventory-item-dialog/inventory-item-dialog.component';

@Component({
    selector: 'aig-inventory-item-detail-page',
    templateUrl: './inventory-item-detail-page.component.html',
    styleUrls: ['./inventory-item-detail-page.component.scss']
})
export class AigInventoryItemDetailPageComponent extends AigCommerceGenericComponent {
   
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private inventoryItemResourceService: InventoryItemResourceService,
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemDTO: InventoryItemDTO;

    loadPage() {
        this.inventoryItemDTO = this.route.snapshot.data.inventoryItem;
        this.loadOther();
    }

    async reloadPage() {
        this.inventoryItemDTO = await this.inventoryItemResourceService.getInventoryItemUsingGET(this.inventoryItemDTO.id).toPromise();
        this.loadOther();
    }

    async loadOther() {
        this.loadInventoryItemCombination();
    }

    editInventoryItem(inventoryItemDTO: InventoryItemDTO) {
        this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: inventoryItemDTO } });
    }

    async deleteInventoryItem(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.inventoryItemResourceService.deleteInventoryItemUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Inventory Item: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/commerce', 'inventory-item']);
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

      inventoryItemCombinationDTOs: InventoryItemCombinationDTO[];
      inventoryItemCombinationDC: string[] = ["id", "name", "combinationCode","buttons"];
      inventoryItemCombinationError: any;

      async loadInventoryItemCombination() {
        let filters = {
            inventoryItemIDEquals: this.inventoryItemDTO.id
        };
        try {
            this.inventoryItemCombinationDTOs = await this.inventoryItemCombinationResourceService.getAllInventoryItemCombinationsUsingGET(filters).toPromise();
        } catch (e) {
            this.inventoryItemCombinationError = e;
        }
    }

    addInventoryItemCombination(inventoryItemDTO: InventoryItemDTO) {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: { }, inventoryItem: inventoryItemDTO } });
    }
}
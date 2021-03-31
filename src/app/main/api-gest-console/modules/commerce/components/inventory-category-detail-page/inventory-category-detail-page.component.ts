import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
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
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryCategoryDTO: InventoryCategoryDTO;

    loadPage() {
        this.inventoryCategoryDTO = this.route.snapshot.data.inventoryCategory;
    }

    async reloadPage() {
		this.inventoryCategoryDTO = await this.inventoryCategoryResourceService.getInventoryCategoryUsingGET(this.inventoryCategoryDTO.id).toPromise();
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
    

    editInventoryCategory(inventoryCategoryDTO: InventoryCategoryDTO) {
        this.dialog.open(AigInventoryCategoryNewUpdateModalComponent, { data: { inventoryCategory: inventoryCategoryDTO } });
    }
}
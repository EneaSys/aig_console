import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
<<<<<<< HEAD
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService, InventoryItemResourceService } from 'aig-commerce';
=======
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService } from 'aig-commerce';
>>>>>>> db1fff705ea594c3e9b6bf1b5f9fcdd13115106c
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from '../inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';

@Component({
    selector: 'aig-inventory-item-combination-detail-page',
    templateUrl: './inventory-item-combination-detail-page.component.html',
    styleUrls: ['./inventory-item-combination-detail-page.component.scss']
})
export class AigInventoryItemCombinationDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
<<<<<<< HEAD
        private inventoryItemResourceService: InventoryItemResourceService,
=======
>>>>>>> db1fff705ea594c3e9b6bf1b5f9fcdd13115106c
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemCombinationDTO: InventoryItemCombinationDTO;

    loadPage() {
        this.inventoryItemCombinationDTO = this.route.snapshot.data.inventoryItemCombination;
        console.log(this.inventoryItemCombinationDTO);
    }

    async reloadPage() {
		this.inventoryItemCombinationDTO = await this.inventoryItemCombinationResourceService.getInventoryItemCombinationUsingGET(this.inventoryItemCombinationDTO.id).toPromise();
	}

    async deleteInventoryItemCombination(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.inventoryItemCombinationResourceService.deleteInventoryItemCombinationUsingDELETE(id).toPromise();
    
<<<<<<< HEAD
            this._snackBar.open(`Inventory Item Combination: '${id}' deleted.`, null, { duration: 2000, });
=======
            this._snackBar.open(`Inventory item combination: '${id}' deleted.`, null, { duration: 2000, });
>>>>>>> db1fff705ea594c3e9b6bf1b5f9fcdd13115106c
            
            this.router.navigate(['/commerce', 'inventory-item-combination']);
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory item combination: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

<<<<<<< HEAD

=======
>>>>>>> db1fff705ea594c3e9b6bf1b5f9fcdd13115106c
    editInventoryItemCombination(inventoryItemCombinationDTO: InventoryItemCombinationDTO) {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: inventoryItemCombinationDTO } });
    }
}

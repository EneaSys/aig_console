import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService } from 'aig-commerce';
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
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemCombinationDTO: InventoryItemCombinationDTO;

    loadPage() {
        this.inventoryItemCombinationDTO = this.route.snapshot.data.inventoryItemCombination;
    }

    async reloadPage() {
		this.inventoryItemCombinationDTO = await this.inventoryItemCombinationResourceService.getInventoryItemCombinationUsingGET(this.inventoryItemCombinationDTO.id).toPromise();
	}

    async deleteInventoryItemCombination(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.inventoryItemCombinationResourceService.deleteInventoryItemCombinationUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Inventory item combination: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/commerce', 'inventory-item', 'detail', 'inventoryItemCombinationDTO.inventoryItemId' ]);
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory item combination: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editInventoryItemCombination(inventoryItemCombinationDTO: InventoryItemCombinationDTO) {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: inventoryItemCombinationDTO } });
    }
}

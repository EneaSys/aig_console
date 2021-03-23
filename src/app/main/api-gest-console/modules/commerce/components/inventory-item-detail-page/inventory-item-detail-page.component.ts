import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService, InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from '../inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';
import { AigInventoryItemDialogComponent } from '../inventory-item-dialog/inventory-item-dialog.component';

@Component({
    selector: 'aig-inventory-item-detail-page',
    templateUrl: './inventory-item-detail-page.component.html',
    styleUrls: ['./inventory-item-detail-page.component.scss']
})
export class AigInventoryItemDetailPageComponent extends GenericComponent {
   
    
    
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

    inventoryItemCombinationDTOs: InventoryItemCombinationDTO[];
    inventoryItemCombinationDC: string[];
    inventoryItemCombinationError: any;

    loadPage() {
        this.inventoryItemDTO = this.route.snapshot.data.inventoryItem;
        this.inventoryItemCombinationDC = ["id", "name", "combinationCode"];
        this.loadInventoryItemCombination();
    }

    private async loadInventoryItemCombination() {
        let filter = {
            inventoryItemIdEquals: this.inventoryItemDTO.id
        };
        this.inventoryItemCombinationDTOs = await this.inventoryItemCombinationResourceService.getAllInventoryItemCombinationsUsingGET(filter).toPromise();
    }
    

    async reloadPage() {
        this.inventoryItemDTO = await this.inventoryItemResourceService.getInventoryItemUsingGET(this.inventoryItemDTO.id).toPromise();
        this.loadInventoryItemCombination()
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


    editInventoryItem(inventoryItemDTO: InventoryItemDTO) {
        this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: inventoryItemDTO } });
    }

    newInventoryItemCombination(): void {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: { inventoryItemCombination: this.inventoryItemCombinationDTOs } } });
    }
}


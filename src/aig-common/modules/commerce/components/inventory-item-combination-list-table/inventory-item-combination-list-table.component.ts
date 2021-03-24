import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';

@Component({
    selector: 'aig-inventory-item-combination-list-table',
    templateUrl: './inventory-item-combination-list-table.component.html',
    styleUrls: ['./inventory-item-combination-list-table.component.scss']
})
export class AigInventoryItemCombinationListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteInventoryItemCombination(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.inventoryItemCombinationResourceService.deleteInventoryItemCombinationUsingDELETE(id).toPromise();
            this._snackBar.open(`Inventory Item: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editInventoryItemCombination(inventoryItemCombinationDTO: InventoryItemCombinationDTO) {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: inventoryItemCombinationDTO } });
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigInventoryItemDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/inventory-item-dialog/inventory-item-dialog.component';

@Component({
    selector: 'aig-inventory-item-list-table',
    templateUrl: './inventory-item-list-table.component.html',
    styleUrls: ['./inventory-item-list-table.component.scss']
})
export class AigInventoryItemListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private inventoryItemResourceService: InventoryItemResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteInventoryItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.inventoryItemResourceService.deleteInventoryItemUsingDELETE(id).toPromise();
            this._snackBar.open(`Inventory Item: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editInventoryItem(inventoryItemDTO: InventoryItemDTO) {
        this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: inventoryItemDTO } });
    }
}


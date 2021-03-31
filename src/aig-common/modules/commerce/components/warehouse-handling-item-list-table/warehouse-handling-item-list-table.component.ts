import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigWarehouseHandlingItemNewUpdateModalComponent } from 'app/main/api-gest-console/modules/commerce/components/warehouse-handling-item-new-update-modal/warehouse-handling-item-new-update-modal.component';

@Component({
    selector: 'aig-warehouse-handling-item-list-table',
    templateUrl: './warehouse-handling-item-list-table.component.html',
    styleUrls: ['./warehouse-handling-item-list-table.component.scss']
})
export class AigWarehouseHandlingItemListTableComponent implements OnInit, OnChanges {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private warehouseHandlingItemResourceService : WarehouseHandlingItemResourceService, 
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteWarehouseHandlingItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.warehouseHandlingItemResourceService.deleteWarehouseHandlingItemUsingDELETE(id).toPromise();
            this._snackBar.open(`Warehouse Handling Item: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Warehouse Handling item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editWarehouseHandlingItem(warehouseHandlingItemDTO: WarehouseHandlingItemDTO) {
        this.dialog.open(AigWarehouseHandlingItemNewUpdateModalComponent, { data: { warehouseHandlingItem: warehouseHandlingItemDTO } });
    }

	ngOnChanges(changes: SimpleChanges): void {
	}
}

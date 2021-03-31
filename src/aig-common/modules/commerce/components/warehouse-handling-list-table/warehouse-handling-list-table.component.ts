import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigWarehouseHandlingNewUpdateModalComponent } from 'app/main/api-gest-console/modules/commerce/components/warehouse-handling-new-update-modal/warehouse-handling-new-update-modal.component';

@Component({
    selector: 'aig-warehouse-handling-list-table',
    templateUrl: './warehouse-handling-list-table.component.html',
    styleUrls: ['./warehouse-handling-list-table.component.scss']
})
export class AigWarehouseHandlingListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { } 

    async deleteWarehouseHandling(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.warehouseHandlingResourceService.deleteWarehouseHandlingUsingDELETE(id).toPromise();
            this._snackBar.open(`Warehouse handling: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting warehouse handling: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editWarehouseHandling(warehouseHandlingDTO: WarehouseHandlingDTO) {
        this.dialog.open(AigWarehouseHandlingNewUpdateModalComponent, { data: { warehouseHandling: warehouseHandlingDTO } });
    }
}
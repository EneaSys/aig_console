import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigWarehouseNewUpdateModalComponent } from 'app/main/api-gest-console/modules/commerce/components/warehouse-new-update-modal/warehouse-new-update-modal.component';

@Component({
    selector: 'aig-warehouse-list-table',
    templateUrl: './warehouse-list-table.component.html',
    styleUrls: ['./warehouse-list-table.component.scss']
})
export class AigWarehouseListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private warehouseResourceService: WarehouseResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteWarehouse(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.warehouseResourceService.deleteWarehouseUsingDELETE(id).toPromise();
            this._snackBar.open(`Warehouse: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting warehouse: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editWarehouseHandling(warehouseDTO: WarehouseDTO) {
        this.dialog.open(AigWarehouseNewUpdateModalComponent, { data: { warehouse: warehouseDTO } });
    }
}

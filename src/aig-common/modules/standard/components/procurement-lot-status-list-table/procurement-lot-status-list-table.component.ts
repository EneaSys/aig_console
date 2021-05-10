import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpProcurementLotStatusDTO, IlPpProcurementLotStatusResourceService, IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';
import { AigProcurementLotStatusNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/procurement-lot-status-new-update-dialog/procurement-lot-status-new-update-dialog.component';
import { AigProcurementStatusNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/procurement-status-new-update-dialog/procurement-status-new-update-dialog.component';

@Component({
    selector: 'aig-procurement-lot-status-list-table',
    templateUrl: './procurement-lot-status-list-table.component.html',
    styleUrls: ['./procurement-lot-status-list-table.component.scss']
})
export class AigProcurementLotStatusListTableComponent implements OnInit {
    constructor(
        private procurementLotStatusResourceService: IlPpProcurementLotStatusResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }
    
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteProcurementLotStatus(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.procurementLotStatusResourceService.deleteIlPpProcurementLotStatusUsingDELETE(id).toPromise();
            this._snackBar.open(`Procurement Lot Status: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Procurement Lot Status: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editProcurementLotStatus(procurementLotStatusDTO: IlPpProcurementLotStatusDTO) {
        this.dialog.open(AigProcurementLotStatusNewUpdateDialogComponent, { data: { procurementLotStatus: procurementLotStatusDTO } });
    }
}

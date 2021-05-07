import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpPartecipationTypeDTO, IlPpPartecipationTypeResourceService, IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';
import { AigPartecipationTypeNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/partecipation-type-new-update-dialog/partecipation-type-new-update-dialog.component';
import { AigProcurementStatusNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/procurement-status-new-update-dialog/procurement-status-new-update-dialog.component';

@Component({
    selector: 'aig-procurement-status-list-table',
    templateUrl: './procurement-status-list-table.component.html',
    styleUrls: ['./procurement-status-list-table.component.scss']
})
export class AigProcurementStatusListTableComponent implements OnInit {
    constructor(
        private procurementStatusResourceService: IlPpProcurementStatusResourceService,
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

    async deleteProcurementStatus(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.procurementStatusResourceService.deleteIlPpProcurementStatusUsingDELETE(id).toPromise();
            this._snackBar.open(`Procurement Status: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Procurement Status: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editProcurementStatus(procurementStatusDTO: IlPpProcurementStatusDTO) {
        this.dialog.open(AigProcurementStatusNewUpdateDialogComponent, { data: { procurementStatus: procurementStatusDTO } });
    }
}

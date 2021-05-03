import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpProcurementProcedureDTO, IlPpProcurementProcedureResourceService } from 'aig-standard';
import { AigIppProcedureNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/ipp-procedure-new-update-modal/ipp-procedure-new-update-modal.component';

@Component({
    selector: 'aig-ipp-procedure-list-table',
    templateUrl: './ipp-procedure-list-table.component.html',
    styleUrls: ['./ipp-procedure-list-table.component.scss']
})
export class AigIppProcedureListTableComponent implements OnInit {
    constructor(
        private ippProcedureResourceService: IlPpProcurementProcedureResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteIppProcedure(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.ippProcedureResourceService.deleteIlPpProcurementProcedureUsingDELETE(id).toPromise();
            this._snackBar.open(`Ipp Procedure: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting ipp procedure: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editIppProcedure(IppProcedureDTO: IlPpProcurementProcedureDTO) {
        this.dialog.open(AigIppProcedureNewUpdateModalComponent, { data: { ippProcedure: IppProcedureDTO } });
    }
}


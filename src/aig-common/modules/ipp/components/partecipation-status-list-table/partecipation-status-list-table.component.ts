import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import {PartecipationStatusDTO, PartecipationStatusResourceService } from 'aig-italianlegislation';
import { AigPartecipationStatusNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/partecipation-status-new-update-dialog/partecipation-status-new-update-dialog.component';

@Component({
    selector: 'aig-partecipation-status-list-table',
    templateUrl: './partecipation-status-list-table.component.html',
    styleUrls: ['./partecipation-status-list-table.component.scss']
})
export class AigPartecipationStatusListTableComponent implements OnInit {
    constructor(
        private partecipationStatusResourceService: PartecipationStatusResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deletePartecipationStatus(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.partecipationStatusResourceService.deletePartecipationStatusUsingDELETE(id).toPromise();
            this._snackBar.open(`PartecipationStatus: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting partecipation status: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPartecipationStatus(partecipationStatusDTO: PartecipationStatusDTO) {
        this.dialog.open(AigPartecipationStatusNewUpdateDialogComponent, { data: {partecipationStatus: partecipationStatusDTO } });
    }
}



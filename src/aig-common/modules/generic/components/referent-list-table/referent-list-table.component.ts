import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ReferentDTO, ReferentResourceService } from 'aig-generic';
import { AigReferentNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-generic/components/referent-new-update-dialog/referent-new-update-dialog.component';

@Component({
    selector: 'aig-referent-list-table',
    templateUrl: './referent-list-table.component.html',
    styleUrls: ['./referent-list-table.component.scss']
})
export class AigReferentListTableComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private referentResourceService: ReferentResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: ReferentDTO[];
    
    ngOnInit(): void { }

    editReferent(referentDTO: ReferentDTO) {
        this.dialog.open(AigReferentNewUpdateDialogComponent, { data: { referent: referentDTO } });
    }

    async deleteReferent(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.referentResourceService.deleteReferentUsingDELETE(id).toPromise();
            this._snackBar.open(`Referent: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting referent: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PreparationStatusDTO, PreparationStatusResourceService } from 'aig-italianlegislation';
import { AigPreparationStatusNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/preparation-status-new-update-dialog/preparation-status-new-update-dialog.component';

@Component({
    selector: 'aig-preparation-status-list-table',
    templateUrl: './preparation-status-list-table.component.html',
    styleUrls: ['./preparation-status-list-table.component.scss']
})
export class AigPreparationStatusListTableComponent implements OnInit {
    constructor(
        private preparationStatusResourceService: PreparationStatusResourceService,
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

    async deletePreparationStatus(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.preparationStatusResourceService.deletePreparationStatusUsingDELETE(id).toPromise();
            this._snackBar.open(`preparationStatus: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting preparation status: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPreparationStatus(preparationStatusDTO: PreparationStatusDTO) {
        this.dialog.open(AigPreparationStatusNewUpdateDialogComponent, { data: {preparationStatus: preparationStatusDTO } });
    }
}



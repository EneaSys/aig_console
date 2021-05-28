import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PreparationDTO, PreparationResourceService } from 'aig-italianlegislation';
import { AigPreparationNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/preparation-new-update-dialog/preparation-new-update-dialog.component';

@Component({
    selector: 'aig-preparation-list-table',
    templateUrl: './preparation-list-table.component.html',
    styleUrls: ['./preparation-list-table.component.scss']
})
export class AigPreparationListTableComponent implements OnInit {
    constructor(
        private preparationResourceService: PreparationResourceService,
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

    async deletePreparation(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.preparationResourceService.deletePreparationUsingDELETE(id).toPromise();
            this._snackBar.open(`preparation: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting preparation: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPreparation(preparationDTO: PreparationDTO) {
        this.dialog.open(AigPreparationNewUpdateDialogComponent, { data: {preparation: preparationDTO } });
    }
}



import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ProcurementDTO, ProcurementResourceService } from 'aig-italian-public-procurement';
import { DossierDTO, DossierResourceService } from 'aig-italianlegislation';
import { AigDossierNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/dossier-new-update-dialog/dossier-new-update-dialog.component';
import { AigProcurementNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/procurement-new-update-dialog/procurement-new-update-dialog.component';
import { AigProcurementNewUpdateFormComponent } from '../procurement-new-update-form/procurement-new-update-form.component';

@Component({
    selector: 'aig-dossier-list-table',
    templateUrl: './dossier-list-table.component.html',
    styleUrls: ['./dossier-list-table.component.scss']
})
export class AigDossierListTableComponent implements OnInit {
    constructor(
        private dossierResourceService: DossierResourceService,
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

    async deleteDossier(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.dossierResourceService.deleteDossierUsingDELETE(id).toPromise();
            this._snackBar.open(`Dossier: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting procurement: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editDossier(dossierDTO: DossierDTO) {
        this.dialog.open(AigDossierNewUpdateDialogComponent, { data: {dossier:dossierDTO } });
    }
}



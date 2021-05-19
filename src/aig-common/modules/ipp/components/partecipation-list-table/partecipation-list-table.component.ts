import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { EventService } from 'aig-common/event-manager/event.service';
import {  PartecipationDTO, PartecipationResourceService } from 'aig-italianlegislation';
import { AigPartecipationNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/partecipation-new-update-dialog/partecipation-new-update-dialog.component';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-partecipation-list-table',
    templateUrl: './partecipation-list-table.component.html',
    styleUrls: ['./partecipation-list-table.component.scss']
})
export class AigPartecipationListTableComponent extends AigIppCommonGenericComponent implements OnInit {
    constructor(
        private partecipationResourceService: PartecipationResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ) { super(_fuseTranslationLoaderService); }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deletePartecipation(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.partecipationResourceService.deletePartecipationUsingDELETE(id).toPromise();
            this._snackBar.open(`Partecipation: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting partecipation: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPartecipation(partecipationDTO: PartecipationDTO) {
        this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: {partecipation: partecipationDTO } });
    }
}



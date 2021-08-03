import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { EventService } from 'aig-common/event-manager/event.service';
import {  PartecipationDTO, PartecipationResourceService } from 'aig-italianlegislation';
import { AigPartecipationModalityNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/partecipation-modality-new-update-dialog/partecipation-modality-new-update-dialog.component';
import { AigPartecipationNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/partecipation-new-update-dialog/partecipation-new-update-dialog.component';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-partecipation-modality-list-table',
    templateUrl: './partecipation-modality-list-table.component.html',
    styleUrls: ['./partecipation-modality-list-table.component.scss']
})
export class AigPartecipationModalityListTableComponent extends AigIppCommonGenericComponent implements OnInit {
    constructor(
        //private partecipationModalityResourceService: PartecipationModalityResourceService,
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

    async deletePartecipationModality(id: number) {
        this._fuseProgressBarService.show();

        /*try {
            await this.partecipationModalityResourceService.deletePartecipationModalityUsingDELETE(id).toPromise();
            this._snackBar.open(`Partecipation Modality: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting partecipation Modality: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
          */
    }
    /*editPartecipationModality(partecipationModalityDTO: PartecipationModalityDTO) {
        this.dialog.open(AigPartecipationModalityNewUpdateDialogComponent, { data: {partecipationModality: partecipationModalityDTO } });
    }*/
}

   
  



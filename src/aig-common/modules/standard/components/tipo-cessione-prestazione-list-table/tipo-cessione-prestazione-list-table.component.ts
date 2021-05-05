import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import {IlFeCessionePrestazioneTipoDTO, IlFeCessionePrestazioneTipoResourceService } from 'aig-standard';
import { AigTipoCessionePrestazioneNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-cessione-prestazione-new-update-dialog/tipo-cessione-prestazione-new-update-dialog.component';

@Component({
    selector: 'aig-tipo-cessione-prestazione-list-table',
    templateUrl: './tipo-cessione-prestazione-list-table.component.html',
    styleUrls: ['./tipo-cessione-prestazione-list-table.component.scss']
})
export class AigTipoCessionePrestazioneListTableComponent implements OnInit {
    constructor(
        private tipoCessionePrestazioneResourceService: IlFeCessionePrestazioneTipoResourceService,
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

    async deleteTipoCessionePrestazione(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.tipoCessionePrestazioneResourceService.deleteIlFeCessionePrestazioneTipoUsingDELETE(id).toPromise();
            this._snackBar.open(`Tipo Cessione Prestazione: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo cessione prestazione: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTipoCessionePrestazione(tipoCessionePrestazioneDTO: IlFeCessionePrestazioneTipoDTO) {
        this.dialog.open(AigTipoCessionePrestazioneNewUpdateDialogComponent, { data: { tipoCessionePrestazione: tipoCessionePrestazioneDTO } });
    }
}
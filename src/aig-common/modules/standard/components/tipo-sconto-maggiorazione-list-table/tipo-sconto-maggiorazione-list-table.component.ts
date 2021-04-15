import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CityDTO } from 'aig-generic';
import { CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoRitenutaDTO, TipoRitenutaResourceService, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';
import { AigCityNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/city-new-update-modal/city-new-update-modal.component';
import { AigTipoCassaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoRitenutaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-ritenuta-new-update-dialog/tipo-ritenuta-new-update-dialog.component';
import { AigTipoScontoMaggiorazioneNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-sconto-maggiorazione-new-update-dialog/tipo-sconto-maggiorazione-new-update-dialog.component';



@Component({
    selector: 'aig-tipo-sconto-maggiorazione-list-table',
    templateUrl: './tipo-sconto-maggiorazione-list-table.component.html',
    styleUrls: ['./tipo-sconto-maggiorazione-list-table.component.scss']
})
export class AigTipoScontoMaggiorazioneListTableComponent implements OnInit {
    constructor(
        private tipoScontoMaggiorazioneResourceService: TipoScontoMaggiorazioneResourceService,
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

    async deleteTipoScontoMaggiorazione(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.tipoScontoMaggiorazioneResourceService.deleteTipoScontoMaggiorazioneUsingDELETE(id).toPromise();
            this._snackBar.open(`Tipo Sconto Maggiorazione: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo Sconto Maggiorazione: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTipoScontoMaggiorazione(tipoScontoMaggiorazioneDTO: TipoScontoMaggiorazioneDTO) {
        this.dialog.open(AigTipoScontoMaggiorazioneNewUpdateDialogComponent), { data: { tipoScontoMaggiorazione: tipoScontoMaggiorazioneDTO } } 
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CityDTO } from 'aig-generic';
import { CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoRitenutaDTO, TipoRitenutaResourceService, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';
import { AigCityNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/city-new-update-modal/city-new-update-modal.component';
import { AigTipoCassaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoRitenutaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-ritenuta-new-update-dialog/tipo-ritenuta-new-update-dialog.component';
import { AigTipoScontMaggioranzaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-sconto-maggioranza-new-update-dialog/tipo-sconto-maggioranza-new-update-dialog.component';

@Component({
    selector: 'aig-tipo-sconto-maggioranza-list-table',
    templateUrl: './tipo-sconto-maggioranza-list-table.component.html',
    styleUrls: ['./tipo-sconto-maggioranza-list-table.component.scss']
})
export class AigTipoScontoMaggioranzaListTableComponent implements OnInit {
    constructor(
        private tipoScontoMaggioranzaResourceService: TipoScontoMaggiorazioneResourceService,
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

    async deleteTipoScontoMaggioranza(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.tipoScontoMaggioranzaResourceService.deleteTipoScontoMaggiorazioneUsingDELETE(id).toPromise();
            this._snackBar.open(`Tipo Sconto Maggioranza: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo Sconto Maggioranza: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTipoScontoMaggioranza(tipoScontoMaggioranzaDTO: TipoScontoMaggiorazioneDTO) {
        this.dialog.open(AigTipoScontMaggioranzaNewUpdateDialogComponent), { data: { tipoScontoMaggioranza: tipoScontoMaggioranzaDTO } } 
    }
}
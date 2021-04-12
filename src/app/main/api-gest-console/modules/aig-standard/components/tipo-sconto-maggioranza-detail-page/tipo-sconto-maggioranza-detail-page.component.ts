import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CityDTO, CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoCessionePrestazioneDTO, TipoCessionePrestazioneResourceService, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigTipoCassaNewUpdateDialogComponent } from '../tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoCessionePrestazioneNewUpdateDialogComponent } from '../tipo-cessione-prestazione-new-update-dialog/tipo-cessione-prestazione-new-update-dialog.component';
import { AigTipoScontoMaggioranzaNewUpdateFormComponent } from 'aig-common/modules/standard/components/tipo-sconto-maggioranza-new-update-form/tipo-sconto-maggioranza-new-update-form.component';
import { AigTipoScontMaggioranzaNewUpdateDialogComponent } from '../tipo-sconto-maggioranza-new-update-dialog/tipo-sconto-maggioranza-new-update-dialog.component';

@Component({
    templateUrl: './tipo-sconto-maggioranza-detail-page.component.html',
    styleUrls: ['./tipo-sconto-maggioranza-detail-page.component.scss']
})
export class AigTipoScontoMaggioranzaDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private tipoScontoMaggioranzaResourceService: TipoScontoMaggiorazioneResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        tipoScontoMaggioranza: TipoScontoMaggiorazioneDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.tipoScontoMaggioranza = this.route.snapshot.data.tipoScontoMaggioranza;
        } else {
            this.tipoScontoMaggioranza = await this.tipoScontoMaggioranzaResourceService.getTipoScontoMaggiorazioneUsingGET(this.tipoScontoMaggioranza.id).toPromise();
        }
    }

    async deleteTipoScontoMaggioranza(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.tipoScontoMaggioranzaResourceService.deleteTipoScontoMaggiorazioneUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Tipo Sconto Maggioranza: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'tipo-sconto-maggioranza']);
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo sconto maggioranza: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editTipoScontoMaggioranza(tipoScontoMaggioranza: TipoScontoMaggiorazioneDTO) {
        this.dialog.open(AigTipoScontMaggioranzaNewUpdateDialogComponent, { data: { tipoScontoMaggioranza: tipoScontoMaggioranza} });
    }

}
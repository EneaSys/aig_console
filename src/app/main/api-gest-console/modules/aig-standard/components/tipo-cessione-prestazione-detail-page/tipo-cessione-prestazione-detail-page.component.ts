import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CityDTO, CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoCessionePrestazioneDTO, TipoCessionePrestazioneResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigTipoCassaNewUpdateDialogComponent } from '../tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoCessionePrestazioneNewUpdateDialogComponent } from '../tipo-cessione-prestazione-new-update-dialog/tipo-cessione-prestazione-new-update-dialog.component';

@Component({
    templateUrl: './tipo-cessione-prestazione-detail-page.component.html',
    styleUrls: ['./tipo-cessione-prestazione-detail-page.component.scss']
})
export class AigTipoCessionePrestazioneDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private tipoCessionePrestazioneResourceService: TipoCessionePrestazioneResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        tipoCessionePrestazione: TipoCessionePrestazioneDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.tipoCessionePrestazione = this.route.snapshot.data.tipoCessionePrestazione;
        } else {
            this.tipoCessionePrestazione = await this.tipoCessionePrestazioneResourceService.getTipoCessionePrestazioneUsingGET(this.tipoCessionePrestazione.id).toPromise();
        }
    }

    async deleteTipoCessionePrestazione(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.tipoCessionePrestazioneResourceService.deleteTipoCessionePrestazioneUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Tipo Cessione Prestazione: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'tipo-cessione-prestazione']);
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo cessione-prestazione: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editTipoCessionePrestazione(tipoCessionePrestazione: TipoCessionePrestazioneDTO) {
        this.dialog.open(AigTipoCessionePrestazioneNewUpdateDialogComponent, { data: { tipoCessionePrestazione: tipoCessionePrestazione } });
    }

}
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IlFeScontoMaggiorazioneTipoDTO, IlFeScontoMaggiorazioneTipoResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigTipoScontoMaggiorazioneNewUpdateDialogComponent } from '../tipo-sconto-maggiorazione-new-update-dialog/tipo-sconto-maggiorazione-new-update-dialog.component';

@Component({
    templateUrl: './tipo-sconto-maggiorazione-detail-page.component.html',
    styleUrls: ['./tipo-sconto-maggiorazione-detail-page.component.scss']
})
export class AigTipoScontoMaggiorazioneDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private tipoScontoMaggiorazioneResourceService: IlFeScontoMaggiorazioneTipoResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        tipoScontoMaggiorazione: IlFeScontoMaggiorazioneTipoDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.tipoScontoMaggiorazione = this.route.snapshot.data.tipoScontoMaggiorazionePrestazione;
        } else {
            this.tipoScontoMaggiorazione = await this.tipoScontoMaggiorazioneResourceService.getIlFeScontoMaggiorazioneTipoUsingGET(this.tipoScontoMaggiorazione.id).toPromise();
        }
    }

    async deleteTipoScontoMaggiorazione(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.tipoScontoMaggiorazioneResourceService.deleteIlFeScontoMaggiorazioneTipoUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Tipo Sconto Maggiorazione: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'tipo-sconto-maggiorazione']);
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo Sconto Maggiorazione: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editTipoScontoMaggiorazione(tipoScontoMaggiorazione: IlFeScontoMaggiorazioneTipoDTO) {
        this.dialog.open(AigTipoScontoMaggiorazioneNewUpdateDialogComponent, { data: { tipoScontoMaggiorazione: tipoScontoMaggiorazione } });
    }

}
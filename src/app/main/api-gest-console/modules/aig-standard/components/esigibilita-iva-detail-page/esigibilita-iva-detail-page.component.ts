import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SocialActionResourceService, SocialActionDTO, NaturaResourceService, NaturaDTO, EsigibilitaIvaResourceService, EsigibilitaIvaDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSocialActionNewUpdateModalComponent } from '../social-action-new-update-modal/social-action-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigNaturaNewUpdateDialogComponent } from '../natura-new-update-dialog/natura-new-update-dialog.component';
import { AigEsigibilitaIvaNewUpdateDialogComponent } from '../esigibilita-iva-new-update-dialog/esigibilita-iva-new-update-dialog.component';

@Component({
    templateUrl: './esigibilita-iva-detail-page.component.html',
    styleUrls: ['./esigibilita-iva-detail-page.component.scss']
})
export class AigEsigibilitaIvaDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private esigibilitaIvaResourceService: EsigibilitaIvaResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

        esigibilitaIva: EsigibilitaIvaDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.esigibilitaIva = this.route.snapshot.data.esigibilitaIvaPrestazione;
        } else {
            this.esigibilitaIva = await this.esigibilitaIvaResourceService.getEsigibilitaIvaUsingGET(this.esigibilitaIva.id).toPromise();
        }
    }

    async deleteEsigibilitaIva(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.esigibilitaIvaResourceService.deleteEsigibilitaIvaUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Esigibilita Iva: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'esigibilita-iva']);
        } catch (e) {
            this._snackBar.open(`Error during deleting esigibilita Iva: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editEsigibilitaIva(esigibilitaIva: EsigibilitaIvaDTO) {
        this.dialog.open(AigEsigibilitaIvaNewUpdateDialogComponent, { data: { esigibilitaIva: esigibilitaIva } });
    }

}
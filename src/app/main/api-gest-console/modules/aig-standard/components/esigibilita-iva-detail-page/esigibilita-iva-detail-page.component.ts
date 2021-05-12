import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IlFeEsigibilitaIvaDTO, IlFeEsigibilitaIvaResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
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
        private esigibilitaIvaResourceService: IlFeEsigibilitaIvaResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

        esigibilitaIva: IlFeEsigibilitaIvaDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.esigibilitaIva = this.route.snapshot.data.esigibilitaIvaPrestazione;
        } else {
            this.esigibilitaIva = await this.esigibilitaIvaResourceService.getIlFeEsigibilitaIvaUsingGET(this.esigibilitaIva.id).toPromise();
        }
    }

    async deleteEsigibilitaIva(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.esigibilitaIvaResourceService.deleteIlFeEsigibilitaIvaUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Esigibilita Iva: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'esigibilita-iva']);
        } catch (e) {
            this._snackBar.open(`Error during deleting esigibilita Iva: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editEsigibilitaIva(esigibilitaIva: IlFeEsigibilitaIvaDTO) {
        this.dialog.open(AigEsigibilitaIvaNewUpdateDialogComponent, { data: { esigibilitaIva: esigibilitaIva } });
    }

}
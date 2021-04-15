import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CityDTO, CityResourceService, TipoCassaDTO, TipoCassaResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigTipoCassaNewUpdateDialogComponent } from '../tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';

@Component({
    templateUrl: './tipo-cassa-detail-page.component.html',
    styleUrls: ['./tipo-cassa-detail-page.component.scss']
})
export class AigTipoCassaDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private tipoCassaResourceService: TipoCassaResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        tipoCassa: TipoCassaDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.tipoCassa = this.route.snapshot.data.city;
        } else {
            this.tipoCassa = await this.tipoCassaResourceService.getTipoCassaUsingGET(this.tipoCassa.id).toPromise();
        }
    }

    async deleteTipoCassa(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.tipoCassaResourceService.deleteTipoCassaUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Tipo Cassa: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'tipo-cassa']);
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo cassa: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editTipoCassa(tipoCassa: TipoCassaDTO) {
        this.dialog.open(AigTipoCassaNewUpdateDialogComponent, { data: { tipoCassa: tipoCassa } });
    }

}
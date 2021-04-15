import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CityDTO, CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoRitenutaDTO, TipoRitenutaResourceService } from 'aig-standard';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigTipoCassaNewUpdateDialogComponent } from '../tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoRitenutaNewUpdateDialogComponent } from '../tipo-ritenuta-new-update-dialog/tipo-ritenuta-new-update-dialog.component';

@Component({
    templateUrl: './tipo-ritenuta-detail-page.component.html',
    styleUrls: ['./tipo-ritenuta-detail-page.component.scss']
})
export class AigTipoRitenutaDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private tipoRitenutaResourceService: TipoRitenutaResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        tipoRitenuta: TipoRitenutaDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.tipoRitenuta = this.route.snapshot.data.city;
        } else {
            this.tipoRitenuta = await this.tipoRitenutaResourceService.getTipoRitenutaUsingGET(this.tipoRitenuta.id).toPromise();
        }
    }

    async deleteTipoRitenuta(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.tipoRitenutaResourceService.deleteTipoRitenutaUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Tipo Ritenuta: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'tipo-ritenuta']);
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo ritenuta: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editTipoRitenuta(tipoRitenuta: TipoRitenutaDTO) {
        this.dialog.open(AigTipoRitenutaNewUpdateDialogComponent, { data: { tipoRitenuta: tipoRitenuta } });
    }

}
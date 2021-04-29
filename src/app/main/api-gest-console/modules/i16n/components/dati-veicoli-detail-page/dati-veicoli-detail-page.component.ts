import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { DatiPagamentoDTO, DatiPagamentoResourceService, DatiVeicoliDTO, DatiVeicoliResourceService } from 'aig-italianlegislation';
import { AigDatiPagamentoNewUpdateDialogComponent } from '../dati-pagamento-new-update-dialog/dati-pagamento-new-update-dialog.component';
import { AigDatiVeicoliNewUpdateDialogComponent } from '../dati-veicoli-new-update-dialog/dati-veicoli-new-update-dialog.component';

@Component({
    templateUrl: './dati-veicoli-detail-page.component.html',
    styleUrls: ['./dati-veicoli-detail-page.component.scss']
})
export class AigDatiVeicoliDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private datiVeicoliResourceService: DatiVeicoliResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


        datiVeicoli: DatiVeicoliDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.datiVeicoli = this.route.snapshot.data.datiVeicoli;
        } else {
            this.datiVeicoli = await this.datiVeicoliResourceService.getDatiVeicoliUsingGET(this.datiVeicoli.id).toPromise();
        }
    }

    async deleteDatiVeicoli(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.datiVeicoliResourceService.deleteDatiVeicoliUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Dati Veicoli: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/i16n', 'dati-veicoli']);
        } catch (e) {
            this._snackBar.open(`Error during deleting dati veicoli: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editDatiVeicoli(datiVeicoli: DatiVeicoliDTO) {
        this.dialog.open(AigDatiVeicoliNewUpdateDialogComponent, { data: { datiVeicoli: datiVeicoli } });
    }

}
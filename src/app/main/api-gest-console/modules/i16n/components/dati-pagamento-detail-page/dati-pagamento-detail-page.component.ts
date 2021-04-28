import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { DatiPagamentoDTO, DatiPagamentoResourceService } from 'aig-italianlegislation';
import { AigDatiPagamentoNewUpdateDialogComponent } from '../dati-pagamento-new-update-dialog/dati-pagamento-new-update-dialog.component';

@Component({
    templateUrl: './dati-pagamento-detail-page.component.html',
    styleUrls: ['./dati-pagamento-detail-page.component.scss']
})
export class AigDatiPagamentoDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private datiPagamentoResourceService: DatiPagamentoResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    datiPagamento: DatiPagamentoDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.datiPagamento = this.route.snapshot.data.datiPagamento;
        } else {
            this.datiPagamento = await this.datiPagamentoResourceService.getDatiPagamentoUsingGET(this.datiPagamento.id).toPromise();
        }
    }

    async deleteDatiPagamento(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.datiPagamentoResourceService.deleteDatiPagamentoUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Dati Pagamento: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/i16n', 'dati-pagamento']);
        } catch (e) {
            this._snackBar.open(`Error during deleting dati pagamento: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editDatiPagamento(datiPagamento: DatiPagamentoDTO) {
        this.dialog.open(AigDatiPagamentoNewUpdateDialogComponent, { data: { datiPagamento: datiPagamento } });
    }

}
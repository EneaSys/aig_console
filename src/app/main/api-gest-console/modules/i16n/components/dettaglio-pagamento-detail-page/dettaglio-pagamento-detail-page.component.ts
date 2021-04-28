import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { DettaglioPagamentoDTO, DettaglioPagamentoResourceService } from 'aig-italianlegislation';
import { AigDettaglioPagamentoNewUpdateDialogComponent } from '../dettaglio-pagamento-new-update-dialog/dettaglio-pagamento-new-update-dialog.component';

@Component({
    templateUrl: './dettaglio-pagamento-detail-page.component.html',
    styleUrls: ['./dettaglio-pagamento-detail-page.component.scss']
})
export class AigDettaglioPagamentoDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private dettaglioPagamentoResourceService: DettaglioPagamentoResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    dettaglioPagamento: DettaglioPagamentoDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.dettaglioPagamento = this.route.snapshot.data.dettaglioPagamento;
        } else {
            this.dettaglioPagamento = await this.dettaglioPagamentoResourceService.getDettaglioPagamentoUsingGET(this.dettaglioPagamento.id).toPromise();
        }
    }

    async deleteDettaglioPagamento(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.dettaglioPagamentoResourceService.deleteDettaglioPagamentoUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Dettaglio Pagamento: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/i16n', 'dettaglio-pagamento']);
        } catch (e) {
            this._snackBar.open(`Error during deleting dettaglio pagamento: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    
    editDettaglioPagamento(dettaglioPagamento: DettaglioPagamentoDTO) {
        this.dialog.open(AigDettaglioPagamentoNewUpdateDialogComponent, { data: { dettaglioPagamento: dettaglioPagamento } });
    }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IlFePagamentoModalitaResourceService, IlFePagamentoModalitaDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigModalitaPagamentoNewUpdateDialogComponent } from '../modalita-pagamento-new-update-dialog/modalita-pagamento-new-update-dialog.component';

@Component({
    templateUrl: './modalita-pagamento-detail-page.component.html',
    styleUrls: ['./modalita-pagamento-detail-page.component.scss']
})
export class AigModalitaPagamentoDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private modalitaPagamentoResourceService: IlFePagamentoModalitaResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

        modalitaPagamento: IlFePagamentoModalitaDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.modalitaPagamento = this.route.snapshot.data.modalitaPagamento;
        } else {
            this.modalitaPagamento = await this.modalitaPagamentoResourceService.getIlFePagamentoModalitaUsingGET(this.modalitaPagamento.id).toPromise();
        }
    }

    async deleteMmodalitaPagamento(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.modalitaPagamentoResourceService.deleteIlFePagamentoModalitaUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Modalita Pagamento: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'modalita-pagamento']);
        } catch (e) {
            this._snackBar.open(`Error during deleting modalita Pagamento: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editModalitaPagamento(modalitaPagamento: IlFePagamentoModalitaDTO) {
        this.dialog.open(AigModalitaPagamentoNewUpdateDialogComponent, { data: { modalitaPagamento: modalitaPagamento } });
    }

}
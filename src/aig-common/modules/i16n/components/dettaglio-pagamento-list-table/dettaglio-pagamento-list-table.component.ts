import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { DettaglioPagamentoDTO, DettaglioPagamentoResourceService, DossierDTO, DossierResourceService } from 'aig-italianlegislation';
import { AigDettaglioPagamentoNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/i16n/components/dettaglio-pagamento-new-update-dialog/dettaglio-pagamento-new-update-dialog.component';
import { AigDossierNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/dossier-new-update-dialog/dossier-new-update-dialog.component';
@Component({
    selector: 'aig-dettaglio-pagamento-list-table',
    templateUrl: './dettaglio-pagamento-list-table.component.html',
    styleUrls: ['./dettaglio-pagamento-list-table.component.scss']
})
export class AigDettaglioPagamentoListTableComponent implements OnInit {
    constructor(
        private dettaglioPagamentoResourceService: DettaglioPagamentoResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteDettaglioPagamento(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.dettaglioPagamentoResourceService.deleteDettaglioPagamentoUsingDELETE(id).toPromise();
            this._snackBar.open(`Dettaglio Pagamento: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting dettaglio pagamento: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editDettaglioPagamento(dettaglioPagamentoDTO: DettaglioPagamentoDTO) {
        this.dialog.open(AigDettaglioPagamentoNewUpdateDialogComponent, { data: { dettaglioPagamento: dettaglioPagamentoDTO } });
    }
}

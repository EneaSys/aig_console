import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { DatiPagamentoDTO, DatiPagamentoResourceService } from 'aig-italianlegislation';
import { AigDatiPagamentoNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/i16n/components/dati-pagamento-new-update-dialog/dati-pagamento-new-update-dialog.component';

@Component({
    selector: 'aig-dati-pagamento-list-table',
    templateUrl: './dati-pagamento-list-table.component.html',
    styleUrls: ['./dati-pagamento-list-table.component.scss']
})
export class AigDatiPagamentoListTableComponent implements OnInit {
    constructor(
        private datiPagamentoResourceService: DatiPagamentoResourceService,
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

    async deleteDatiPagamento(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.datiPagamentoResourceService.deleteDatiPagamentoUsingDELETE(id).toPromise();
            this._snackBar.open(`Dati Pagamento: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting dati pagamento: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editDatiPagamento(datiPagamentoDTO: DatiPagamentoDTO) {
        this.dialog.open(AigDatiPagamentoNewUpdateDialogComponent, { data: { datiPagamento: datiPagamentoDTO } });
    }
}

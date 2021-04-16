import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CityDTO } from 'aig-generic';
import { CityResourceService, ModalitaPagamentoDTO, ModalitaPagamentoResourceService, NaturaDTO, NaturaResourceService } from 'aig-standard';
import { AigCityNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/city-new-update-modal/city-new-update-modal.component';
import { AigModalitaPagamentoNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/modalita-pagamento-new-update-dialog/modalita-pagamento-new-update-dialog.component';
import { AigNaturaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/natura-new-update-dialog/natura-new-update-dialog.component';

@Component({
    selector: 'aig-modalita-pagamento-list-table',
    templateUrl: './modalita-pagamento-list-table.component.html',
    styleUrls: ['./modalita-pagamento-list-table.component.scss']
})
export class AigModalitaPagamentoListTableComponent implements OnInit {
    constructor(
        private modalitaPagamentoResourceService: ModalitaPagamentoResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteModalitaPagamento(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.modalitaPagamentoResourceService.deleteModalitaPagamentoUsingDELETE(id).toPromise();
            this._snackBar.open(`Modalita Pagamento: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting modalita pagamento: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editModalitaPagamento(modalitaPagamentoDTO: ModalitaPagamentoDTO) {
        this.dialog.open(AigModalitaPagamentoNewUpdateDialogComponent, { data: { modalitaPagamento: modalitaPagamentoDTO } });
    }
}

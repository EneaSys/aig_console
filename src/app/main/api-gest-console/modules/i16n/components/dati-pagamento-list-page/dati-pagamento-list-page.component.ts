import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { DatiPagamentoDTO, DatiPagamentoResourceService } from 'aig-italianlegislation';
import { AigDatiPagamentoNewUpdateDialogComponent } from '../dati-pagamento-new-update-dialog/dati-pagamento-new-update-dialog.component';


@Component({
    selector: 'aig-dati-pagamento-list-page',
    templateUrl: './dati-pagamento-list-page.component.html',
    styleUrls: ['./dati-pagamento-list-page.component.scss']
})
export class AigDatiPagamentoListPageComponent extends GenericComponent {
    constructor(
        private datiPagamentoResourceService: DatiPagamentoResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initDatiPagamentoSearch();

        this.showAllDatiPagamento();
    }

    reloadPage() {
        this.showAllDatiPagamento();
    }

    //			----  TABLE AND SEARCH SECTION ----

    datiPagamentoDTOs: DatiPagamentoDTO[];
    datiPagamentoDC: string[];
    datiPagamentoError: any;

    datiPagamentoSearchFormGroup: FormGroup;
    datiPagamentoFilters: any;

    datiPagamentoPaginationSize: number;
    datiPagamentoLength: number;


    private initDatiPagamentoSearch() {
        this.datiPagamentoPaginationSize = 10;

        this.datiPagamentoSearchFormGroup = this._formBuilder.group({
            id: [''],
            condizioniPagamento: [''],
        });

        this.datiPagamentoDC = ['id','condizioniPagamento', 'fatturaElettronicaBody', 'buttons'];
    }

    private clearFiltersDatiPagamento() {
        this.datiPagamentoFilters = {
            idEquals: null,
            condizioniPagamentoEquals: null,
            page: 0,
        }
    }

    private async searchDatiPagamento(page: number) {
        this.datiPagamentoDTOs = null;

        this.datiPagamentoFilters.page = page;
        this.datiPagamentoFilters.size = this.datiPagamentoPaginationSize;

        try {
            this.datiPagamentoLength = await this.datiPagamentoResourceService.countDatiPagamentosUsingGET(this.datiPagamentoFilters).toPromise();

            if (this.datiPagamentoLength == 0) {
                this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
                this.datiPagamentoDTOs = [];
                return;
            }

            this.datiPagamentoDTOs = await this.datiPagamentoResourceService.getAllDatiPagamentosUsingGET(this.datiPagamentoFilters).toPromise();
        } catch (e) {
            this.datiPagamentoError = e;
        }
    }

    showAllDatiPagamento() {
        this.resetFiltersDatiPagamento()
    }

    resetFiltersDatiPagamento() {
        this.datiPagamentoSearchFormGroup.reset();
        this.clearFiltersDatiPagamento();
        this.searchDatiPagamento(0);
    }

    datiPagamentoPaginationEvent(pageEvent: PageEvent) {
        this.datiPagamentoPaginationSize = pageEvent.pageSize;
        this.searchDatiPagamento(pageEvent.pageIndex);
    }

    datiPagamentoSearchWithFilter() {
        let searchedId = this.datiPagamentoSearchFormGroup.controls.id.value;

        if (searchedId != null) {
            this.clearFiltersDatiPagamento();
            this.datiPagamentoSearchFormGroup.reset();
            this.datiPagamentoFilters.idEquals = searchedId;
            this.searchDatiPagamento(0);
            return;
        }

        this.datiPagamentoFilters.idEquals = null;

        this.datiPagamentoFilters.condizioniPagamentoEquals = this.datiPagamentoSearchFormGroup.controls.condizioniPagamento.value;

        this.searchDatiPagamento(0);
    }

    newDatiPagamento() {
        this.dialog.open(AigDatiPagamentoNewUpdateDialogComponent, { data: { datiPagamento: {} } });
    }
    //			---- ! TABLE AND SEARCH SECTION ----
}
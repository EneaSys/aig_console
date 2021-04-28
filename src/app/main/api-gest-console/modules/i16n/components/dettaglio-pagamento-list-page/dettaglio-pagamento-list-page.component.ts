import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { DettaglioPagamentoDTO, DettaglioPagamentoResourceService } from 'aig-italianlegislation';
import { AigDettaglioPagamentoNewUpdateDialogComponent } from '../dettaglio-pagamento-new-update-dialog/dettaglio-pagamento-new-update-dialog.component';

@Component({
	selector: 'aig-dettaglio-pagamento-list-page',
    templateUrl: './dettaglio-pagamento-list-page.component.html',
    styleUrls: ['./dettaglio-pagamento-list-page.component.scss']
})
export class AigDettaglioPagamentoListPageComponent extends GenericComponent {
    constructor(
        private dettaglioPagamentoResourceService: DettaglioPagamentoResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initDettaglioPagamentoSearch();

		this.showAllDettaglioPagamento();
	}

	reloadPage() {
		this.showAllDettaglioPagamento();
	}

    //			---- CITY TABLE AND SEARCH SECTION ----
    
	dettaglioPagamentoDTOs: DettaglioPagamentoDTO[];
    dettaglioPagamentoDC: string[];
	dettaglioPagamentoError: any;

    dettaglioPagamentoSearchFormGroup: FormGroup;
	dettaglioPagamentoFilters: any;

	dettaglioPagamentoPaginationSize: number;
	dettaglioPagamentoLength: number;

    
    private initDettaglioPagamentoSearch() {
		this.dettaglioPagamentoPaginationSize = 10;

		this.dettaglioPagamentoSearchFormGroup = this._formBuilder.group({
			id: [''],
			modalitaPagamento: [''],
			beneficiario: [''],
		});

		this.dettaglioPagamentoDC = ['id','datiPagamento', 'beneficiario','modalitaPagamentoCode', 'importoPagamento', 'buttons'];
    }
    
    private clearFiltersDettaglioPagamento() {
		this.dettaglioPagamentoFilters = {
			idEquals: null,
			modalitaPagamentoContains: null,
			beneficiarioContains: null,
			page: 0,
		}
    }
    
    private async searchDettaglioPagamento(page: number) {
		this.dettaglioPagamentoDTOs = null;

		this.dettaglioPagamentoFilters.page = page;
		this.dettaglioPagamentoFilters.size = this.dettaglioPagamentoPaginationSize;

		try {
			this.dettaglioPagamentoLength = await this.dettaglioPagamentoResourceService.countDettaglioPagamentosUsingGET(this.dettaglioPagamentoFilters).toPromise();

			if(this.dettaglioPagamentoLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.dettaglioPagamentoDTOs = [];
				return;
			}

			this.dettaglioPagamentoDTOs = await this.dettaglioPagamentoResourceService.getAllDettaglioPagamentosUsingGET(this.dettaglioPagamentoFilters).toPromise();
		} catch (e) {
			this.dettaglioPagamentoError = e;
		}
    }
    
    showAllDettaglioPagamento() {
		this.resetFiltersDettaglioPagamento()
    }
    
    resetFiltersDettaglioPagamento() {
		this.dettaglioPagamentoSearchFormGroup.reset();
		this.clearFiltersDettaglioPagamento();
		this.searchDettaglioPagamento(0);
    }
    
    dettaglioPagamentoPaginationEvent(pageEvent: PageEvent) {
		this.dettaglioPagamentoPaginationSize = pageEvent.pageSize;
		this.searchDettaglioPagamento(pageEvent.pageIndex);
	}

    dettaglioPagamentoSearchWithFilter() {
		let searchedId = this.dettaglioPagamentoSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersDettaglioPagamento();
			this.dettaglioPagamentoSearchFormGroup.reset();
			this.dettaglioPagamentoFilters.idEquals = searchedId;
			this.searchDettaglioPagamento(0);
			return;
		}

		this.dettaglioPagamentoFilters.idEquals = null;

		this.dettaglioPagamentoFilters.beneficiarioContains = this.dettaglioPagamentoSearchFormGroup.controls.beneficiario.value;

		this.dettaglioPagamentoFilters.modalitaPagamentoContains = this.dettaglioPagamentoSearchFormGroup.controls.modalitaPagamento.value;

		this.searchDettaglioPagamento(0);
	}

    newDettaglioPagamento(){
        this.dialog.open(AigDettaglioPagamentoNewUpdateDialogComponent, { data: { dettaglioPagamento: {} } });
    }
    //			---- !CITY TABLE AND SEARCH SECTION ----
}
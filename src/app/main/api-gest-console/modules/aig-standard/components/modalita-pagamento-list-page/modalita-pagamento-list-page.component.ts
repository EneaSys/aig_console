import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlFePagamentoModalitaResourceService,IlFePagamentoModalitaDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigModalitaPagamentoNewUpdateDialogComponent } from '../modalita-pagamento-new-update-dialog/modalita-pagamento-new-update-dialog.component';

@Component({
	selector: 'aig-modalita-pagamento-list-page',
    templateUrl: './modalita-pagamento-list-page.component.html',
    styleUrls: ['./modalita-pagamento-list-page.component.scss']
})
export class AigModalitaPagamentoListPageComponent extends GenericComponent {
    constructor(
        private modalitaPagamentoResourceService: IlFePagamentoModalitaResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }



    loadPage() {
		this.initModalitaPagamentoSearch();

		this.showAllModalitaPagamento();
	}

	reloadPage() {
		this.showAllModalitaPagamento();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	modalitaPagamentoDTOs: IlFePagamentoModalitaDTO[];
    modalitaPagamentoDC: string[];
	modalitaPagamentoError: any;

    modalitaPagamentoSearchFormGroup: FormGroup;
	modalitaPagamentoFilters: any;

	modalitaPagamentoPaginationSize: number;
	modalitaPagamentoLength: number;

    
    private initModalitaPagamentoSearch() {
		this.modalitaPagamentoDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];

		this.modalitaPagamentoPaginationSize = 10;
		

		this.modalitaPagamentoSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
			
		});
	}

	private clearFiltersModalitaPagamento() {
		this.modalitaPagamentoFilters = {
			modalitaPagamentoIDEquals: null,
			modalitaPagamentoNameContains: null,
			page: 0,
		}
	}


	
    
    private async searchModalitaPagamento(page: number) {
		this.modalitaPagamentoDTOs = null;

		this.modalitaPagamentoFilters.page = page;
		this.modalitaPagamentoFilters.size = this.modalitaPagamentoPaginationSize;


    
            try {                                                                       
                this.modalitaPagamentoLength = await this.modalitaPagamentoResourceService.countIlFePagamentoModalitasUsingGET(this.modalitaPagamentoFilters).toPromise();  
                
                if(this.modalitaPagamentoLength == 0) {
                    this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
                    this.modalitaPagamentoDTOs = [];
                    return;
                }
    
                this.modalitaPagamentoDTOs = await this.modalitaPagamentoResourceService.getAllIlFePagamentoModalitasUsingGET(this.modalitaPagamentoFilters).toPromise();
            } catch (e) {
                this.modalitaPagamentoError = e;
            }
        }
        
    
    showAllModalitaPagamento() {
		this.resetFiltersModalitaPagamento()
    }
    
    resetFiltersModalitaPagamento() {
		this.modalitaPagamentoSearchFormGroup.reset();
		this.clearFiltersModalitaPagamento();
		this.searchModalitaPagamento(0);
    }
    
    modalitaPagamentoPaginationEvent(pageEvent: PageEvent) {
		this.modalitaPagamentoPaginationSize = pageEvent.pageSize;
		this.searchModalitaPagamento(pageEvent.pageIndex);
	}

    modalitaPagamentoSearchWithFilter() {
		let searchedId = this.modalitaPagamentoSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersModalitaPagamento();
			this.modalitaPagamentoSearchFormGroup.reset();
			this.modalitaPagamentoFilters.idEquals = searchedId;
			this.searchModalitaPagamento(0);
			return;
		}

		this.modalitaPagamentoFilters.modalitaPagamentoIDEquals = null;

		this.modalitaPagamentoFilters.modalitaPagamentoNameContains = this.modalitaPagamentoSearchFormGroup.controls.name.value;

		this.searchModalitaPagamento(0);
	}

    newModalitaPagamento(){
        this.dialog.open(AigModalitaPagamentoNewUpdateDialogComponent, { data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise();
	}*/

	
    //			---- !CITY TABLE AND SEARCH SECTION ----
}
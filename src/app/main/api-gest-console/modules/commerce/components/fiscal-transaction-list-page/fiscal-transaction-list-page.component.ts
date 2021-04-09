import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { FiscalTransactionDTO, FiscalTransactionResourceService, WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigFiscalTransactionNewUpdateModalComponent } from '../fiscal-transaction-new-update-modal/fiscal-transaction-new-update-modal.component';


@Component({
	selector: 'aig-fiscal-transaction-list-page',
	templateUrl: './fiscal-transaction-list-page.component.html',
	styleUrls: ['./fiscal-transaction-list-page.component.scss']
})
export class AigFiscalTransactionListPageComponent extends GenericComponent {
	constructor(
		private fiscalTransactionResourceService: FiscalTransactionResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	
	
	loadPage() {
		this.initFiscalTransactionSearch();

		this.showAllFiscalTransaction();
	}

	reloadPage() {
		this.showAllFiscalTransaction();
	}


//			---- FISCAL TRANSCACTION TABLE AND SEARCH SECTION ----

    fiscalTransactionSearchFormGroup: FormGroup;
	fiscalTransactionPaginationSize: number;
	fiscalTransactionFilters: any;

	fiscalTransactionLength: number;
	fiscalTransactionDTOs: FiscalTransactionDTO[];
	fiscalTransactionError: any;

	fiscalTransactionDC: string[];

	
	private initFiscalTransactionSearch() {
		this.fiscalTransactionDC = ["id", "date", "buttons"];

		this.fiscalTransactionPaginationSize = 10;
		

		this.fiscalTransactionSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersFiscalTransaction() {
		this.fiscalTransactionFilters = {
			fiscalTransactionIdEquals: null,
			fiscalTransactionNameContains: null,
			page: 0,
		}
	}

	private async searchFiscalTransaction(page: number) {
		this.fiscalTransactionDTOs = null;

		this.fiscalTransactionFilters.page = page;
		this.fiscalTransactionFilters.size = this.fiscalTransactionPaginationSize;

		try {                                                                       
			this.fiscalTransactionLength = await this.fiscalTransactionResourceService.countFiscalTransactionsUsingGET(this.fiscalTransactionFilters).toPromise();  
			
			if(this.fiscalTransactionLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.fiscalTransactionDTOs = [];
				return;
			}

			this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(this.fiscalTransactionFilters).toPromise();
		} catch (e) {
			this.fiscalTransactionError = e;
		}
	}
	

	showAllFiscalTransaction() {
		this.resetFiltersFiscalTransaction();
		
	}

	resetFiltersFiscalTransaction() {
		this.fiscalTransactionSearchFormGroup.reset();
		this.clearFiltersFiscalTransaction();
		this.searchFiscalTransaction(0);

	}

	fiscalTransactionPaginationEvent(pageEvent: PageEvent) {
		this.fiscalTransactionPaginationSize = pageEvent.pageSize;
		this.searchFiscalTransaction(pageEvent.pageIndex);
	}

	fiscalTransactionSearchWithFilter() {
		let searchedId = this.fiscalTransactionSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersFiscalTransaction();
			this.fiscalTransactionSearchFormGroup.reset();
			this.fiscalTransactionFilters.fiscalTransactionIdEquals = searchedId;
			this.searchFiscalTransaction(0);
			return;
		}
		this.fiscalTransactionFilters.fiscalTransactionIdEquals = null;

		this.fiscalTransactionFilters.fiscalTransactionNameContains = this.fiscalTransactionSearchFormGroup.controls.name.value;

		this.searchFiscalTransaction(0);
	}

	//			---- !FISCAL TRANSACTION TABLE AND SEARCH SECTION ----

	newFiscalTransaction(): void {
        this.dialog.open(AigFiscalTransactionNewUpdateModalComponent, { data: { fiscalTransaction: {} } });
    }
	
}
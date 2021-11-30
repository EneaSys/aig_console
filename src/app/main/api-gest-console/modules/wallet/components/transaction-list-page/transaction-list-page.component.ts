import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { WalletResourceService, WalletDTO, TransactionResourceService, TransactionDTO } from 'aig-wallet';
import { AigWalletNewUpdateDialogComponent } from '../wallet-new-update-dialog/wallet-new-update-dialog.component';
import { AigTransactionNewUpdateDialogComponent } from '../transaction-new-update-dialog/transaction-new-update-dialog.component';

@Component({
	templateUrl: './transaction-list-page.component.html',
	styleUrls: ['./transaction-list-page.component.scss']
})
export class AigTransactionListPageComponent extends GenericComponent {
	constructor(
		private transactionResourceService: TransactionResourceService,
		private dialog: MatDialog,
		private _formBuilder: FormBuilder,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	dataSource: TransactionDTO[];
	displayColumns: string[] = ['id','creationDateTime','buttons'];
	error: any;

	loadPage() {
		this.initSearch();

		this.search();
	}

	reloadPage() {
		this.search();
	}
	









	searchForm: FormGroup;
	filters: any;

	private initSearch() {
		this.searchForm = this._formBuilder.group({
            id: [''],
			
          
        });
	}

	resetFilters() {
		this.searchForm.reset();

		this.search();
	}

	async search() {
		let filters: any = {};
		
		let searchedId = this.searchForm.value.id;
		if (searchedId != null) {
			this.searchForm.reset();
			filters.idEquals = searchedId;
		} else {
			filters = this.searchForm.value;

			
		}

		this.filters = filters;




		try {
			this.dataSource = await this.transactionResourceService.getAllTransactionsUsingGET(this.filters).toPromise();
		} catch(e) {
			console.log(e);
			this.error = e;
		}
	}

	newTransaction() {
		this.dialog.open(AigTransactionNewUpdateDialogComponent, { data: { } });
	}
}

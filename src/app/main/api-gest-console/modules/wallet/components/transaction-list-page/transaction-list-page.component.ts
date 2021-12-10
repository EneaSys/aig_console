import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { WalletResourceService, WalletDTO, TransactionResourceService, TransactionDTO, GiveHaveResourceService } from 'aig-wallet';

@Component({
	templateUrl: './transaction-list-page.component.html',
	styleUrls: ['./transaction-list-page.component.scss']
})
export class AigTransactionListPageComponent extends GenericComponent {
	constructor(
		private giveHaveResourceService: GiveHaveResourceService,
		private transactionResourceService: TransactionResourceService,
		private dialog: MatDialog,
		private _formBuilder: FormBuilder,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	dataSource: TransactionDTO[];
	displayColumns: string[] = ['id','creationDateTime','sender','reciver','buttons'];
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


	async publish() {
		await this.transactionResourceService.publishTransactionUsingGET(this.filters).toPromise();
		await this.giveHaveResourceService.publishGiveHaveUsingGET(this.filters).toPromise();
	}
}

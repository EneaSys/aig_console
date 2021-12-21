import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
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
	size: number;
	displayColumns: string[] = ['id','creationDateTime', 'amount', 'sender','reciver','buttons'];
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
	paginator: any = {};

	private initSearch() {
		this.searchForm = this._formBuilder.group({
            id: [null],
			walletId: [null],
        });
	}

	resetFilters() {
		this.searchForm.reset();

		this.search();
	}

	paginationEvent(pageEvent: PageEvent) {
		this.paginator.page = pageEvent.pageIndex;
		this.paginator.size = pageEvent.pageSize;
		this.search();
	}
	
	initFilter() {
		this.filters = { ...this.paginator };
		this.filters.sort = ['transactionCreationDateTime,desc'];
	}

	async search() {
		let formValue = this.searchForm.value;
		this.initFilter();
		
		let searchedId = formValue.id;
		if (searchedId != null) {
			this.searchForm.reset();
			this.filters.transactionIDEquals = searchedId;
		} else {
			
			if(formValue.walletId) {
				this.filters.walletIDEquals = formValue.walletId;
			}
			
		}

		



		try {
			this.size = await this.transactionResourceService.countTransactionsUsingGET(this.filters).toPromise();
			this.dataSource = await this.transactionResourceService.getAllTransactionsUsingGET(this.filters).toPromise();
		} catch(e) {
			console.log(e);
			this.error = e;
		}
	}


	async publish() {
		let transactionFilters = { ...this.paginator };
		transactionFilters.idEquals = this.filters.transactionIDEquals;
		await this.transactionResourceService.publishTransactionUsingGET(transactionFilters).toPromise();
		
		let giveHaveFilters = { ...this.paginator };
		giveHaveFilters.transactionIdEquals = this.filters.transactionIDEquals;
		await this.giveHaveResourceService.publishGiveHaveUsingGET(giveHaveFilters).toPromise();
	}
}

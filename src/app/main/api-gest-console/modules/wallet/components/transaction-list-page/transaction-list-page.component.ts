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
            id: [null],
        });

		this.filters = {};
	}

	resetFilters() {
		this.searchForm.reset();

		this.search();
	}

	paginationEvent(pageEvent: PageEvent) {
		this.filters.page = pageEvent.pageIndex;
		this.filters.size = pageEvent.pageSize;
		this.search();
	}

	async search() {
		let formValue = this.searchForm.value;
		
		let searchedId = formValue.id;
		if (searchedId != null) {
			this.searchForm.reset();
			this.filters.idEquals = searchedId;
		} else {
			

			
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
		await this.transactionResourceService.publishTransactionUsingGET(this.filters).toPromise();
		await this.giveHaveResourceService.publishGiveHaveUsingGET(this.filters).toPromise();
	}
}

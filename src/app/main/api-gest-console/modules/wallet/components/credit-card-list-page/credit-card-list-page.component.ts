import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CreditCardResourceService, CreditCardDTO } from 'aig-wallet';
import { AigCreditCardNewUpdateDialogComponent } from '../credit-card-new-update-dialog/credit-card-new-update-dialog.component';

@Component({
	templateUrl: './credit-card-list-page.component.html',
	styleUrls: ['./credit-card-list-page.component.scss']
})
export class AigCreditCardListPageComponent extends GenericComponent {
	constructor(
		private creditCardResourceService: CreditCardResourceService,
		private dialog: MatDialog,
		private _formBuilder: FormBuilder,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	dataSource: CreditCardDTO[];
	size: number;
	displayColumns: string[] = ['id', 'eopoo', 'wallet', 'code', 'pin', 'buttons'];
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
            code: [null],
            walletId: [null],
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
			this.filters.creditCardIDEquals = searchedId;
		} else {
			if(formValue.code) {
				this.filters.creditCardCodeContains = formValue.code;
			}
			if(formValue.walletId) {
				this.filters.walletIDEquals = formValue.walletId;
			}
		}




		try {
			this.size = await this.creditCardResourceService.countCreditCardsUsingGET(this.filters).toPromise();
			this.dataSource = await this.creditCardResourceService.getAllCreditCardsUsingGET(this.filters).toPromise();
		} catch(e) {
			console.log(e);
			this.error = e;
		}
	}

	newCreditCard() {
		this.dialog.open(AigCreditCardNewUpdateDialogComponent, { data: { } });
	}

	async publish() {
		await this.creditCardResourceService.publishCreditCardUsingGET(this.filters).toPromise();
	}
}

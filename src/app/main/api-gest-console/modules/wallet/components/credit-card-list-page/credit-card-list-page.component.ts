import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
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
	displayColumns: string[] = ['id', 'wallet', 'code', 'buttons'];
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
            code: [''],
            walletId: [''],
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
			filters.creditCardIDEquals = searchedId;
		} else {
			filters = this.searchForm.value;

			if(filters.code) {
				filters.creditCardCodeContains = filters.code;
				filters.code = null;
			}
			if(filters.walletId) {
				filters.walletIDEquals = filters.walletId;
				filters.walletId = null;
			}
		}

		this.filters = filters;




		try {
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

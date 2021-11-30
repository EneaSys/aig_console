import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AigMerchantService } from 'aig-common/modules/wallet/services/merchant.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigMerchantNewUpdateDialogComponent } from '../merchant-new-update-dialog/merchant-new-update-dialog.component';

@Component({
	templateUrl: './merchant-list-page.component.html',
	styleUrls: ['./merchant-list-page.component.scss']
})
export class AigMerchantListPageComponent extends GenericComponent {
	constructor(
		private merchantService: AigMerchantService,
		private dialog: MatDialog,
		private _formBuilder: FormBuilder,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	dataSource: any[];
	displayColumns: string[] = ['id', 'name', 'username', 'wallet', 'buttons'];
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
            name: [''],
            username: [''],
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
			filters['merchantId.equals'] = searchedId;
		} else {
			filters = this.searchForm.value;

			if(filters.name) {
				filters['merchantName.contains'] = filters.name;
				filters.name = null;
			}
			if(filters.username) {
				filters['merchantUsername.contains'] = filters.username;
				filters.username = null;
			}
			if(filters.walletId) {
				filters['merchantWalletID.equals'] = filters.walletId;
				filters.walletId = null;
			}
		}

		this.filters = filters;




		try {
			this.dataSource = await this.merchantService.getMerchants(this.filters).toPromise();
		} catch(e) {
			console.log(e);
			this.error = e;
		}
	}

	newMerchant() {
		this.dialog.open(AigMerchantNewUpdateDialogComponent, { data: { } });
	}
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { WalletResourceService, WalletDTO } from 'aig-wallet';
import { AigWalletNewUpdateDialogComponent } from '../wallet-new-update-dialog/wallet-new-update-dialog.component';

@Component({
	templateUrl: './wallet-list-page.component.html',
	styleUrls: ['./wallet-list-page.component.scss']
})
export class AigWalletListPageComponent extends GenericComponent {
	constructor(
		private walletResourceService: WalletResourceService,
		private dialog: MatDialog,
		private _formBuilder: FormBuilder,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	dataSource: WalletDTO[];
	displayColumns: string[] = ['id', 'description', 'eopoo', 'buttons'];
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
			filters['walletId.equals'] = searchedId;
		} else {
			filters = this.searchForm.value;

			if(filters.name) {
				filters['walletName.contains'] = filters.name;
				filters.name = null;
			}
			if(filters.username) {
				filters['walletUsername.contains'] = filters.username;
				filters.username = null;
			}
			if(filters.walletId) {
				filters['walletWalletID.equals'] = filters.walletId;
				filters.walletId = null;
			}
		}

		this.filters = filters;




		try {
			this.dataSource = await this.walletResourceService.getAllWalletsUsingGET(this.filters).toPromise();
		} catch(e) {
			console.log(e);
			this.error = e;
		}
	}

	newWallet() {
		this.dialog.open(AigWalletNewUpdateDialogComponent, { data: { } });
	}
}

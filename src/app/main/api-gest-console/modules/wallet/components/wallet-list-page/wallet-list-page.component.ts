import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { WalletResourceService, WalletDTO } from 'aig-wallet';
import { AigWalletNewUpdateDialogComponent } from '../wallet-new-update-dialog/wallet-new-update-dialog.component';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { Observable } from 'rxjs';

@Component({
	templateUrl: './wallet-list-page.component.html',
	styleUrls: ['./wallet-list-page.component.scss']
})
export class AigWalletListPageComponent extends GenericComponent {
	constructor(
		private walletResourceService: WalletResourceService,
		private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
		public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
		private dialog: MatDialog,
		private _formBuilder: FormBuilder,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	dataSource: WalletDTO[];
	displayColumns: string[] = ['id', 'eopoo', 'description', 'buttons'];
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

	filteredEopoo: Observable<EopooDTO[]>;

	private initSearch() {
		this.searchForm = this._formBuilder.group({
            id: [''],
            description: [''],
            eopoo: ['']
        });

		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.searchForm.controls['eopoo'].valueChanges);
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
			filters.walletIDEquals = searchedId;
		} else {
			filters = this.searchForm.value;

			if(filters.description) {
				filters.walletDescriptionContains = filters.description;
				filters.description = null;
			}
			if(filters.eopoo) {
				filters.eopooCodeEquals = filters.eopoo.id;
				filters.eopoo = null;
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

	async publish() {
		await this.walletResourceService.publishWalletUsingGET(this.filters).toPromise();
	}
}

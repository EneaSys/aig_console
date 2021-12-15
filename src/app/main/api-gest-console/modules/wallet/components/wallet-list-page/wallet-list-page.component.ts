import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
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
	size: number;
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
		console.log(this.filters);
		
		let formValue = this.searchForm.value;
		
		let searchedId = formValue.id;
		if (searchedId != null) {
			this.searchForm.reset();
			this.filters.walletIDEquals = searchedId;
		} else {
			if(formValue.description) {
				this.filters.walletDescriptionContains = formValue.description;
			}
			if(formValue.eopoo) {
				this.filters.eopooCodeEquals = formValue.eopoo.id;
			}
		}



		try {
			this.size = await this.walletResourceService.countWalletsUsingGET(this.filters).toPromise();
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
		this.filters.size = 100;
		await this.walletResourceService.publishWalletUsingGET(this.filters).toPromise();
	}
}

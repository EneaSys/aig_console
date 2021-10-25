import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { BuyerDTO, BuyerResourceService, EopooDTO, SellerDTO, SellerResourceService } from 'aig-commerce';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigBuyerNewUpdateModalComponent } from '../buyer-new-update-modal/buyer-new-update-modal.component';
import { AigCommerceGenericComponent } from '../commerce-generic-component';

@Component({
	selector: 'aig-buyer-list-page',
	templateUrl: './buyer-list-page.component.html',
	styleUrls: ['./buyer-list-page.component.scss']
})
export class AigBuyerListPageComponent extends AigCommerceGenericComponent {

	constructor(
		private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
		public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
		private buyerResourceService: BuyerResourceService,
		private sellerResourceService: SellerResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	@Input()
	staticSeller: SellerDTO = null;

	sellerDTO: SellerDTO;

	loadPage() {
		this.initBuyerSearch();

		this.sellerDTO = this.staticSeller;

		this.showAllBuyer();
	}

	async reloadPage() {
		this.showAllBuyer();

		this.sellerDTO = await this.sellerResourceService.getSellerUsingGET(this.staticSeller.id).toPromise();
	}

	//			---- BUYER TABLE AND SEARCH SECTION ----

	buyerDTOs: BuyerDTO[];
	buyerDC: string[];
	buyerError: any;

	buyerSearchFormGroup: FormGroup;
	buyerFilters: any;

	buyerPaginationSize: number;
	buyerLength: number;

	filteredEopoo: Observable<EopooDTO[]>;

	private initBuyerSearch() {
		this.buyerPaginationSize = 10;

		this.buyerSearchFormGroup = this._formBuilder.group({
			id: [''],
			eopoo: [''],
			statusNote: [''],
		});

		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.buyerSearchFormGroup.controls['eopoo'].valueChanges);

		this.buyerDC = ["id", "buyer", "statusNote", "buttons"];
	}

	private clearFiltersBuyer() {
		this.buyerFilters = {
			idEquals: null,
			sellerIDEquals: this.staticSeller ? this.staticSeller.id : null,
			buyerGenericIDEquals: null,
			buyerPersonIDEquals: null,
			buyerStatusNoteContains: null,
			page: 0,
		}
	}

	private async searchBuyer(page: number) {
		this.buyerDTOs = null;

		this.buyerFilters.page = page;
		this.buyerFilters.size = this.buyerPaginationSize;

		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.buyerSearchFormGroup.controls['eopoo'].valueChanges);

		try {
			this.buyerLength = await this.buyerResourceService.countBuyersUsingGET(this.buyerFilters).toPromise();

			if (this.buyerLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.buyerDTOs = [];
				return;
			}

			this.buyerDTOs = await this.buyerResourceService.getAllBuyersUsingGET(this.buyerFilters).toPromise();
		} catch (e) {
			this.buyerError = e;
		}
	}

	showAllBuyer() {
		this.resetFiltersBuyer();
	}

	resetFiltersBuyer() {
		this.buyerSearchFormGroup.reset();
		this.clearFiltersBuyer();
		this.searchBuyer(0);
	}

	buyerPaginationEvent(pageEvent: PageEvent) {
		this.buyerPaginationSize = pageEvent.pageSize;
		this.searchBuyer(pageEvent.pageIndex);
	}

	buyerSearchWithFilter() {
		let searchedId = this.buyerSearchFormGroup.controls.id.value;

		if (searchedId != null) {
			this.clearFiltersBuyer();
			this.buyerSearchFormGroup.reset();
			this.buyerFilters.idEquals = searchedId;
			this.searchBuyer(0);
			return;
		}

		this.buyerFilters.idEquals = null;

		this.buyerFilters.buyerStatusNoteContains = this.buyerSearchFormGroup.controls.statusNote.value;

		if (this.buyerSearchFormGroup.controls.eopoo.value) {
			this.buyerFilters.buyerGenericIDEquals = this.buyerSearchFormGroup.controls.eopoo.value.genericEopoo ? this.buyerSearchFormGroup.controls.eopoo.value.genericEopoo.id : null;
			this.buyerFilters.buyerPersonIDEquals = this.buyerSearchFormGroup.controls.eopoo.value.person ? this.buyerSearchFormGroup.controls.eopoo.value.person.id : null;
		}

		this.searchBuyer(0);
	}

	//			---- !BUYER TABLE AND SEARCH SECTION ----

	newBuyer(): void {
		this.dialog.open(AigBuyerNewUpdateModalComponent, { data: {} });
	}

	async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise();
	}
}
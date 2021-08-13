import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { CatalogDTO, CatalogResourceService, PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { AigCommerceAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigPriceListNewUpdateDialogComponent } from '../price-list-new-update-dialog/price-list-new-update-dialog.component';

@Component({
	selector: 'aig-price-list-list-page',
	templateUrl: './price-list-list-page.component.html',
	styleUrls: ['./price-list-list-page.component.scss']
})
export class AigPriceListListPageComponent extends AigCommerceGenericComponent {
	@Input()
	staticCatalog: CatalogDTO = null;

	constructor(
		private priceListResourceService: PriceListResourceService,
		public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private catalogResourceService: CatalogResourceService,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	catalogDTO: CatalogDTO;

	loadPage() {
		this.initPriceListSearch()

		this.catalogDTO = this.staticCatalog;


		this.showAllPriceList();
	}

	async reloadPage() {
		this.showAllPriceList();
		this.catalogDTO = await this.catalogResourceService.getCatalogUsingGET(this.staticCatalog.id).toPromise();
	}

	//			---- CATALOG TABLE AND SEARCH SECTION ----


	priceListDTOs: PriceListDTO[];
	@Input()
	priceListDC: string[] = ["id", "name", "catalog", "seller", "buttons"];
	priceListError: any;

	priceListSearchFormGroup: FormGroup;
	priceListFilters: any;

	priceListPaginationSize: number;
	priceListLength: number;

	filteredCatalog: Observable<CatalogDTO[]>;
	

	private initPriceListSearch() {
		this.priceListPaginationSize = 10;

		this.priceListSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			catalog: ['']
		});

		this.filteredCatalog = this.commerceAutocompleteService.filterCatalog(this.priceListSearchFormGroup.controls['catalog'].valueChanges);
	}

	private clearFiltersPriceList() {
		this.priceListFilters = {
			priceListIDEquals: null,
			priceListNameContains: null,
			catalogIDEquals: this.staticCatalog ? this.staticCatalog.id : null,
			page: 0,

		}
	}

	private async searchPriceList(page: number) {
		this.priceListDTOs = null;

		this.priceListFilters.page = page;
		this.priceListFilters.size = this.priceListPaginationSize;

		this.filteredCatalog = this.commerceAutocompleteService.filterCatalog(this.priceListSearchFormGroup.controls['catalog'].valueChanges);

		try {
			this.priceListLength = await this.priceListResourceService.countPriceListsUsingGET(this.priceListFilters).toPromise();

			if (this.priceListLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.priceListDTOs = [];
				return;
			}

			this.priceListDTOs = await this.priceListResourceService.getAllPriceListsUsingGET(this.priceListFilters).toPromise();
		} catch (e) {
			this.priceListError = e;
		}
	}

	showAllPriceList() {
		this.resetFiltersPriceList()
	}

	resetFiltersPriceList() {
		this.priceListSearchFormGroup.reset();
		this.clearFiltersPriceList();
		this.searchPriceList(0);
	}

	priceListPaginationEvent(pageEvent: PageEvent) {
		this.priceListPaginationSize = pageEvent.pageSize;
		this.searchPriceList(pageEvent.pageIndex);
	}

	priceListSearchWithFilter() {
		let searchedId = this.priceListSearchFormGroup.controls.id.value;

		if (searchedId != null) {
			this.clearFiltersPriceList();
			this.priceListSearchFormGroup.reset();
			this.priceListFilters.priceListIDEquals = searchedId;
			this.searchPriceList(0);
			return;
		}
		this.priceListFilters.priceListIDEquals = null;

		this.priceListFilters.priceListNameContains = this.priceListSearchFormGroup.controls.name.value;

		if (this.priceListSearchFormGroup.controls.catalog.value) {
			this.priceListFilters.catalogIDEquals = this.priceListSearchFormGroup.controls.catalog.value.id;
		}

		this.searchPriceList(0);
	}
	//			---- !price list TABLE AND SEARCH SECTION ----

	newPriceList(): void {
		this.dialog.open(AigPriceListNewUpdateDialogComponent, { data: {}});
		
	}

	async publish() {
		await this.priceListResourceService.publishUsingGET11(this.priceListFilters).toPromise;
	}

}
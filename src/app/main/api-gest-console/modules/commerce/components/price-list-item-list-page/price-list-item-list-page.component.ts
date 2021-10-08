import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { CatalogDTO, CatalogItemDTO, PriceListDTO, PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { AigCommerceAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigPriceListItemNewUpdateDialogComponent } from '../price-list-item-new-update-dialog/price-list-item-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-item-list-page',
    templateUrl: './price-list-item-list-page.component.html',
    styleUrls: ['./price-list-item-list-page.component.scss']
})
export class AigPriceListItemListPageComponent extends GenericComponent {
	@Input()
	staticCatalog: CatalogDTO = null;

    constructor(
		private priceListItemResourceService: PriceListItemResourceService,
		public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initPriceListItemSearch();
		
		this.showAllPriceListItem();
	}

	reloadPage() {
		this.showAllPriceListItem();
	}

	//			---- PRICE LIST ITEM TABLE AND SEARCH SECTION ----

	priceListItemDTOs: PriceListItemDTO[];
	@Input()
	priceListItemDC: string[] = ["id", "catalog", "priceList", "catalogItem", "amount", "buttons"];
	priceListItemError: any;

	priceListItemSearchFormGroup: FormGroup;
	priceListItemFilters: any;

	priceListItemPaginationSize: number;
	priceListItemLength: number;

	filteredCatalogItem: Observable<CatalogItemDTO[]>;
	filteredPriceList: Observable<PriceListDTO[]>;

	private initPriceListItemSearch() {
		this.priceListItemPaginationSize = 10;

		this.priceListItemSearchFormGroup = this._formBuilder.group({
			id: [''],
			catalogItem: [''],
			priceList: [''],
		});

		this.filteredCatalogItem = this.commerceAutocompleteService.filterCatalogItem(this.priceListItemSearchFormGroup.controls['catalogItem'].valueChanges);
		this.filteredPriceList = this.commerceAutocompleteService.filterPriceList(this.priceListItemSearchFormGroup.controls['priceList'].valueChanges);
	}

	private clearFiltersPriceListItem() {
		this.priceListItemFilters = {
			priceListItemIDEquals: null,
			amountEquals: null,
			catalogItemIDEquals: null,
			priceListIDEquals: this.staticCatalog ? this.staticCatalog.id : null,
			page: 0,
		}
	}

	private async searchPriceListItem(page: number) {
		this.priceListItemDTOs = null;

		this.priceListItemFilters.page = page;
		this.priceListItemFilters.size = this.priceListItemPaginationSize;

		this.filteredCatalogItem = this.commerceAutocompleteService.filterCatalogItem(this.priceListItemSearchFormGroup.controls['catalogItem'].valueChanges);
		this.filteredPriceList = this.commerceAutocompleteService.filterPriceList(this.priceListItemSearchFormGroup.controls['priceList'].valueChanges);

		try {
			this.priceListItemLength = await this.priceListItemResourceService.countPriceListItemsUsingGET(this.priceListItemFilters).toPromise();

			if(this.priceListItemLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.priceListItemDTOs = [];
				return;
			}

			this.priceListItemDTOs = await this.priceListItemResourceService.getAllPriceListItemsUsingGET(this.priceListItemFilters).toPromise();
		} catch (e) {
			this.priceListItemError = e;
		}
	}

	showAllPriceListItem() {
		this.resetFiltersPriceListItem()
	}

	resetFiltersPriceListItem() {
		this.priceListItemSearchFormGroup.reset();
		this.clearFiltersPriceListItem();
		this.searchPriceListItem(0);
	}

	priceListItemPaginationEvent(pageEvent: PageEvent) {
		this.priceListItemPaginationSize = pageEvent.pageSize;
		this.searchPriceListItem(pageEvent.pageIndex);
	}

	priceListItemSearchWithFilter() {
		let searchedId = this.priceListItemSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPriceListItem();
			this.priceListItemSearchFormGroup.reset();
			this.priceListItemFilters.priceListItemIDEquals = searchedId;
			this.searchPriceListItem(0);
			return;
		}
		this.priceListItemFilters.priceListItemIDEquals = null;
		
		if (this.priceListItemSearchFormGroup.controls.catalogItem.value) {
			this.priceListItemFilters.catalogItemIDEquals = this.priceListItemSearchFormGroup.controls.catalogItem.value.id;
		}

		if (this.priceListItemSearchFormGroup.controls.priceList.value) {
			this.priceListItemFilters.priceListIDEquals = this.priceListItemSearchFormGroup.controls.priceList.value.id;
		}

		this.searchPriceListItem(0);
	}

	//			---- !PRICE LIST ITEM TABLE AND SEARCH SECTION ----

	newPriceListItem(): void {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { } });
    }

	async publish() {
		await this.priceListItemResourceService.publishUsingGET10(this.priceListItemFilters).toPromise();
	}
}
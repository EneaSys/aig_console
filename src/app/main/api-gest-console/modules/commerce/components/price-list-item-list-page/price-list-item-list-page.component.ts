import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { CatalogItemDTO, PriceListDTO, PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
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
    constructor(
		private priceListItemResourceService: PriceListItemResourceService,
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
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

	//			---- CATALOG ITEM TABLE AND SEARCH SECTION ----

	priceListItemDTOs: PriceListItemDTO[];
	priceListItemDC: string[];
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

		this.priceListItemDC = ["id", "catalog", "priceList", "inventoryItemCombination", "amount", "buttons"];
	}

	private clearFiltersPriceListItem() {
		this.priceListItemFilters = {
			idEquals: null,
			amountEquals: null,
			catalogItemIdEquals: null,
			priceListIdEquals: null,
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
			this.priceListItemFilters.idEquals = searchedId;
			this.searchPriceListItem(0);
			return;
		}
		this.priceListItemFilters.idEquals = null;
		
		if (this.priceListItemSearchFormGroup.controls.catalogItem.value) {
			this.priceListItemFilters.catalogItemIdEquals = this.priceListItemSearchFormGroup.controls.catalogItem.value.id;
		}

		if (this.priceListItemSearchFormGroup.controls.priceList.value) {
			this.priceListItemFilters.priceListIdEquals = this.priceListItemSearchFormGroup.controls.priceList.value.id;
		}

		this.searchPriceListItem(0);
	}

	/*priceListItemFilters = {
		amountEquals: null,
	}

	async loadPage() {
		this.priceListItemDC = ["id", "catalog", "priceList", "inventoryItemCombination", "amount", "buttons"];
		this.priceListItemDTOs = await this.priceListItemResourceService.getAllPriceListItemsUsingGET(this.priceListItemFilters).toPromise();
	}

	reloadPage() {
	}

	//			---- PRICE LIST ITEM TABLE AND SEARCH SECTION ----

	priceListItemDTOs: PriceListItemDTO[];
	priceListItemDC: string[];
	priceListItemError: any;*/

	
	
	//			---- !PRICE LIST ITEM TABLE AND SEARCH SECTION ----

	newPriceListItem(): void {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { priceListItem: {} } });
    }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { CatalogDTO, CatalogItemDTO, CatalogItemResourceService, InventoryItemCombinationDTO } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigCatalogItemNewUpdateDialogComponent } from '../catalog-item-new-update-dialog/catalog-item-new-update-dialog.component';

@Component({
    selector: 'aig-catalog-item-list-page',
    templateUrl: './catalog-item-list-page.component.html',
    styleUrls: ['./catalog-item-list-page.component.scss']
})
export class AigCatalogItemListPageComponent extends GenericComponent {
	constructor(
		private catalogItemResourceService: CatalogItemResourceService,
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initCatalogItemSearch();
		
		this.showAllCatalogItem();
	}

	reloadPage() {
		this.showAllCatalogItem();
	}

	//			---- CATALOG ITEM TABLE AND SEARCH SECTION ----

	catalogItemDTOs: CatalogItemDTO[];
	catalogItemDC: string[];
	catalogItemError: any;

	catalogItemSearchFormGroup: FormGroup;
	catalogItemFilters: any;

	catalogItemPaginationSize: number;
	catalogItemLength: number;

	filteredCatalog: Observable<CatalogDTO[]>;
	filteredInventoryItemCombination: Observable<InventoryItemCombinationDTO[]>;

	private initCatalogItemSearch() {
		this.catalogItemPaginationSize = 10;

		this.catalogItemSearchFormGroup = this._formBuilder.group({
			id: [''],
			inventoryItemCombination: [''],
			catalog: [''],
		});

		this.filteredCatalog = this.commerceAutocompleteService.filterCatalog(this.catalogItemSearchFormGroup.controls['catalog'].valueChanges);
		this.filteredInventoryItemCombination = this.commerceAutocompleteService.filterInventoryItemCombination(this.catalogItemSearchFormGroup.controls['inventoryItemCombination'].valueChanges);

		this.catalogItemDC = ["id", "active", "catalog", "inventoryItemProducer", "inventoryItemCombination", "buttons"];
	}

	private clearFiltersCatalogItem() {
		this.catalogItemFilters = {
			idEquals: null,
			inventoryItemCombinationIdEquals: null,
			catalogIdEquals: null,
			page: 0,
			
		}
	}

	private async searchCatalogItem(page: number) {
		this.catalogItemDTOs = null;

		this.catalogItemFilters.page = page;
		this.catalogItemFilters.size = this.catalogItemPaginationSize;

		this.filteredCatalog = this.commerceAutocompleteService.filterCatalog(this.catalogItemSearchFormGroup.controls['catalog'].valueChanges);
		this.filteredInventoryItemCombination = this.commerceAutocompleteService.filterInventoryItemCombination(this.catalogItemSearchFormGroup.controls['inventoryItemCombination'].valueChanges);

		try {
			this.catalogItemLength = await this.catalogItemResourceService.countCatalogItemsUsingGET(this.catalogItemFilters).toPromise();

			if(this.catalogItemLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.catalogItemDTOs = [];
				return;
			}

			this.catalogItemDTOs = await this.catalogItemResourceService.getAllCatalogItemsUsingGET(this.catalogItemFilters).toPromise();
		} catch (e) {
			this.catalogItemError = e;
		}
	}

	showAllCatalogItem() {
		this.resetFiltersCatalogItem()
	}

	resetFiltersCatalogItem() {
		this.catalogItemSearchFormGroup.reset();
		this.clearFiltersCatalogItem();
		this.searchCatalogItem(0);
	}

	catalogItemPaginationEvent(pageEvent: PageEvent) {
		this.catalogItemPaginationSize = pageEvent.pageSize;
		this.searchCatalogItem(pageEvent.pageIndex);
	}

	catalogItemSearchWithFilter() {
		let searchedId = this.catalogItemSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersCatalogItem();
			this.catalogItemSearchFormGroup.reset();
			this.catalogItemFilters.idEquals = searchedId;
			this.searchCatalogItem(0);
			return;
		}
		this.catalogItemFilters.idEquals = null;

		if (this.catalogItemSearchFormGroup.controls.inventoryItemCombination.value) {
			this.catalogItemFilters.inventoryItemCombinationIdEquals = this.catalogItemSearchFormGroup.controls.inventoryItemCombination.value.id;
		}

		if (this.catalogItemSearchFormGroup.controls.catalog.value) {
			this.catalogItemFilters.catalogIdEquals = this.catalogItemSearchFormGroup.controls.catalog.value.id;
		}

		this.searchCatalogItem(0);
	}

	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----

	newCatalogItem(): void {
        this.dialog.open(AigCatalogItemNewUpdateDialogComponent, { data: { catalogItem: {} } });
    }
}
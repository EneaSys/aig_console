import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { AigCommerceAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigInventoryCategoryNewUpdateModalComponent } from '../inventory-category-new-update-modal/inventory-category-new-update-modal.component';

@Component({
	selector: 'inventory-category-list-page',
	templateUrl: './inventory-category-list-page.component.html',
	styleUrls: ['./inventory-category-list-page.component.scss']
})
export class AigInventoryCategoryListPageComponent extends AigCommerceGenericComponent {
	constructor(
		private inventoryCategoryResourceService: InventoryCategoryResourceService,
		public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initInventoryCategorySearch();

		this.showAllInventoryCategory();
	}

	reloadPage() {
		this.showAllInventoryCategory();
	}

	//			---- INVENTORY CATEGORY TABLE AND SEARCH SECTION ----

	inventoryCategoryDTOs: InventoryCategoryDTO[];
	inventoryCategoryDC: string[];
	inventoryCategoryError: any;

	inventoryCategorySearchFormGroup: FormGroup;
	inventoryCategoryFilters: any;

	inventoryCategoryPaginationSize: number;
	inventoryCategoryLength: number;

	filteredInventoryCategory: Observable<InventoryCategoryDTO[]>;
	filteredParentInventoryCategory: Observable<InventoryCategoryDTO[]>;

	private initInventoryCategorySearch() {
		this.inventoryCategoryPaginationSize = 10;

		this.inventoryCategorySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			parentInventoryCategory: [''],
		});

		this.filteredInventoryCategory = this.commerceAutocompleteService.filterInventoryCategory(this.inventoryCategorySearchFormGroup.controls['name'].valueChanges);

		this.inventoryCategoryDC = ["id", "name", "parentCategory", "buttons"];
	}

	private clearFiltersInventoryCategory() {
		this.inventoryCategoryFilters = {
			inventoryCategoryIDEquals: null,
			inventoryCategoryNameEquals: null,
			page: 0,
		}
	}

	private async searchInventoryCategory(page: number) {
		this.inventoryCategoryDTOs = null;

		this.inventoryCategoryFilters.page = page;
		this.inventoryCategoryFilters.size = this.inventoryCategoryPaginationSize;

		this.filteredInventoryCategory = this.commerceAutocompleteService.filterInventoryCategory(this.inventoryCategorySearchFormGroup.controls['name'].valueChanges);

		try {
			this.inventoryCategoryLength = await this.inventoryCategoryResourceService.countInventoryCategoriesUsingGET(this.inventoryCategoryFilters).toPromise();

			if(this.inventoryCategoryLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.inventoryCategoryDTOs = [];
				return;
			}

			this.inventoryCategoryDTOs = await this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(this.inventoryCategoryFilters).toPromise();
		} catch (e) {
			this.inventoryCategoryError = e;
		}
	}

	showAllInventoryCategory() {
		this.resetFiltersInventoryCategory();
	}

	resetFiltersInventoryCategory() {
		this.inventoryCategorySearchFormGroup.reset();
		this.clearFiltersInventoryCategory();
		this.searchInventoryCategory(0);
	}

	inventoryCategoryPaginationEvent(pageEvent: PageEvent) {
		this.inventoryCategoryPaginationSize = pageEvent.pageSize;
		this.searchInventoryCategory(pageEvent.pageIndex);
	}

	inventoryCategorySearchWithFilter() {
		let searchedId = this.inventoryCategorySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersInventoryCategory();
			this.inventoryCategorySearchFormGroup.reset();
			this.inventoryCategoryFilters.inventoryCategoryIDEquals = searchedId;
			this.searchInventoryCategory(0);
			return;
		}
		this.inventoryCategoryFilters.inventoryCategoryIDEquals = null;

		if (this.inventoryCategorySearchFormGroup.controls.name.value) {
			this.inventoryCategoryFilters.inventoryCategoryNameEquals = this.inventoryCategorySearchFormGroup.controls.name.value.name;
		}

		this.searchInventoryCategory(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----

	newInventoryCategory(): void {
        this.dialog.open(AigInventoryCategoryNewUpdateModalComponent, { data: {} });
    }

	async publish() {
		await this.inventoryCategoryResourceService.publishUsingGET5(this.inventoryCategoryFilters).toPromise;
	}
}
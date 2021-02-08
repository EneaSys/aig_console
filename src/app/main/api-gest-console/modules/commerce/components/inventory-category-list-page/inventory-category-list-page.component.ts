import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
	selector: 'inventory-category-list-page',
	templateUrl: './inventory-category-list-page.component.html',
	styleUrls: ['./inventory-category-list-page.component.scss']
})
export class AigInventoryCategoryListPageComponent extends GenericComponent {
	constructor(
		private inventoryCategoryResourceService: InventoryCategoryResourceService,
		private _formBuilder: FormBuilder,
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

	inventoryCategorySearchFormGroup: FormGroup;
	inventoryCategoryPagination: any;
	inventoryCategoryFilters: any;

	inventoryCategoryLength: number;
	inventoryCategoryDTOs: InventoryCategoryDTO[];
	inventoryCategoryError: any;

	inventoryCategoryDC: string[];

	private initInventoryCategorySearch() {
		this.inventoryCategoryPagination = {
			size: 10,
			page: 0,
		}

		this.inventoryCategorySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.inventoryCategoryDC = ["id", "name", "buttons"];
	}

	private clearFiltersInventoryCategory() {
		this.inventoryCategoryFilters = {
			id: null,
			name: null,
		}
	}

	private async searchInventoryCategory(page: number) {
		this.inventoryCategoryPagination.page = page;
		this.inventoryCategoryDTOs = null;
		try {
			this.inventoryCategoryLength = await this.inventoryCategoryResourceService.countInventoryCategoriesUsingGET(this.inventoryCategoryFilters.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.inventoryCategoryFilters.name,null,null,null,null,null,null,null,null).toPromise();

			if(this.inventoryCategoryLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.inventoryCategoryDTOs = [];
				return;
			}

			this.inventoryCategoryDTOs = await this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(this.inventoryCategoryFilters.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.inventoryCategoryFilters.name, null, null, null, null, null, null, this.inventoryCategoryPagination.page, this.inventoryCategoryPagination.size).toPromise();
		} catch (e) {
			this.inventoryCategoryError = e;
		}
	}

	showAllInventoryCategory() {
		this.clearFiltersInventoryCategory();
		this.searchInventoryCategory(0);
	}

	resetFiltersInventoryCategory() {
		this.inventoryCategorySearchFormGroup.reset();
		this.showAllInventoryCategory();
	}

	inventoryCategoryPaginationEvent(pageEvent: PageEvent) {
		this.inventoryCategoryPagination.size = pageEvent.pageSize;
		this.searchInventoryCategory(pageEvent.pageIndex);
	}

	inventoryCategorySearchWithFilter() {
		let searchedId = this.inventoryCategorySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersInventoryCategory();
			this.inventoryCategorySearchFormGroup.reset();
			this.inventoryCategoryFilters.id = searchedId;
			this.searchInventoryCategory(0);
			return;
		}

		this.inventoryCategoryFilters.name = this.inventoryCategorySearchFormGroup.controls.name.value;

		this.searchInventoryCategory(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----
}
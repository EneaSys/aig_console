import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
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
		private dialog: MatDialog,
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

	private initFiltersInventoryCategory() {
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
			this.inventoryCategoryDTOs = await this.inventoryCategoryResourceService.getAllInventoryCategoriesUsingGET(this.inventoryCategoryFilters.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.inventoryCategoryFilters.name, null, null, null, null, null, null, this.inventoryCategoryPagination.page, this.inventoryCategoryPagination.size).toPromise();
		} catch (e) {
			this.inventoryCategoryError = e;
		}
	}

	showAllInventoryCategory() {
		this.initFiltersInventoryCategory();
		this.searchInventoryCategory(0);
	}

	clearFiltersInventoryCategory() {
		this.inventoryCategorySearchFormGroup.reset();
		this.showAllInventoryCategory();
	}

	inventoryCategoryPaginationEvent(pageEvent: PageEvent) {
		this.inventoryCategoryPagination.size = pageEvent.pageSize;
		this.searchInventoryCategory(pageEvent.pageIndex);
	}

	inventoryCategorySearchWithFilter() {
		this.inventoryCategoryFilters.id = this.inventoryCategorySearchFormGroup.controls.id.value;
		this.inventoryCategoryFilters.name = this.inventoryCategorySearchFormGroup.controls.name.value;

		this.searchInventoryCategory(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----
}
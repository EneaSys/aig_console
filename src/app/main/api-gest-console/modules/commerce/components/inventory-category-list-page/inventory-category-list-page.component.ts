import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryCategoryNewUpdateModalComponent } from '../inventory-category-new-update-modal/inventory-category-new-update-modal.component';

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
	inventoryCategoryPaginationSize: number;
	inventoryCategoryFilters: any;

	inventoryCategoryLength: number;
	inventoryCategoryDTOs: InventoryCategoryDTO[];
	inventoryCategoryError: any;

	inventoryCategoryDC: string[];

	private initInventoryCategorySearch() {
		this.inventoryCategoryPaginationSize = 10;

		this.inventoryCategorySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.inventoryCategoryDC = ["id", "name", "inventoryCategoryName", "buttons"];
	}

	private clearFiltersInventoryCategory() {
		this.inventoryCategoryFilters = {
			inventoryCategoryIdEquals: null,
			inventoryCategoryNameContains: null,
			page: 0,
			
		}
	}

	private async searchInventoryCategory(page: number) {
		this.inventoryCategoryDTOs = null;

		this.inventoryCategoryFilters.page = page;
		this.inventoryCategoryFilters.size = this.inventoryCategoryPaginationSize;

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
			this.inventoryCategoryFilters.idEquals = searchedId;
			this.searchInventoryCategory(0);
			return;
		}
		this.inventoryCategoryFilters.idEquals = null;

		this.inventoryCategoryFilters.nameContains = this.inventoryCategorySearchFormGroup.controls.name.value;

		this.searchInventoryCategory(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----

	newInventoryCategory(): void {
        this.dialog.open(AigInventoryCategoryNewUpdateModalComponent, { data: { inventoryCategory: {} } });
    }
}
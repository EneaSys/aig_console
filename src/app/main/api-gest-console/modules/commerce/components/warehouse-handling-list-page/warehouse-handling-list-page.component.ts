import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'warehouse-handling-list-page',
    templateUrl: './warehouse-handling-list-page.component.html',
    styleUrls: ['./warehouse-handling-list-page.component.scss']
})
export class AigWarehouseHandlingListPageComponent extends GenericComponent {
    constructor(
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
    
    loadPage() {
		this.initWarehouseHandlingSearch();

		this.showAllWarehouseHandling();
	}

	reloadPage() {
		this.showAllWarehouseHandling();
	}

    //			---- INVENTORY CATEGORY TABLE AND SEARCH SECTION ----
    
    warehouseHandlingSearchFormGroup: FormGroup;
	warehouseHandlingPagination: any;
	warehouseHandlingFilters: any;

	warehouseHandlingLength: number;
	warehouseHandlingDTOs: WarehouseHandlingDTO[];
	warehouseHandlingError: any;

    warehouseHandlingDC: string[];

    private initWarehouseHandlingSearch() {
		this.warehouseHandlingPagination = {
			size: 10,
			page: 0,
		}

		this.warehouseHandlingSearchFormGroup = this._formBuilder.group({
			id: [''],
		});

		this.warehouseHandlingDC = ["date", "id", "warehouseHandlingType", "buttons"];
	}

	private clearFiltersWarehouseHandling() {
		this.warehouseHandlingFilters = {
			id: null,
		}
	}

	private async searchWarehouseHandling(page: number) {
		this.warehouseHandlingPagination.page = page;
		this.warehouseHandlingDTOs = null;
		try {
			this.warehouseHandlingLength = await this.warehouseHandlingResourceService.countWarehouseHandlingsUsingGET().toPromise();

			if(this.warehouseHandlingLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.warehouseHandlingDTOs = [];
				return;
			}

			this.warehouseHandlingDTOs = await this.warehouseHandlingResourceService.getAllWarehouseHandlingsUsingGET().toPromise();
		} catch (e) {
			this.warehouseHandlingError = e;
		}
	}

	showAllWarehouseHandling() {
		this.clearFiltersWarehouseHandling();
		this.searchWarehouseHandling(0);
	}

	resetFiltersWarehouseHandling() {
		this.warehouseHandlingSearchFormGroup.reset();
		this.showAllWarehouseHandling();
	}

	warehouseHandlingPaginationEvent(pageEvent: PageEvent) {
		this.warehouseHandlingPagination.size = pageEvent.pageSize;
		this.searchWarehouseHandling(pageEvent.pageIndex);
	}

	warehouseHandlingSearchWithFilter() {
		let searchedId = this.warehouseHandlingSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersWarehouseHandling();
			this.warehouseHandlingSearchFormGroup.reset();
			this.warehouseHandlingFilters.id = searchedId;
			this.searchWarehouseHandling(0);
			return;
		}

		this.searchWarehouseHandling(0);
	}
	//			---- !INVENTORY CATEGORY TABLE AND SEARCH SECTION ----
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigWarehouseNewUpdateModalComponent } from '../warehouse-new-update-modal/warehouse-new-update-modal.component';

@Component({
	selector: 'aig-warehouse-list-page',
	templateUrl: './warehouse-list-page.component.html',
	styleUrls: ['./warehouse-list-page.component.scss']
})
export class AigWarehouseListPageComponent extends GenericComponent {
	constructor(
		private warehouseResourceService: WarehouseResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	
	
	loadPage() {
		this.initWarehouseSearch();

		this.showAllWarehouse();
	}

	reloadPage() {
		this.showAllWarehouse();
	}


//			---- WAREHOUSE TABLE AND SEARCH SECTION ----

	warehouseSearchFormGroup: FormGroup;
	warehousePagination: any;
	warehouseFilters: any;

	warehouseLength: number;
	warehouseDTOs: WarehouseDTO[];
	warehouseError: any;

	warehouseDC: string[];

	
	private initWarehouseSearch() {
		this.warehouseDC = ["id", "name", "buttons"];

		this.warehousePagination = {
			page: 0,
			size: 10,
		}

		this.warehouseSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersWarehouse() {
		this.warehouseFilters = {
			id: null,
			name: null,
		}
	}

	private async searchWarehouse(page: number) {
		this.warehousePagination.page = page;
		this.warehouseDTOs = null;
		try {                                                                       
			this.warehouseLength = await this.warehouseResourceService.countWarehousesUsingGET(this.warehouseFilters.id,null,null,null,null,null,null,null,null,this.warehouseFilters.name).toPromise();  
			
			if(this.warehouseLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.warehouseDTOs = [];
				return;
			}

			this.warehouseDTOs = await this.warehouseResourceService.getAllWarehousesUsingGET(this.warehouseFilters.id,null,null,null,null,null,null,null,null,this.warehouseFilters.name,null,null,null,null,null,null,this.warehousePagination.page,this.warehousePagination.size).toPromise();
		} catch (e) {
			this.warehouseError = e;
		}
	}
	

	showAllWarehouse() {
		this.clearFiltersWarehouse();
		this.searchWarehouse(0);
	}

	resetFiltersTenantContext() {
		this.warehouseSearchFormGroup.reset();
		this.showAllWarehouse();
	}

	warehousePaginationEvent(pageEvent: PageEvent) {
		this.warehousePagination.size = pageEvent.pageSize;
		this.searchWarehouse(pageEvent.pageIndex);
	}

	warehouseSearchWithFilter() {
		let searchedId = this.warehouseSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersWarehouse();
			this.warehouseSearchFormGroup.reset();
			this.warehouseFilters.id = searchedId;
			this.searchWarehouse(0);
			return;
		}

		this.warehouseFilters.name = this.warehouseSearchFormGroup.controls.name.value;

		this.searchWarehouse(0);
	}

	newWarehouse(): void {
        this.dialog.open(AigWarehouseNewUpdateModalComponent, { data: { social: {} } });
    }
	
}


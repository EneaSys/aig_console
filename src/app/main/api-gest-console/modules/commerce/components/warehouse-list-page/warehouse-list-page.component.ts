import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigWarehouseNewUpdateModalComponent } from '../warehouse-new-update-modal/warehouse-new-update-modal.component';

@Component({
	selector: 'aig-warehouse-list-page',
	templateUrl: './warehouse-list-page.component.html',
	styleUrls: ['./warehouse-list-page.component.scss']
})
export class AigWarehouseListPageComponent extends AigCommerceGenericComponent {
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
	warehousePaginationSize: number;
	warehouseFilters: any;

	warehouseLength: number;
	warehouseDTOs: WarehouseDTO[];
	warehouseError: any;

	warehouseDC: string[];

	
	private initWarehouseSearch() {
		this.warehouseDC = ["id", "name", "buttons"];

		this.warehousePaginationSize = 10;
		

		this.warehouseSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersWarehouse() {
		this.warehouseFilters = {
			warehouseIDEquals: null,
			warehouseNameContains: null,
			page: 0,
		}
	}

	private async searchWarehouse(page: number) {
		this.warehouseDTOs = null;

		this.warehouseFilters.page = page;
		this.warehouseFilters.size = this.warehousePaginationSize;

		try {                                                                       
			this.warehouseLength = await this.warehouseResourceService.countWarehousesUsingGET(this.warehouseFilters).toPromise();  
			
			if(this.warehouseLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.warehouseDTOs = [];
				return;
			}

			this.warehouseDTOs = await this.warehouseResourceService.getAllWarehousesUsingGET(this.warehouseFilters).toPromise();
		} catch (e) {
			this.warehouseError = e;
		}
	}
	

	showAllWarehouse() {
		this.resetFiltersWarehouse();
		
	}

	resetFiltersWarehouse() {
		this.warehouseSearchFormGroup.reset();
		this.clearFiltersWarehouse();
		this.searchWarehouse(0);

	}

	warehousePaginationEvent(pageEvent: PageEvent) {
		this.warehousePaginationSize = pageEvent.pageSize;
		this.searchWarehouse(pageEvent.pageIndex);
	}

	warehouseSearchWithFilter() {
		let searchedId = this.warehouseSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersWarehouse();
			this.warehouseSearchFormGroup.reset();
			this.warehouseFilters.warehouseIDEquals = searchedId;
			this.searchWarehouse(0);
			return;
		}
		this.warehouseFilters.warehouseIDEquals = null;

		this.warehouseFilters.warehouseNameContains = this.warehouseSearchFormGroup.controls.name.value;

		this.searchWarehouse(0);
	}

	//			---- !WAREHOUSE TABLE AND SEARCH SECTION ----

	newWarehouse(): void {
        this.dialog.open(AigWarehouseNewUpdateModalComponent, { data: {} });
    }

	async publish() {
		await this.warehouseResourceService.publishUsingGET20(this.warehouseFilters).toPromise();
	}

	
}


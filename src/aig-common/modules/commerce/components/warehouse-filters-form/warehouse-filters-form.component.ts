
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'warehouse-filters-form',
    templateUrl: './warehouse-filters-form.component.html',
    styleUrls: ['./warehouse-filters-form.component.scss']
})
export class WarehouseFilterFormComponent extends GenericComponent {
    constructor( 
        private warehouseResourceService: WarehouseResourceService,
        private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    warehouseSearchFormGroup: FormGroup;
    warehousePaginationSize: number;
    warehouseFilters: any;

    warehouseLength: number;
	warehouseDTOs: WarehouseDTO[];
	warehouseError: any;

    private initWarehouseSearch() {

		this.warehousePaginationSize = 10;
		

		this.warehouseSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

    
	loadPage() {
		this.initWarehouseSearch();
	}

	showAllWarehouse() {
		this.resetFiltersWarehouse();
		
	}

	resetFiltersWarehouse() {
		this.warehouseSearchFormGroup.reset();
		this.clearFiltersWarehouse();
		this.searchWarehouse(0);

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
    
}

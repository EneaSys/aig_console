import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseDTO, WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigWarehouseHandlingNewUpdateModalComponent } from '../warehouse-handling-new-update-modal/warehouse-handling-new-update-modal.component';

interface warehouseHandling {
	value: string;
	viewValue: string;
  }
@Component({
    selector: 'aig-warehouse-handling-list-page',
    templateUrl: './warehouse-handling-list-page.component.html',
    styleUrls: ['./warehouse-handling-list-page.component.scss']
})
export class AigWarehouseHandlingListPageComponent extends GenericComponent {
	warehouseHandlings: warehouseHandling[] = [
		{value: 'load-0', viewValue: 'Load'},
		{value: 'shift-1', viewValue: 'Shift'},
		{value: 'unload-2', viewValue: 'Unload'}
	  ];

	constructor(
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private warehouseHandlingResourceService: WarehouseHandlingResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
        aigGenericComponentService: AigGenericComponentService,
	
    ) { super(aigGenericComponentService) }

	@Input()
    warehouse: WarehouseDTO;

	filteredWarehouseToLoad: Observable<WarehouseDTO[]>;
	filteredWarehouseToUnload: Observable<WarehouseDTO[]>;
	
	loadPage() {
		this.initWarehouseHandlingSearch();

		this.showAllWarehouseHandling();
	}

	reloadPage() {
		this.showAllWarehouseHandling();
	}

	//			---- WAREHOUSE HANDLING TABLE AND SEARCH SECTION ----

	warehouseHandlingSearchFormGroup: FormGroup;
	warehouseHandlingPaginationSize: number;
	warehouseHandlingFilters: any;

	warehouseHandlingLength: number;
	warehouseHandlingDTOs: WarehouseHandlingDTO[];
	warehouseHandlingError: any;
	warehouseDTOs: WarehouseDTO[];

	warehouseHandlingDC: string[];

	private initWarehouseHandlingSearch() {
		this.warehouseHandlingPaginationSize = 10;
	
		this.warehouseHandlingSearchFormGroup = this._formBuilder.group({
			id: [''],
			date: [''],
			warehouseHandlingType:[''],
			warehouseToLoad:[''],
			warehouseToUnload:[''],
		});

		this.filteredWarehouseToLoad = this.commerceAutocompleteService.filterWarehouse(this.warehouseHandlingSearchFormGroup.controls['warehouseToLoad'].valueChanges);
		this.filteredWarehouseToUnload = this.commerceAutocompleteService.filterWarehouse(this.warehouseHandlingSearchFormGroup.controls['warehouseToUnload'].valueChanges);


		this.warehouseHandlingDC = ["id","date","warehouseHandlingType","warehouseToLoadName","warehouseToUnloadName","buttons"];
	}


	
	private clearFiltersWarehouseHandling() {
		this.warehouseHandlingFilters = {
			idEquals: null,
			date:null,
			warehouseHandlingType:null,
			warehouseToLoadName:null,
			warehouseToUnloadName:null,
			page: 0,
		}
	}

	private async searchWarehouseHandling(page: number) {
		this.warehouseHandlingFilters.page = page;
		this.warehouseHandlingFilters.size = this.warehouseHandlingPaginationSize;
		this.warehouseHandlingDTOs = null;
		try {
			this.warehouseHandlingLength = await this.warehouseHandlingResourceService.countWarehouseHandlingsUsingGET(this.warehouseHandlingFilters).toPromise(); 
			
			if(this.warehouseHandlingLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.warehouseHandlingDTOs = [];
				return;
			}

			this.warehouseHandlingDTOs = await this.warehouseHandlingResourceService.getAllWarehouseHandlingsUsingGET(this.warehouseHandlingFilters).toPromise();
		} catch (e) {
			this.warehouseHandlingError = e;
		}
	}

	showAllWarehouseHandling() {
		this.resetFiltersWarehouseHandling();
	}

	resetFiltersWarehouseHandling() {
		this.warehouseHandlingSearchFormGroup.reset();
		this.clearFiltersWarehouseHandling();
		this.searchWarehouseHandling(0);
	}

	warehouseHandlingPaginationEvent(pageEvent: PageEvent) {
		this.warehouseHandlingPaginationSize = pageEvent.pageSize;
		this.searchWarehouseHandling(pageEvent.pageIndex);
	}

	warehouseHandlingSearchWithFilter() {
		let searchedId = this.warehouseHandlingSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersWarehouseHandling();
			this.warehouseHandlingSearchFormGroup.reset();
			this.warehouseHandlingFilters.idEquals = searchedId;
			this.searchWarehouseHandling(0);
			return;
		}
		this.warehouseHandlingFilters.idEquals = null;
		
		this.warehouseHandlingFilters.date = this.warehouseHandlingSearchFormGroup.controls.date.value;

		this.searchWarehouseHandling(0);
	}

	newWarehouseHandling(): void {
		this.dialog.open(AigWarehouseHandlingNewUpdateModalComponent, { data: { warehouseHandling: {} } });
   }
	
	//			---- !WAREHOUSE HANDLING SECTION ----

	
}

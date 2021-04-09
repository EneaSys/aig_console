import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseDTO, WarehouseHandlingDTO, WarehouseHandlingResourceService, WarehouseResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigWarehouseHandlingComplexModalComponent } from '../warehouse-handling-complex-modal/warehouse-handling-complex-modal.component';
import { AigWarehouseHandlingNewUpdateModalComponent } from '../warehouse-handling-new-update-modal/warehouse-handling-new-update-modal.component';

@Component({
    selector: 'aig-warehouse-handling-list-page',
    templateUrl: './warehouse-handling-list-page.component.html',
    styleUrls: ['./warehouse-handling-list-page.component.scss']
})
export class AigWarehouseHandlingListPageComponent extends GenericComponent {

	constructor(
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private warehouseHandlingResourceService: WarehouseHandlingResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		private warehouseResourceService: WarehouseResourceService,
        aigGenericComponentService: AigGenericComponentService,
	
    ) { super(aigGenericComponentService) }

	@Input()
    staticWarehouseToLoad: WarehouseDTO = null;

	filteredWarehouseToLoad: Observable<WarehouseDTO[]>;
	filteredWarehouseToUnload: Observable<WarehouseDTO[]>;

	warehouseDTO : WarehouseDTO;
	
	loadPage() {
		this.initWarehouseHandlingSearch();

		this.warehouseDTO = this.staticWarehouseToLoad;

		this.showAllWarehouseHandling();
	}

	async reloadPage() {
		this.showAllWarehouseHandling();

		this.warehouseDTO = await this.warehouseResourceService.getWarehouseUsingGET(this.staticWarehouseToLoad.id).toPromise();

	}

	//			---- WAREHOUSE HANDLING TABLE AND SEARCH SECTION ----

	warehouseHandlingSearchFormGroup: FormGroup;
	warehouseHandlingPaginationSize: number;
	warehouseHandlingFilters: any;

	warehouseHandlingLength: number;
	warehouseHandlingDTOs: WarehouseHandlingDTO[];
	warehouseHandlingError: any;

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


		this.warehouseHandlingDC = ["id","date","warehouseHandlingType","warehouse","buttons"];
	}


	
	private clearFiltersWarehouseHandling() {
		this.warehouseHandlingFilters = {
			warehouseHandlingIdEquals: null,
			warehouseHandlingDateEquals:null,
			warehouseHandlingTypeEquals:null,
			warehouseToLoadIdEquals: this.staticWarehouseToLoad ? this.staticWarehouseToLoad.id : null,
			warehouseToUnloadIdEquals:null,
			page: 0,
		}
	}

	private async searchWarehouseHandling(page: number) {
		this.warehouseHandlingFilters.page = page;
		this.warehouseHandlingFilters.size = this.warehouseHandlingPaginationSize;
		this.warehouseHandlingDTOs = null;
		try {
			this.warehouseHandlingLength = await this.warehouseHandlingResourceService.countWarehouseHandlingsUsingGET(this.warehouseHandlingFilters,).toPromise(); 
			
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
			this.warehouseHandlingFilters.warehouseHandlingIdEquals = searchedId;
			this.searchWarehouseHandling(0);
			return;
		} else{

			if(this.warehouseHandlingSearchFormGroup.controls.date.value){
				this.warehouseHandlingFilters.warehouseHandlingDateEquals = this.warehouseHandlingSearchFormGroup.controls.date.value;
			}

			if(this.warehouseHandlingSearchFormGroup.controls.warehouseHandlingType.value){
				this.warehouseHandlingFilters.warehouseHandlingTypeEquals = this.warehouseHandlingSearchFormGroup.controls.warehouseHandlingType.value;
			}

			if(this.warehouseHandlingSearchFormGroup.controls.warehouseToLoad.value){
				this.warehouseHandlingFilters.warehouseToLoadIdEquals = this.warehouseHandlingSearchFormGroup.controls.warehouseToLoad.value.id;
			}

			if(this.warehouseHandlingSearchFormGroup.controls.warehouseToUnload.value){
				this.warehouseHandlingFilters.warehouseToUnloadIdEquals = this.warehouseHandlingSearchFormGroup.controls.warehouseToUnload.value.id;
			}

			this.searchWarehouseHandling(0);
		}
	}

	newWarehouseHandling(warehouseDTO: WarehouseDTO ): void {
		this.dialog.open(AigWarehouseHandlingNewUpdateModalComponent, { data: { warehouse: warehouseDTO } });
   }

   newWarehouseHandlingComplex(): void {
		this.dialog.open(AigWarehouseHandlingComplexModalComponent, { data: { warehouseHandling: {} } });
	}
	
	//			---- !WAREHOUSE HANDLING SECTION ----

	
}

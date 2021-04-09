import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ProducerDTO, WarehouseDTO, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigWarehouseHandlingItemNewUpdateModalComponent } from '../warehouse-handling-item-new-update-modal/warehouse-handling-item-new-update-modal.component';
import { AigWarehouseNewUpdateModalComponent } from '../warehouse-new-update-modal/warehouse-new-update-modal.component';

@Component({
	selector: 'aig-warehouse-handling-item-list-page',
	templateUrl: './warehouse-handling-item-list-page.component.html',
	styleUrls: ['./warehouse-handling-item-list-page.component.scss']
})
export class AigWarehouseHandlingItemListPageComponent extends GenericComponent {
	constructor(
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
    ) { super(aigGenericComponentService) }

	@Input()
    staticWarehouseToLoad: WarehouseDTO = null;

	filteredWarehouseToLoad: Observable<WarehouseDTO[]>;
	filteredWarehouseToUnload: Observable<WarehouseDTO[]>;
	filteredProducer: Observable<ProducerDTO[]>;

	
	
	loadPage() {
		this.initWarehouseHandlingItemSearch();

		this.showAllWarehouseHandlingItem();
	}

	reloadPage() {
		this.showAllWarehouseHandlingItem();
	}


//			---- WAREHOUSE TABLE AND SEARCH SECTION ----

	warehouseHandlingItemSearchFormGroup: FormGroup;
	warehouseHandlingItemPaginationSize: number;
	warehouseHandlingItemFilters: any;

	warehouseHandlingItemLength: number;
	warehouseHandlingItemDTOs: WarehouseHandlingItemDTO[];
	warehouseHandlingItemError: any;

	warehouseHandlingItemDC: string[];

	
	private initWarehouseHandlingItemSearch() {
		this.warehouseHandlingItemDC = ["id","warehouseDate","warehouseHandlingType","warehouse","inventoryItemProducer", "inventoryItemCombination","quantity", "buttons"];

		this.warehouseHandlingItemPaginationSize = 10;
		

		this.warehouseHandlingItemSearchFormGroup = this._formBuilder.group({
			id: [''],
			date: [''],
			warehouseHandlingType:[''],
			warehouseToLoad:[''],
			warehouseToUnload:[''],
			producer:[''],
		});

		this.filteredWarehouseToLoad = this.commerceAutocompleteService.filterWarehouse(this.warehouseHandlingItemSearchFormGroup.controls['warehouseToLoad'].valueChanges);
		this.filteredWarehouseToUnload = this.commerceAutocompleteService.filterWarehouse(this.warehouseHandlingItemSearchFormGroup.controls['warehouseToUnload'].valueChanges);
		this.filteredProducer = this.commerceAutocompleteService.filterProducer(this.warehouseHandlingItemSearchFormGroup.controls['producer'].valueChanges);
	}

	private clearFiltersWarehouseHandlingItem() {
		this.warehouseHandlingItemFilters = {
			warehouseHandlingItemIdEquals: null,
			warehouseHandlingItemNameContains: null,
			page: 0,
		}
	}

	private async searchWarehouseHandlingItem(page: number) {
		this.warehouseHandlingItemDTOs = null;

		this.warehouseHandlingItemFilters.page = page;
		this.warehouseHandlingItemFilters.size = this.warehouseHandlingItemPaginationSize;

		try {                                                                       
			this.warehouseHandlingItemLength = await this.warehouseHandlingItemResourceService.countWarehouseHandlingItemsUsingGET(this.warehouseHandlingItemFilters).toPromise();  
			
			if(this.warehouseHandlingItemLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.warehouseHandlingItemDTOs = [];
				return;
			}

			this.warehouseHandlingItemDTOs = await this.warehouseHandlingItemResourceService.getAllWarehouseHandlingItemsUsingGET(this.warehouseHandlingItemFilters).toPromise();
		} catch (e) {
			this.warehouseHandlingItemError = e;
		}
	}
	

	showAllWarehouseHandlingItem() {
		this.resetFiltersWarehouseHandlingItem();
		
	}

	resetFiltersWarehouseHandlingItem() {
		this.warehouseHandlingItemSearchFormGroup.reset();
		this.clearFiltersWarehouseHandlingItem();
		this.searchWarehouseHandlingItem(0);

	}

	warehouseHandlingItemPaginationEvent(pageEvent: PageEvent) {
		this.warehouseHandlingItemPaginationSize = pageEvent.pageSize;
		this.searchWarehouseHandlingItem(pageEvent.pageIndex);
	}

	warehouseHandlingItemSearchWithFilter() {
		let searchedId = this.warehouseHandlingItemSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersWarehouseHandlingItem();
			this.warehouseHandlingItemSearchFormGroup.reset();
			this.warehouseHandlingItemFilters.warehouseHandlingItemIdEquals = searchedId;
			this.searchWarehouseHandlingItem(0);
			return;
		}

		/*if(this.warehouseHandlingItemSearchFormGroup.controls.date.value){
			this.warehouseHandlingItemFilters.dateEquals = this.warehouseHandlingItemSearchFormGroup.controls.date.value;
		}

		if(this.warehouseHandlingItemSearchFormGroup.controls.warehouseHandlingType.value){
			this.warehouseHandlingItemFilters.warehouseHandlingTypeEquals = this.warehouseHandlingItemSearchFormGroup.controls.warehouseHandlingType.value;
		}

		if(this.warehouseHandlingItemSearchFormGroup.controls.warehouseToLoad.value){
			this.warehouseHandlingItemFilters.warehouseToLoadIdEquals = this.warehouseHandlingItemSearchFormGroup.controls.warehouseToLoad.value.id;
		}

		if(this.warehouseHandlingItemSearchFormGroup.controls.warehouseToUnload.value){
			this.warehouseHandlingItemFilters.warehouseToUnloadIdEquals = this.warehouseHandlingItemSearchFormGroup.controls.warehouseToUnload.value.id;
		}*/
		this.warehouseHandlingItemFilters.warehouseHandlingItemIdEquals = null;

		

		this.searchWarehouseHandlingItem(0);
	}

	//			---- !WAREHOUSE TABLE AND SEARCH SECTION ----

	newWarehouseHandlingItem(): void {
        this.dialog.open(AigWarehouseHandlingItemNewUpdateModalComponent, { data: { warehouseHandlingItem: {} } });
    }
	
}

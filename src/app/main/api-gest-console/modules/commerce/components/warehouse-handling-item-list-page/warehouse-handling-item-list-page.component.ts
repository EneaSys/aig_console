import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigWarehouseHandlingItemNewUpdateModalComponent } from '../warehouse-handling-item-new-update-modal/warehouse-handling-item-new-update-modal.component';
import { AigWarehouseNewUpdateModalComponent } from '../warehouse-new-update-modal/warehouse-new-update-modal.component';

@Component({
	selector: 'aig-warehouse-handling-item-list-page',
	templateUrl: './warehouse-handling-item-list-page.component.html',
	styleUrls: ['./warehouse-handling-item-list-page.component.scss']
})
export class AigWarehouseHandlingItemListPageComponent extends GenericComponent {
	constructor(
		private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	
	
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
			name: [''],
		});
	}

	private clearFiltersWarehouseHandlingItem() {
		this.warehouseHandlingItemFilters = {
			idEquals: null,
			nameContains: null,
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
			this.warehouseHandlingItemFilters.idEquals = searchedId;
			this.searchWarehouseHandlingItem(0);
			return;
		}
		this.warehouseHandlingItemFilters.idEquals = null;

		this.warehouseHandlingItemFilters.nameContains = this.warehouseHandlingItemSearchFormGroup.controls.name.value;

		this.searchWarehouseHandlingItem(0);
	}

	//			---- !WAREHOUSE TABLE AND SEARCH SECTION ----

	newWarehouseHandlingItem(): void {
        this.dialog.open(AigWarehouseHandlingItemNewUpdateModalComponent, { data: { warehouseHandlingItem: {} } });
    }
	
}

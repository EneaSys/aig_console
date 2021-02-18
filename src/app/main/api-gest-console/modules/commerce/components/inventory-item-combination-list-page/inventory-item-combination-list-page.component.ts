import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { InventoryItemCombinationResourceService, WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { AigInventoryItemCombinationNewUpdateFormComponent } from 'aig-common/modules/commerce/components/inventory-item-combination-new-update-form/inventory-item-combination-new-update-form.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from '../inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';
import { AigWarehouseNewUpdateModalComponent } from '../warehouse-new-update-modal/warehouse-new-update-modal.component';

@Component({
	selector: 'aig-inventory-item-combination-list-page',
	templateUrl: './inventory-item-combination-list-page.component.html',
	styleUrls: ['./inventory-item-combination-list-page.component.scss']
})
export class AigInventoryItemCombinationListPageComponent extends GenericComponent {
	constructor(
		private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	
	
	loadPage() {
		this.initInventoryItemCombinationSearch();

		this.showAllInventoryItemCombination();
	}

	reloadPage() {
		this.showAllInventoryItemCombination();
	}


//			---- TABLE AND SEARCH SECTION ----

    inventoryItemCombinationSearchFormGroup: FormGroup;
    inventoryItemCombinationPaginationSize: number;
    inventoryItemCombinationFilters: any;

	inventoryItemCombinationLength: number;
	inventoryItemCombinationDTOs: WarehouseDTO[];
	inventoryItemCombinationError: any;

	inventoryItemCombinationDC: string[];

	
	private initInventoryItemCombinationSearch() {
		this.inventoryItemCombinationDC = ["id", "name", "buttons"];

		this.inventoryItemCombinationPaginationSize = 10;
		

		this.inventoryItemCombinationSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersInventoryItemCombination() {
		this.inventoryItemCombinationFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchInventoryItemCombination(page: number) {
		this.inventoryItemCombinationDTOs = null;

		this.inventoryItemCombinationFilters.page = page;
		this.inventoryItemCombinationFilters.size = this.inventoryItemCombinationPaginationSize;

		try {                                                                       
			this.inventoryItemCombinationLength = await this.inventoryItemCombinationResourceService.countInventoryItemCombinationsUsingGET(this.inventoryItemCombinationFilters).toPromise();  
			
			if(this.inventoryItemCombinationLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.inventoryItemCombinationDTOs = [];
				return;
			}

			this.inventoryItemCombinationDTOs = await this.inventoryItemCombinationResourceService.getAllInventoryItemCombinationsUsingGET(this.inventoryItemCombinationFilters).toPromise();
		} catch (e) {
			this.inventoryItemCombinationError = e;
		}
	}
	

	showAllInventoryItemCombination() {
		this.resetFiltersInventoryItemCombination();
		
	}

	resetFiltersInventoryItemCombination() {
		this.inventoryItemCombinationSearchFormGroup.reset();
		this.clearFiltersInventoryItemCombination();
		this.searchInventoryItemCombination(0);

	}

	inventoryItemCombinationPaginationEvent(pageEvent: PageEvent) {
		this.inventoryItemCombinationPaginationSize = pageEvent.pageSize;
		this.searchInventoryItemCombination(pageEvent.pageIndex);
	}

	inventoryItemCombinationSearchWithFilter() {
		let searchedId = this.inventoryItemCombinationSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersInventoryItemCombination();
			this.inventoryItemCombinationSearchFormGroup.reset();
			this.inventoryItemCombinationFilters.idEquals = searchedId;
			this.searchInventoryItemCombination(0);
			return;
		}
		this.inventoryItemCombinationFilters.idEquals = null;

		this.inventoryItemCombinationFilters.nameContains = this.inventoryItemCombinationSearchFormGroup.controls.name.value;

		this.searchInventoryItemCombination(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newInventoryItemCombination(): void {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: {} } });
    }
	
}
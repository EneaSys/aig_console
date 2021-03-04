import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemDialogComponent } from '../inventory-item-dialog/inventory-item-dialog.component';

@Component({
    selector: 'aig-inventory-item-list-page',
    templateUrl: './inventory-item-list-page.component.html',
    styleUrls: ['./inventory-item-list-page.component.scss']
})
export class AigInventoryItemListPageComponent extends GenericComponent {
    constructor(
        private inventoryItemResourceService : InventoryItemResourceService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }





    loadPage() {
		this.initInventoryItemSearch();

		this.showAllInventoryItem();
	}


	reloadPage() {
		this.showAllInventoryItem();
    }
    





    //			---- INVENTORY ITEM TABLE AND SEARCH SECTION ----

    inventoryItemSearchFormGroup: FormGroup;
    inventoryItemPaginationSize: number;
    inventoryItemFilters: any;

    inventoryItemLength: number;
    inventoryItemDTOs: InventoryItemDTO[];
    inventoryItemError : any;

    inventoryItemDC : string[];

    private initInventoryItemSearch() {
		this.inventoryItemPaginationSize = 10
	
		this.inventoryItemSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
      category: [''],
      producer: ['']
		});

		this.inventoryItemDC = ["id","inventoryCategoryName","name","producerName","buttons",];
    }
    

    private clearFiltersInventoryItem() {
		this.inventoryItemFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
    }
    
    private async searchInventoryItem(page: number) {
        this.inventoryItemDTOs = null;
        this.inventoryItemFilters.page = page;
        this.inventoryItemFilters.size = this.inventoryItemPaginationSize;
        try {
            this.inventoryItemLength = await this.inventoryItemResourceService.countInventoryItemsUsingGET(this.inventoryItemFilters).toPromise();

            if(this.inventoryItemLength == 0) {
              this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
              this.inventoryItemDTOs = [];
              return;
            }
      
            this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(this.inventoryItemFilters).toPromise();
        } catch (e) {
            this.inventoryItemError = e;
        }
    }

    showAllInventoryItem() {
		this.resetFiltersInventoryItem();
	}


    resetFiltersInventoryItem() {
		this.inventoryItemSearchFormGroup.reset();
		this.clearFiltersInventoryItem();
		this.searchInventoryItem(0);
	}
    
    inventoryItemPaginationEvent(pageEvent: PageEvent) {
        this.inventoryItemPaginationSize = pageEvent.pageSize;
        this.searchInventoryItem(pageEvent.pageIndex);
	}

    
    inventoryItemSearchWithFilter() {
      let searchedId = this.inventoryItemSearchFormGroup.controls.id.value;

      if(searchedId != null) {
        this.clearFiltersInventoryItem();
        this.inventoryItemSearchFormGroup.reset();
        this.inventoryItemFilters.idEquals= searchedId;
        this.searchInventoryItem(0);
        return;
      }
      
		this.inventoryItemFilters.idEquals = null;
		this.inventoryItemFilters.nameContains = this.inventoryItemSearchFormGroup.controls.name.value;

		this.searchInventoryItem(0);
  }
  
  
  newInventoryItem(): void {
    this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: {} } });
}

}

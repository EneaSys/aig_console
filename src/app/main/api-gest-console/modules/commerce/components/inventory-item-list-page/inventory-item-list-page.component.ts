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
    inventoryItemPagination: any;
    inventoryItemFilters: any;

    inventoryItemLength: number;
    inventoryItemDTOs: InventoryItemDTO[];
    inventoryItemError : any;

    inventoryItemDC : string[];

    private initInventoryItemSearch() {
		this.inventoryItemPagination = {
			size: 10,
			page: 0
		}
	
		this.inventoryItemSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.inventoryItemDC = ["id","inventoryCategoryName","name","producerName","buttons",];
    }
    

    private clearFiltersInventoryItem() {
		this.inventoryItemFilters = {
			id: null,
			name: null,
		}
    }
    
    private async searchInventoryItem(page: number) {
        this.inventoryItemPagination.page = page;
        this.inventoryItemDTOs = null;
        try {
            this.inventoryItemLength = await this.inventoryItemResourceService.countInventoryItemsUsingGET().toPromise();

            if(this.inventoryItemLength == 0) {
              this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
              this.inventoryItemDTOs = [];
              return;
            }
      
            this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(this.inventoryItemFilters.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.inventoryItemFilters.name,null,null,null,null,null,null,this.inventoryItemFilters.page,null,null,null,null,null,null,null,null,null,this.inventoryItemFilters.size).toPromise();
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
        this.inventoryItemPagination.size = pageEvent.pageSize;
        this.searchInventoryItem(pageEvent.pageIndex);
	}

    
    inventoryItemSearchWithFilter() {
      let searchedId = this.inventoryItemSearchFormGroup.controls.id.value;

      if(searchedId != null) {
        this.clearFiltersInventoryItem();
        this.inventoryItemSearchFormGroup.reset();
        this.inventoryItemFilters.id = searchedId;
        this.searchInventoryItem(0);
        return;
      }
      
		this.inventoryItemFilters.id = null;
		this.inventoryItemFilters.name = this.inventoryItemSearchFormGroup.controls.name.value;

		this.searchInventoryItem(0);
  }
  
  
  newInventoryItem(): void {
    this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: {} } });
}

}

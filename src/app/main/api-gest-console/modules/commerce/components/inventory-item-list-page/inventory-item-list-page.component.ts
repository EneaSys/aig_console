import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-inventory-item-list-page',
    templateUrl: './inventory-item-list-page.component.html',
    styleUrls: ['./inventory-item-list-page.component.scss']
})
export class AigInventoryItemListPageComponent extends GenericComponent {
    constructor(
        private inventoryItemResourceService : InventoryItemResourceService,
        private _formBuilder: FormBuilder,
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
			size: 2,
			page: 0
		}
	
		this.inventoryItemSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.inventoryItemDC = ["id","inventoryCategoryId","inventoryCategoryName","name","producerId","producerName","buttons",];
    }
    

    private initFiltersInventoryItem() {
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
            this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(this.inventoryItemFilters.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.inventoryItemFilters.name,null,null,null,null,null,null,this.inventoryItemFilters.page,null,null,null,null,null,null,null,null,null,this.inventoryItemFilters.size).toPromise();
        } catch (e) {
            this.inventoryItemError = e;
        }
    }

    showAllInventoryItem() {
		this.initFiltersInventoryItem();

    		this.searchInventoryItem(0);
	}


    clearFiltersTenantContext() {
		this.inventoryItemSearchFormGroup.reset();
		this.showAllInventoryItem();
	}
    
    inventoryItemPaginationEvent(pageEvent: PageEvent) {
        this.inventoryItemPagination.size = pageEvent.pageSize;

		this.searchInventoryItem(pageEvent.pageIndex);
		
	}

    
    inventoryItemSearchWithFilter() {
		this.inventoryItemFilters.id = this.inventoryItemSearchFormGroup.controls.id.value;
		this.inventoryItemFilters.name = this.inventoryItemSearchFormGroup.controls.name.value;

		this.searchInventoryItem(0);
	}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { InventoryCategoryResourceService, InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-inventory-item-list-page',
    templateUrl: './inventory-item-list-page.component.html',
    styleUrls: ['./inventory-item-list-page.component.scss']
})
export class AigInventoryItemListPageComponent extends GenericComponent {
    inventoryItemSearchFormGroup: FormGroup;
    constructor(
        private inventoryItemResourceService : InventoryItemResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemDTOs: InventoryItemDTO[];
    inventoryItemDC : string[] = ["id","inventoryCategoryId","inventoryCategoryName","name","producerId","producerName","buttons",];
    inventoryItemError : any;

    length : number;
    page : number;
    size: number = 10;
    id: number;
	name: string;
    

    loadPage() {
        this.reloadPage();  
        
        this.inventoryItemSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});   
    }

    reloadPage() {
        this.reloadInventoryItemTable();
    };

    inventoryItemPaginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadInventoryItemTable();
	}

    async  reloadInventoryItemTable() {
        try {
            this.length = await this.inventoryItemResourceService.countInventoryItemsUsingGET().toPromise();
            this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(this.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.name,null,null,null,null,null,null,this.page,null,null,null,null,null,null,null,null,null,this.size).toPromise();
        } catch (e) {
            this.inventoryItemError = e;
        }
    }

    inventoryItemSearch() {
		this.id = this.inventoryItemSearchFormGroup.controls.id.value;
		this.name = this.inventoryItemSearchFormGroup.controls.name.value;

		this.reloadInventoryItemTable();
	}

}

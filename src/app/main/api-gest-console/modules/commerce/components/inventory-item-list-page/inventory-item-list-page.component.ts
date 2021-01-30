import { Component, OnInit } from '@angular/core';
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
    constructor(
        private inventoryItemResourceService : InventoryItemResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemDTOs: InventoryItemDTO[];
    inventoryItemDC : string[] = ["id","name","buttons"];
    inventoryItemError : any;

    length : number;
    page : number;
    size: number = 10;
    

    loadPage() {
        this.reloadPage();     
    }

    paginationEvent (pageEvent:PageEvent) {
        this.page = pageEvent.pageIndex;
        this.size = pageEvent.pageSize
    }

    async reloadPage() {
        try {
            this.length = await this.inventoryItemResourceService.countInventoryItemsUsingGET().toPromise();
            this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,null,null,null,null,null,null,null,null,null,this.size).toPromise();
        } catch (e) {
            this.inventoryItemError = e;
        }
    }

}

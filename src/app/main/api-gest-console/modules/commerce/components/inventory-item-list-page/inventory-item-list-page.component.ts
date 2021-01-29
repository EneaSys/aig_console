import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
    

    async loadPage() {
        this.inventoryItemDTOs = await this.inventoryItemResourceService.getAllInventoryItemsUsingGET().toPromise();
    }

    reloadPage() {}
}

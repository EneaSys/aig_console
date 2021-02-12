import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemDialogComponent } from '../inventory-item-dialog/inventory-item-dialog.component';

@Component({
	selector: 'aig-inventory-item-detail-page',
	templateUrl: './inventory-item-detail-page.component.html',
	styleUrls: ['./inventory-item-detail-page.component.scss']
})
export class AigInventoryItemDetailPageComponent extends GenericComponent {
    constructor(
        private inventoryItemResourceService: InventoryItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	inventoryItemDTO: InventoryItemDTO;

    loadPage() {
		this.inventoryItemDTO = this.route.snapshot.data.inventoryItem;
	}

	async reloadPage() {
		this.inventoryItemDTO = await this.inventoryItemResourceService.getInventoryItemUsingGET(this.inventoryItemDTO.id).toPromise();
	}
	
    editInventoryItem(InventoryItemDTO: InventoryItemDTO) {
        this.dialog.open(AigInventoryItemDialogComponent , { data: { inventoryItem: InventoryItemDTO } });
    }
}
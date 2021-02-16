import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService, InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from '../inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';
import { AigInventoryItemDialogComponent } from '../inventory-item-dialog/inventory-item-dialog.component';

@Component({
    selector: 'aig-inventory-item-detail-page',
    templateUrl: './inventory-item-detail-page.component.html',
    styleUrls: ['./inventory-item-detail-page.component.scss']
})
export class AigInventoryItemDetailPageComponent extends GenericComponent {
    constructor(
        private inventoryItemResourceService: InventoryItemResourceService,
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemDTO: InventoryItemDTO;

    inventoryItemCombinationDTOs: InventoryItemCombinationDTO[];
    inventoryItemCombinationDC: string[];
    inventoryItemCombinationError: any;

    loadPage() {
        this.inventoryItemDTO = this.route.snapshot.data.inventoryItem;
        this.inventoryItemCombinationDC = ["id", "name", "combinationCode", "inventoryItemId", "inventoryItemName"];
        this.loadInventoryItemCombination();
    }

    private async loadInventoryItemCombination() {
        let filter = {
            combinationCodeContains: null
            };
        this.inventoryItemCombinationDTOs = await this.inventoryItemCombinationResourceService.getAllInventoryItemCombinationsUsingGET(filter).toPromise();
    }

    async reloadPage() {
        this.inventoryItemDTO = await this.inventoryItemResourceService.getInventoryItemUsingGET(this.inventoryItemDTO.id).toPromise();
        this.loadInventoryItemCombination()
    }

    editInventoryItem(InventoryItemDTO: InventoryItemDTO) {
        this.dialog.open(AigInventoryItemDialogComponent, { data: { inventoryItem: InventoryItemDTO } });
    }

    newInventoryItemCombination(): void {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: {} } });
    }
}
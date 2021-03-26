import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from '../inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';

@Component({
    selector: 'aig-inventory-item-combination-detail-page',
    templateUrl: './inventory-item-combination-detail-page.component.html',
    styleUrls: ['./inventory-item-combination-detail-page.component.scss']
})
export class AigInventoryItemCombinationDetailPageComponent extends GenericComponent {
    constructor(
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemCombinationDTO: InventoryItemCombinationDTO;

    loadPage() {
        this.inventoryItemCombinationDTO = this.route.snapshot.data.inventoryItemCombination;
        console.log(this.inventoryItemCombinationDTO);
    }

    async reloadPage() {
		this.inventoryItemCombinationDTO = await this.inventoryItemCombinationResourceService.getInventoryItemCombinationUsingGET(this.inventoryItemCombinationDTO.id).toPromise();
	}

    editInventoryItemCombination(inventoryItemCombinationDTO: InventoryItemCombinationDTO) {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: inventoryItemCombinationDTO } });
    }
}

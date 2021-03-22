import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryCategoryNewUpdateModalComponent } from '../inventory-category-new-update-modal/inventory-category-new-update-modal.component';

@Component({
    selector: 'aig-inventory-category-detail-page',
    templateUrl: './inventory-category-detail-page.component.html',
    styleUrls: ['./inventory-category-detail-page.component.scss']
})
export class AigInventoryCategoryDetailPageComponent extends GenericComponent {
    constructor(
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryCategoryDTO: InventoryCategoryDTO;

    loadPage() {
        this.inventoryCategoryDTO = this.route.snapshot.data.inventoryCategory;
    }

    async reloadPage() {
		this.inventoryCategoryDTO = await this.inventoryCategoryResourceService.getInventoryCategoryUsingGET(this.inventoryCategoryDTO.id).toPromise();
	}

    editInventoryCategory(inventoryCategoryDTO: InventoryCategoryDTO) {
        this.dialog.open(AigInventoryCategoryNewUpdateModalComponent, { data: { inventoryCategory: inventoryCategoryDTO } });
    }
}
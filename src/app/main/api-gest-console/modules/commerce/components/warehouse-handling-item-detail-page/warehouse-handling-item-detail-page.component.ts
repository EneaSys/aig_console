import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { WarehouseDTO, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService, WarehouseResourceService } from "aig-commerce";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigWarehouseHandlingItemNewUpdateModalComponent } from "../warehouse-handling-item-new-update-modal/warehouse-handling-item-new-update-modal.component";
import { AigWarehouseNewUpdateModalComponent } from "../warehouse-new-update-modal/warehouse-new-update-modal.component";

@Component({
	selector: 'aig-warehouse-handling-item-detail-page',
	templateUrl: './warehouse-handling-item-detail-page.component.html',
	styleUrls: ['./warehouse-handling-item-detail-page.component.scss']
})
export class AigWarehouseHandlingItemDetailPageComponent extends GenericComponent {
    constructor(
        private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	warehouseHandlingItemDTO: WarehouseHandlingItemDTO;

    loadPage() {
		this.warehouseHandlingItemDTO = this.route.snapshot.data.warehouseHandlingItem;
	}

	async reloadPage() {
		this.warehouseHandlingItemDTO = await this.warehouseHandlingItemResourceService.getWarehouseHandlingItemUsingGET(this.warehouseHandlingItemDTO.id).toPromise();
	}
	
    editWarehouseHandlingItem(warehouseHandlingItemDTO: WarehouseHandlingItemDTO) {
		this.dialog.open(AigWarehouseHandlingItemNewUpdateModalComponent, { data: { warehouseHandlingItem: warehouseHandlingItemDTO } });
    }
}
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { WarehouseDTO, WarehouseResourceService } from "aig-commerce";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigWarehouseNewUpdateModalComponent } from "../warehouse-new-update-modal/warehouse-new-update-modal.component";

@Component({
	selector: 'aig-warehouse-detail-page',
	templateUrl: './warehouse-detail-page.component.html',
	styleUrls: ['./warehouse-detail-page.component.scss']
})
export class AigWarehouseDetailPageComponent extends GenericComponent {
    constructor(
        private warehouseResourceService: WarehouseResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	warehouseDTO: WarehouseDTO;

    loadPage() {
		this.warehouseDTO = this.route.snapshot.data.warehouse;
	}

	async reloadPage() {
		this.warehouseDTO = await this.warehouseResourceService.getWarehouseUsingGET(this.warehouseDTO.id).toPromise();
	}
	
    editWarehouse(warehouseDTO: WarehouseDTO) {
		this.dialog.open(AigWarehouseNewUpdateModalComponent, { data: { warehouse: warehouseDTO } });
    }
}
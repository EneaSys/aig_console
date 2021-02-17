import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigWarehouseHandlingNewUpdateModalComponent } from '../../warehouse-handling-new-update-modal/warehouse-handling-new-update-modal.component';


@Component({
	selector: 'aig-warehouse-handling-detail-page',
	templateUrl: './warehouse-handling-detail-page.component.html',
	styleUrls: ['./warehouse-handling-detail-page.component.scss']
})
export class AigWarehouseHandlingDetailPageComponent extends GenericComponent {
    constructor(
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    warehouseHandlingDTO: WarehouseHandlingDTO;

    loadPage() {
		this.warehouseHandlingDTO = this.route.snapshot.data.warehouseHandling;
	}

	async reloadPage() {
		this.warehouseHandlingDTO = await this.warehouseHandlingResourceService.getWarehouseHandlingUsingGET(this.warehouseHandlingDTO.id).toPromise();
	}
	
    editProducer(warehouseHandlingDTO: WarehouseHandlingDTO) {
		this.dialog.open(AigWarehouseHandlingNewUpdateModalComponent, { data: { warehouseHandling: warehouseHandlingDTO } });
    }
}
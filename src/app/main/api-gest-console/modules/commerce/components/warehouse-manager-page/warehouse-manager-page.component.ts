import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { WarehouseResourceService, WarehouseDTO, WarehouseHandlingDTO, WarehouseHandlingResourceService, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    templateUrl: './warehouse-manager-page.component.html',
    styleUrls: ['./warehouse-manager-page.component.scss']
})
export class AigWarehouseManagerPageComponent extends GenericComponent {
    constructor(
        private warehouseResourceService: WarehouseResourceService,
        private eventService :EventService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    warehouseDTOs: WarehouseDTO[] = [];
    selectedWarehouse: WarehouseDTO;

    loadingPage: boolean = true;
    errorInLoading: any;

    warehouseFilters = {
        warehouseIdEquals: null,
        warehouseNameContains: null,
        page: 0,
    }

    async loadPage() {
        try {
            this.warehouseDTOs = await this.warehouseResourceService.getAllWarehousesUsingGET(this.warehouseFilters).toPromise();
            if (this.warehouseDTOs.length > 0) {
                this.setWarehouse(this.warehouseDTOs[0]);
            } else {
                throw new Error("Nessun magazzino associato");
            }
        } catch (e) {
            this.errorInLoading = e;
        }
        this.loadingPage = false;
    }


    setWarehouse(selectedWarehouse: WarehouseDTO) {
        this.selectedWarehouse = selectedWarehouse;
        setTimeout(()=>{ this.eventService.reloadCurrentPage(); }, 1);
    }
}
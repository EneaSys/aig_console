import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { WarehouseHandlingDTO, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService, WarehouseHandlingResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigWarehouseHandlingItemNewUpdateModalComponent } from '../../warehouse-handling-item-new-update-modal/warehouse-handling-item-new-update-modal.component';
import { AigWarehouseHandlingNewUpdateModalComponent } from '../../warehouse-handling-new-update-modal/warehouse-handling-new-update-modal.component';


@Component({
  selector: 'aig-warehouse-handling-detail-page',
  templateUrl: './warehouse-handling-detail-page.component.html',
  styleUrls: ['./warehouse-handling-detail-page.component.scss']
})
export class AigWarehouseHandlingDetailPageComponent extends GenericComponent {
  constructor(
    private warehouseHandlingResourceService: WarehouseHandlingResourceService,
    private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  warehouseHandlingDTO: WarehouseHandlingDTO;
  

  loadPage() {
    
    this.warehouseHandlingDTO = this.route.snapshot.data.warehouseHandling;
    this.loadWarehouseHandlingItem();
  }

  async reloadPage() {
    this.warehouseHandlingDTO = await this.warehouseHandlingResourceService.getWarehouseHandlingUsingGET(this.warehouseHandlingDTO.id).toPromise();
    this.loadWarehouseHandlingItem();
  }

  warehouseHandlingItemDC: string[] = ["inventoryItemProducer", "inventoryItemCombination", "quantity"];
  warehouseHandlingItemDTOs: WarehouseHandlingItemDTO[];
  warehouseHandlingItemError: any;
  warehouseHandlingItemFilters: {}

  async loadWarehouseHandlingItem(){
    this.warehouseHandlingItemFilters = {
      idEquals: null,
      nameContains: null,
      page: 0,
    };
    this.warehouseHandlingItemDTOs = await this.warehouseHandlingItemResourceService.getAllWarehouseHandlingItemsUsingGET(this.warehouseHandlingItemFilters).toPromise();
  }


  editWarehouseHandling(warehouseHandlingDTO: WarehouseHandlingDTO) {
    this.dialog.open(AigWarehouseHandlingNewUpdateModalComponent, { data: { warehouseHandling: warehouseHandlingDTO } });
  }

  addInventoryItemCombination(warehouseHandlingDTO: WarehouseHandlingDTO){
    this.dialog.open(AigWarehouseHandlingItemNewUpdateModalComponent, { data: { warehouseHandlingItem: {warehouseHandling: warehouseHandlingDTO} } });
  }
}
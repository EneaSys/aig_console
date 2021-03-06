import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WarehouseHandlingDTO, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService, WarehouseHandlingResourceService } from 'aig-commerce';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCommerceGenericComponent } from '../../commerce-generic-component';
import { AigWarehouseHandlingItemNewUpdateModalComponent } from '../../warehouse-handling-item-new-update-modal/warehouse-handling-item-new-update-modal.component';
import { AigWarehouseHandlingNewUpdateModalComponent } from '../../warehouse-handling-new-update-modal/warehouse-handling-new-update-modal.component';


@Component({
  selector: 'aig-warehouse-handling-detail-page',
  templateUrl: './warehouse-handling-detail-page.component.html',
  styleUrls: ['./warehouse-handling-detail-page.component.scss']
})
export class AigWarehouseHandlingDetailPageComponent extends AigCommerceGenericComponent {
  constructor(
    private warehouseHandlingResourceService: WarehouseHandlingResourceService,
    private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _fuseProgressBarService: FuseProgressBarService,
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

  async deleteWarehouseHandling(id: number) {
    this._fuseProgressBarService.show();

    try {
        await this.warehouseHandlingResourceService.deleteWarehouseHandlingUsingDELETE(id).toPromise();

        this._snackBar.open(`Warehouse handling: '${id}' deleted.`, null, { duration: 2000, });
        
        this.router.navigate(['/commerce', 'warehouse-handling']);
    } catch (e) {
        this._snackBar.open(`Error during deleting warehouse handling: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }

  warehouseHandlingItemDC: string[] = ["inventoryItemProducer", "inventoryItemCombination", "quantity", "buttons"];
  warehouseHandlingItemDTOs: WarehouseHandlingItemDTO[];
  warehouseHandlingItemError: any;
  warehouseHandlingItemFilters: {}

  async loadWarehouseHandlingItem(){
    this.warehouseHandlingItemFilters = {
      warehouseHandlingItemIDEquals: null,
      warehouseHandlingItemNameContains: null,
      warehouseHandlingIDEquals: this.warehouseHandlingDTO.id,
      page: 0,
    };
    this.warehouseHandlingItemDTOs = await this.warehouseHandlingItemResourceService.getAllWarehouseHandlingItemsUsingGET(this.warehouseHandlingItemFilters).toPromise();
  }


  editWarehouseHandling(warehouseHandlingDTO: WarehouseHandlingDTO) {
    this.dialog.open(AigWarehouseHandlingNewUpdateModalComponent, { data: { warehouseHandling: warehouseHandlingDTO } });
  }

  addWarehouseHandling(warehouseHandlingDTO: WarehouseHandlingDTO){
    this.dialog.open(AigWarehouseHandlingItemNewUpdateModalComponent, { data: { warehouseHandling: warehouseHandlingDTO } });
  }
}
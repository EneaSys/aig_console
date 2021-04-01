import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { WarehouseDTO, WarehouseHandlingDTO, WarehouseHandlingResourceService, WarehouseResourceService } from "aig-commerce";
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
    private warehouseHandlingResourceService: WarehouseHandlingResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  warehouseDTO: WarehouseDTO;

  warehouseConfig = {
    details: true,
    removeWarehouse: null,
  }

  loadPage() {
    this.warehouseDTO = this.route.snapshot.data.warehouse;
    this.warehouseConfig.removeWarehouse = this.warehouseDTO;
    this.loadOther();
  }

  async reloadPage() {
    this.warehouseDTO = await this.warehouseResourceService.getWarehouseUsingGET(this.warehouseDTO.id).toPromise();
    this.loadOther();
  }

  async loadOther() {
    this.loadWarehouseHandling();
  }

  editWarehouse(warehouseDTO: WarehouseDTO) {
    this.dialog.open(AigWarehouseNewUpdateModalComponent, { data: { warehouse: warehouseDTO } });
  }

  async deleteWarehouse(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.warehouseResourceService.deleteWarehouseUsingDELETE(id).toPromise();

      this._snackBar.open(`Warehouse: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/commerce', 'warehouse']);
    } catch (e) {
      this._snackBar.open(`Error during deleting warehouse: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }

  warehouseHandlingDC: string[] = ["id", "date", "warehouseHandlingType", "warehouse"];
  warehouseHandlingDTOs: WarehouseHandlingDTO[];
  warehouseHandlingError: any;
  async loadWarehouseHandling() {
    let warehouseToLoadFilters = {
      warehouseToLoadIdEquals: this.warehouseDTO.id || null, 
    };
    let warehouseToUnloadFilters = {
      warehouseToLoadIdEquals: this.warehouseDTO.id || null,
    };
    try {
      this.warehouseHandlingDTOs = await this.warehouseHandlingResourceService.getAllWarehouseHandlingsUsingGET(warehouseToLoadFilters && warehouseToUnloadFilters).toPromise();
    } catch (e) {
      this.warehouseHandlingError = e;
    }
  }
}
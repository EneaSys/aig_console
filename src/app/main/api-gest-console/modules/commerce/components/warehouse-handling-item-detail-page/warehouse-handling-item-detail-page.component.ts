import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
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
		private _snackBar: MatSnackBar,
    	private router: Router,
    	private _fuseProgressBarService: FuseProgressBarService,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	warehouseHandlingItemDTO: WarehouseHandlingItemDTO;

    loadPage() {
		this.warehouseHandlingItemDTO = this.route.snapshot.data.warehouseHandlingItem;
	}

	async reloadPage() {
		this.warehouseHandlingItemDTO = await this.warehouseHandlingItemResourceService.getWarehouseHandlingItemUsingGET(this.warehouseHandlingItemDTO.id).toPromise();
	}
	
	async deleteWarehouseHandlingItem(id: number) {
		this._fuseProgressBarService.show();
	
		try {
			await this.warehouseHandlingItemResourceService.deleteWarehouseHandlingItemUsingDELETE(id).toPromise();
	
			this._snackBar.open(`Warehouse handling item: '${id}' deleted.`, null, { duration: 2000, });
			
			this.router.navigate(['/commerce', 'warehouse-handling-item']);
		} catch (e) {
			this._snackBar.open(`Error during deleting warehouse handling item: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	  }

    editWarehouseHandlingItem(warehouseHandlingItemDTO: WarehouseHandlingItemDTO) {
		this.dialog.open(AigWarehouseHandlingItemNewUpdateModalComponent, { data: { warehouseHandlingItem: warehouseHandlingItemDTO } });
    }
}
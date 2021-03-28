import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigInventoryCategoryNewUpdateModalComponent } from 'app/main/api-gest-console/modules/commerce/components/inventory-category-new-update-modal/inventory-category-new-update-modal.component';

@Component({
    selector: 'inventory-category-list-table',
    templateUrl: './inventory-category-list-table.component.html',
    styleUrls: ['./inventory-category-list-table.component.scss']
})
export class AigInventoryCategoryListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteWarehouseHandling(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.inventoryCategoryResourceService.deleteInventoryCategoryUsingDELETE(id).toPromise();
            this._snackBar.open(`Inventory category: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory category: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editInventoryCategory(inventoryCategoryDTO: InventoryCategoryDTO) {
        this.dialog.open(AigInventoryCategoryNewUpdateModalComponent, { data: {inventoryCategory: inventoryCategoryDTO } });
    }
}

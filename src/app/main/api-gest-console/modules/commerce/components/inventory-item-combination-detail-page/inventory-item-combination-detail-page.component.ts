import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogItemDTO, CatalogItemResourceService, InventoryItemCombinationDTO, InventoryItemCombinationResourceService, PurchaseItemDTO, PurchaseItemResourceService, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from '../inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';

@Component({
    selector: 'aig-inventory-item-combination-detail-page',
    templateUrl: './inventory-item-combination-detail-page.component.html',
    styleUrls: ['./inventory-item-combination-detail-page.component.scss']
})
export class AigInventoryItemCombinationDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
        private catalogItemResourceService: CatalogItemResourceService,
        private purchaseItemResourceService: PurchaseItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    inventoryItemCombinationDTO: InventoryItemCombinationDTO;

    loadPage() {
        this.inventoryItemCombinationDTO = this.route.snapshot.data.inventoryItemCombination;
        this.loadOther();
    }

    async reloadPage() {
		this.inventoryItemCombinationDTO = await this.inventoryItemCombinationResourceService.getInventoryItemCombinationUsingGET(this.inventoryItemCombinationDTO.id).toPromise();
        this.loadOther();
	}

    async loadOther() {
        this.warehouseHandlingItem();
        this.loadCatalogItem();
        this.loadPurchaseItem();
    }

    editInventoryItemCombination(inventoryItemCombinationDTO: InventoryItemCombinationDTO) {
        this.dialog.open(AigInventoryItemCombinationNewUpdateDialogComponent, { data: { inventoryItemCombination: inventoryItemCombinationDTO } });
    }

    async deleteInventoryItemCombination(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.inventoryItemCombinationResourceService.deleteInventoryItemCombinationUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Inventory item combination: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/commerce', 'inventory-item', 'detail', this.inventoryItemCombinationDTO.inventoryItemId ]);
        } catch (e) {
            this._snackBar.open(`Error during deleting inventory item combination: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    warehouseHandlingItemDC: string[] = ["id","warehouseDate","warehouseHandlingType","warehouse","inventoryItemProducer","quantity", "buttons"];
    warehouseHandlingItemDTOs: WarehouseHandlingItemDTO[];
    warehouseHandlingItemError: any;
    async warehouseHandlingItem() {
        let filters = {
            inventoryItemCombinationIDEquals: this.inventoryItemCombinationDTO.id
        };
        try {
            this.warehouseHandlingItemDTOs = await this.warehouseHandlingItemResourceService.getAllWarehouseHandlingItemsUsingGET(filters).toPromise();
        } catch (e) {
            this.warehouseHandlingItemError = e;
        }
    }

    catalogItemDC: string[] = ["id", "active", "catalog", "inventoryItemProducer", "buttons"];
    catalogItemDTOs: CatalogItemDTO[];
    catalogItemError: any;
    async loadCatalogItem() {
        let filters = {
            inventoryItemCombinationIDEquals: this.inventoryItemCombinationDTO.id
        };
        try {
            this.catalogItemDTOs = await this.catalogItemResourceService.getAllCatalogItemsUsingGET(filters).toPromise();
        } catch (e) {
            this.catalogItemError = e;
        }
    }

    purchaseItemDC: string[] = ["id","price","purchase","quantity","tax","warehouseHandlingItem","buttons"];
    purchaseItemDTOs: PurchaseItemDTO[];
    purchaseItemError: any;
    async loadPurchaseItem() {
        let filters = {
            inventoryItemCombinationIDEquals: this.inventoryItemCombinationDTO.id
        };
        try {
            this.purchaseItemDTOs = await this.purchaseItemResourceService.getAllPurchaseItemsUsingGET(filters).toPromise();
        } catch (e) {
            this.purchaseItemError = e;
        }
    }
}
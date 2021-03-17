import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PurchaseDTO, PurchaseResourceService, FiscalTransactionResourceService, FiscalTransactionDTO, PaymentResourceService, PaymentDTO, ValuePaperPaymentItemResourceService, ValuePaperPaymentResourceService, ValuePaperPaymentItemDTO, PurchaseItemDTO, InventoryItemDTO, PurchaseItemResourceService, PriceListItemResourceService } from 'aig-commerce';
import { AigPurchaseNewUpdateDialogComponent } from '../purchase-new-update-dialog/purchase-new-update-dialog.component';
import { AigPurchaseItemNewUpdateDialogComponent } from '../purchase-item-new-update-dialog/purchase-item-new-update-dialog.component';


@Component({
    selector: 'aig-purchase-item-detail-page',
    templateUrl: './purchase-item-detail-page.component.html',
    styleUrls: ['./purchase-item-detail-page.component.scss']
})
export class AigPurchaseItemDetailPageComponent extends GenericComponent {
    constructor(
        private purchaseResourceService: PurchaseResourceService,
        private purchaseItemResourceService: PurchaseItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    purchaseItemDTO: PurchaseItemDTO;

    purchaseDTO: PurchaseDTO;

    inventoryItemDTO: InventoryItemDTO 
        
   

}

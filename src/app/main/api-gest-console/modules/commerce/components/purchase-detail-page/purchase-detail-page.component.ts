import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PurchaseDTO, PurchaseResourceService, FiscalTransactionResourceService, FiscalTransactionDTO, PaymentResourceService, PaymentDTO, ValuePaperPaymentItemResourceService, ValuePaperPaymentResourceService, ValuePaperPaymentItemDTO, PurchaseItemDTO, PurchaseItemResourceService } from 'aig-commerce';
import { AigPurchaseNewUpdateDialogComponent } from '../purchase-new-update-dialog/purchase-new-update-dialog.component';
import { AigPurchaseItemNewUpdateDialogComponent } from '../purchase-item-new-update-dialog/purchase-item-new-update-dialog.component';


@Component({
    selector: 'aig-purchase-detail-page',
    templateUrl: './purchase-detail-page.component.html',
    styleUrls: ['./purchase-detail-page.component.scss']
})
export class AigPurchaseDetailPageComponent extends GenericComponent {
    constructor(
        private purchaseResourceService: PurchaseResourceService,
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private paymentResourceService: PaymentResourceService,
        private purchaseItemResourceService: PurchaseItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    purchaseDTO: PurchaseDTO;

    loadPage() {
        this.purchaseDTO = this.route.snapshot.data.purchase;
        this.loadOther();
    }

    async reloadPage() {
        this.purchaseDTO = await this.purchaseResourceService.getPurchaseUsingGET(this.purchaseDTO.id).toPromise();
        this.loadOther();
    }

    async loadOther() {
        this.loadFiscalTransactions();
        this.loadPayments();
        this.loadPurchaseItem();
    }

    addPurchaseItem(purchaseItemDTO: PurchaseItemDTO){
        this.dialog.open(AigPurchaseItemNewUpdateDialogComponent, { data: { purchaseItem: purchaseItemDTO } });
      }

    editPurchase(purchaseDTO: PurchaseDTO) {
		this.dialog.open(AigPurchaseNewUpdateDialogComponent, { data: { purchase: purchaseDTO } });
    }

    

    fiscalTransactiondisplayColumns: string[] = ['date', 'code', 'amount', 'status', 'buttons'];
    fiscalTransactionDTOs: FiscalTransactionDTO[];
    fiscalTransactionError: any;
    async loadFiscalTransactions() {
        let filters = {
            purchaseIDEquals : this.purchaseDTO.id
        }; 
        try {
            this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(filters).toPromise();
        } catch(e) {
            this.fiscalTransactionError = e;
        }
    }

    paymentDTOs: PaymentDTO[];
    paymentDC: string[] = ["id","amount"];
    paymentError: any;

    async loadPayments() {
        let filters = {
            purchaseIDEquals: this.purchaseDTO.id,
        };
        try {
            this.paymentDTOs = await this.paymentResourceService.getAllPaymentsUsingGET(filters).toPromise();
        } catch(e) {
            this.paymentError = e;
        }

    }

    purchaseItemDTOs: PurchaseItemDTO[];
    purchaseItemDC: string[] = ["id", "inventoryItemCombination", "price", "quantity", "tax", "warehouseHandlingItem", "buttons"];
    purchaseItemError: any;

    async loadPurchaseItem() {
        let filters = {
            purchaseIDEquals: this.purchaseDTO.id,
        };
        try {
            this.purchaseItemDTOs = await this.purchaseItemResourceService.getAllPurchaseItemsUsingGET(filters).toPromise();
        } catch(e) {
            this.purchaseItemError = e;
        }
    }
}

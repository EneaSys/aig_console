import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PurchaseDTO, PurchaseResourceService, FiscalTransactionResourceService, FiscalTransactionDTO, PaymentResourceService, PaymentDTO, ValuePaperPaymentItemResourceService, ValuePaperPaymentResourceService, ValuePaperPaymentItemDTO } from 'aig-commerce';
import { AigPurchaseNewUpdateDialogComponent } from '../purchase-new-update-dialog/purchase-new-update-dialog.component';

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
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    purchaseDTO: PurchaseDTO;
        
    fiscalTransactiondisplayColumns: string[] = ['date', 'code', 'amount', 'status', 'buttons'];
    fiscalTransactionDTOs: FiscalTransactionDTO[];
    fiscalTransactionError: any;

    paymentDTOs: PaymentDTO[];
    paymentDC: string[] = ["id","amount"];
    paymentError: any;

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
    }

    async loadFiscalTransactions() {
        let filters = {
            idEquals : this.purchaseDTO.id
        }; 
        try {
            this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(filters).toPromise();
        } catch(e) {
            this.fiscalTransactionError = e;
        }
    }

    async loadPayments() {
        let filters = {
            purchaseIdEquals: this.purchaseDTO.id,
        };
        try {
            this.paymentDTOs = await this.paymentResourceService.getAllPaymentsUsingGET(filters).toPromise();
        } catch(e) {
            this.paymentError = e;
        }

    }

    editPurchase(purchaseDTO: PurchaseDTO) {
		this.dialog.open(AigPurchaseNewUpdateDialogComponent, { data: { purchase: purchaseDTO } });
    }


    afterLoad() {

    }
}

import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PurchaseDTO, PurchaseResourceService, FiscalTransactionResourceService, FiscalTransactionDTO, PaymentResourceService, PaymentDTO, ValuePaperPaymentItemResourceService, ValuePaperPaymentResourceService } from 'aig-commerce';

@Component({
    templateUrl: './purchase-detail-page.component.html',
    styleUrls: ['./purchase-detail-page.component.scss']
})
export class AigPurchaseDetailPageComponent extends GenericComponent {
    constructor(
        private purchaseResourceService: PurchaseResourceService,
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private paymentResourceService: PaymentResourceService,
        private valuePaperPaymentResourceService: ValuePaperPaymentResourceService,
        private valuePaperPaymentItemResourceService: ValuePaperPaymentItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    purchase: PurchaseDTO;
    fiscalTransactions: FiscalTransactionDTO[];
    payments: PaymentDTO[];
    a: any;
    b: any;

    loadPage() {
        this.purchase = this.route.snapshot.data.purchase;
        this.loadOther();
    }

    async reloadPage() {
        this.purchase = await this.purchaseResourceService.getPurchaseUsingGET(this.purchase.id).toPromise();
        this.loadOther();
    }

    async loadOther() {
        this.loadFiscalTransactions();
        this.loadPayments();
    }

    async loadFiscalTransactions() {
        this.fiscalTransactions = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.purchase.id,null,null,null,null,null,null,null).toPromise();
    }

    async loadPayments() {
        this.payments = await this.paymentResourceService.getAllPaymentsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.purchase.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
        this.a = await this.valuePaperPaymentResourceService.getValuePaperPaymentUsingGET(1).toPromise();
        this.b = await this.valuePaperPaymentItemResourceService.getValuePaperPaymentItemUsingGET(1).toPromise();
    }


    afterLoad() {

    }
}

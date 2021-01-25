import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PurchaseDTO, PurchaseResourceService, FiscalTransactionResourceService, FiscalTransactionDTO, PaymentResourceService, PaymentDTO, ValuePaperPaymentItemResourceService, ValuePaperPaymentResourceService, ValuePaperPaymentItemDTO } from 'aig-commerce';

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
    
    fiscalTransactionDisplayedColumns: string[] = ['date', 'code', 'amount', 'status', 'buttons'];
    fiscalTransactionDTOs: FiscalTransactionDTO[];
    fiscalTransactionError: any;

    valuePaperPaymentItemDTOs: ValuePaperPaymentItemDTO[];

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
        try {
            this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.purchase.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
        } catch(e) {
            this.fiscalTransactionError = e;
        }
    }

    async loadPayments() {
        let paymentDTOs: PaymentDTO[] = await this.paymentResourceService.getAllPaymentsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.purchase.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
        let valuePaperPaymentIds: number[] = [];
        paymentDTOs.forEach((paymentDTO: PaymentDTO) => {
            valuePaperPaymentIds.push(paymentDTO.valuePaperPaymentId);
        });
        this.valuePaperPaymentItemDTOs = await this.valuePaperPaymentItemResourceService.getAllValuePaperPaymentItemsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,valuePaperPaymentIds).toPromise();
    }


    afterLoad() {

    }
}

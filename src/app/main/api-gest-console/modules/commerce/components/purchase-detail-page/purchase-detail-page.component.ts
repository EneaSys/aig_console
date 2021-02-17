import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PurchaseDTO, PurchaseResourceService, FiscalTransactionResourceService, FiscalTransactionDTO, PaymentResourceService, PaymentDTO, ValuePaperPaymentItemResourceService, ValuePaperPaymentResourceService, ValuePaperPaymentItemDTO } from 'aig-commerce';

@Component({
    selector: 'aig-purchase-detail-page',
    templateUrl: './purchase-detail-page.component.html',
    styleUrls: ['./purchase-detail-page.component.scss']
})
export class AigPurchaseDetailPageComponent extends GenericComponent {
    valuePaperPayment: any;
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
    
    fiscalTransactiondisplayColumns: string[] = ['date', 'code', 'amount', 'status', 'buttons'];
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
        let filters = {
            idEquals : this.purchase.id
        } 
        try {
            this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(filters).toPromise();
        } catch(e) {
            this.fiscalTransactionError = e;
        }
    }

    async loadPayments() {
        let filters = {
            id : this.purchase.id,
            valuePaperPaymentIdEquals :this.valuePaperPayment.id
        }; 
		let paymentDTOs: PaymentDTO[] = await this.paymentResourceService.getAllPaymentsUsingGET(filters).toPromise();
        let valuePaperPaymentIds: number[] = [];
        paymentDTOs.forEach((paymentDTO: PaymentDTO) => {
            valuePaperPaymentIds.push(paymentDTO.valuePaperPaymentId);
        });
        this.valuePaperPaymentItemDTOs = await this.valuePaperPaymentItemResourceService.getAllValuePaperPaymentItemsUsingGET(filters).toPromise();
    }


    afterLoad() {

    }
}

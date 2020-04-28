import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigNewCustomBuyDialogComponent } from '../new-custom-buy-dialog/new-custom-buy-dialog.component';
import { PurchaseResourceService, SellerResourceService, PurchaseDTO, SellerDTO, FiscalTransactionDTO, FiscalTransactionResourceService } from 'aig-commerce';
import { PageEvent } from '@angular/material/paginator';

@Component({
    templateUrl: './seller-manager-page.component.html',
    styleUrls: ['./seller-manager-page.component.scss']
})
export class AigSellerManagerPageComponent extends GenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
        private purchaseResourceService: PurchaseResourceService,
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    sellerDTOs: SellerDTO[] = [];
    selectedSeller: SellerDTO;

    message: string = "Caricando informazioni venditore";


    async loadPage() {
        try {
            this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,50,null).toPromise();
            if(this.sellerDTOs.length > 0) {
                this.setSeller(this.sellerDTOs[0]);
            } else {
                throw new Error;
            }
        } catch(e) {
            this.message = "Non hai negozi associati.";
        }
    }
    
    private setSeller(selectedSeller: SellerDTO) {
        this.selectedSeller = selectedSeller;

        this.purchaseIndex = 0;
        this.setFilterPurchase('seller', this.selectedSeller.id);

        this.fiscalTransactionIndex = 0;
        this.setFilterFiscalTransaction('seller', this.selectedSeller.id);
        
        this.loadStatistics();
    }

    reloadPage() {
        this.loadStatistics();
        this.loadPurchases(this.purchaseIndex);
        this.loadFiscalTransaction(this.fiscalTransactionIndex);
    }





    statistics = {
        fiscalTransactionPending: 0
    }

    async loadStatistics() {
        this.statistics.fiscalTransactionPending = await this.fiscalTransactionResourceService.countFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
    }









    // PURCHASE
    purchaseDisplayedColumns: string[] = ['id', 'date', 'customer', 'status'];
    purchaseDTOs: PurchaseDTO[];
    purchaseError: any;

    purchasePageable = {
        page: 0,
        size: 30,
    }
    purchaseLength: number;
    purchaseIndex: number;

    purchaseFilter = {
        seller: null,
    }

    private async setFilterPurchase(filterKey: string, value: any) {
        this.purchaseFilter[filterKey] = value;
        // Block for current seller
        this.purchaseFilter.seller = this.selectedSeller.id;

        this.loadPurchases(0);
        try {
            this.purchaseLength = await this.purchaseResourceService.countPurchasesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.purchaseFilter.seller, null, null, null, null, null, null, null, null, null, null, null, null, null).toPromise();
        } catch(e) { }
    }

    purchasePaginatorEvent(event: PageEvent) {
        this.purchasePageable.size = event.pageSize;
        this.loadPurchases(event.pageIndex);
    }

    private async loadPurchases(page) {
        this.purchaseDTOs = null;

        this.purchaseIndex = page
        this.purchasePageable.page = page;
        try {
            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.purchasePageable.page, null, null, null, null, null, null, null, null, this.purchaseFilter.seller, null, null, null, null, null, null,  null, this.purchasePageable.size, null, null, null, null, null, null).toPromise();
        } catch(e) {
            this.purchaseError = e;
        }
    }
    
    newBuy() {
        this.dialog.open(AigNewCustomBuyDialogComponent, { data: { seller: this.selectedSeller } });
    }









    // FISCAL TRANSACTION
    fiscalTransactionDisplayedColumns: string[] = ['date', 'code', 'amount', 'buyer', 'status', 'buttons'];
    fiscalTransactionDTOs: FiscalTransactionDTO[];
    fiscalTransactionError: any;

    fiscalTransactionPageable = {
        page: 0,
        size: 30,
    }
    fiscalTransactionLength: number;
    fiscalTransactionIndex: number;

    fiscalTransactionFilter = {
        seller: null,
    }

    private async setFilterFiscalTransaction(filterKey: string, value: any) {
        this.fiscalTransactionFilter[filterKey] = value;
        // Block for current seller
        this.fiscalTransactionFilter.seller = this.selectedSeller.id;

        this.loadFiscalTransaction(0);
        try {
            this.fiscalTransactionLength = await this.fiscalTransactionResourceService.countFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
        } catch(e) { }
    }

    fiscalTransactionPaginatorEvent(event: PageEvent) {
        this.fiscalTransactionPageable.size = event.pageSize;
        this.loadFiscalTransaction(event.pageIndex);
    }

    private async loadFiscalTransaction(page) {
        this.fiscalTransactionDTOs = null;

        this.fiscalTransactionIndex = page
        this.fiscalTransactionPageable.page = page;
        
        try {
            this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.purchasePageable.page,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,this.purchasePageable.size,null,null,null,null,null,null,null).toPromise();
        } catch(e) {
            this.fiscalTransactionError = e;
        }
    }
}

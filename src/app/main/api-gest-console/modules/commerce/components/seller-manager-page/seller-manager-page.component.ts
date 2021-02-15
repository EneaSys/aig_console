import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigNewCustomBuyDialogComponent } from '../new-custom-buy-dialog/new-custom-buy-dialog.component';
import { PurchaseResourceService, SellerResourceService, PurchaseDTO, SellerDTO, FiscalTransactionDTO, FiscalTransactionResourceService, BuyerDTO, BuyerResourceService } from 'aig-commerce';
import { PageEvent } from '@angular/material/paginator';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './seller-manager-page.component.html',
    styleUrls: ['./seller-manager-page.component.scss']
})
export class AigSellerManagerPageComponent extends GenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
        private purchaseResourceService: PurchaseResourceService,
        private buyerResourceService: BuyerResourceService,
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private _formBuilder: FormBuilder,
        private _fuseSidebarService: FuseSidebarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    sellerDTOs: SellerDTO[] = [];
    selectedSeller: SellerDTO;

    loadingPage: boolean = true;
    errorInLoading: any;
    
    async loadPage() {
        try {
            this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,50).toPromise();
            if(this.sellerDTOs.length > 0) {
                this.setSeller(this.sellerDTOs[0]);
            } else {
                throw new Error("Nessun negozio associato");
            }
        } catch(e) {
            this.errorInLoading = e;
        }

        this.fiscalTransactionSearchForm = this._formBuilder.group({
            id: [''],
            date: [''],
            code: [''],
        });

        this.loadingPage = false;
    }
    
    private setSeller(selectedSeller: SellerDTO) {
        this.selectedSeller = selectedSeller;

        this.purchaseIndex = 0;
        this.setFilterPurchase('seller', this.selectedSeller.id);

        this.buyerIndex = 0;
        this.setFilterBuyer('seller', this.selectedSeller.id);

        this.fiscalTransactionIndex = 0;
        this.setFilterFiscalTransaction('seller', this.selectedSeller.id);
        
        this.loadStatistics();
    }

    reloadPage() {
        this.loadStatistics();
        this.loadPurchases(this.purchaseIndex);
        this.loadBuyer(this.buyerIndex);
        this.loadFiscalTransaction(this.fiscalTransactionIndex);
    }





    statistics = {
        fiscalTransactionPending: 0,
        buyerPending: 0,
    }

    async loadStatistics() {
        let fiscalTransactionStatusToAction: string[] = ["1","4"];
        this.statistics.fiscalTransactionPending = await this.fiscalTransactionResourceService.countFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,null,null,null,null).toPromise();

        let buyerStatusToAction: string[] = ["1","4"];
        this.statistics.buyerPending = await this.buyerResourceService.countBuyersUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
    }














    // PURCHASE
    purchasedisplayColumns: string[] = ['id', 'date', 'customer', 'status', 'buttons'];
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
            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.purchaseFilter.seller, null, null, null, null, null, null,  null, this.purchasePageable.size, null, null, null, null, null, null).toPromise();
        } catch(e) {
            this.purchaseError = e;
        }
    }
    

























    // BUYER
    buyerSearchForm: FormGroup;

    buyerdisplayColumns: string[] = ['id', 'buyer', 'status', 'bornDate', 'buttons'];
    buyerDTOs: BuyerDTO[];
    buyerError: any;

    buyerPageable = {
        page: 0,
        size: 30,
    }
    buyerLength: number;
    buyerIndex: number;

    buyerFilter: any;

    private async setFilterBuyer(filterKey: string, value: any) {
        if(this.buyerFilter == null) {
            this.cleanBuyerFilters();
        }
        this.buyerFilter[filterKey] = value;
        // Block for current seller
        this.buyerFilter.seller = this.selectedSeller.id;
        this.loadBuyer(0);
        try {
            this.buyerLength = await this.buyerResourceService.countBuyersUsingGET(null,null,null,null,null,null,this.buyerFilter.eopooCode,null,null,null,this.buyerFilter.id,null,null,null,null,null,null,null,this.buyerFilter.seller,null,null,null,null,null,null,null,null,null,this.buyerFilter.statusNote,null,null,null).toPromise();
        } catch(e) { }
    }

    buyerPaginatorEvent(event: PageEvent) {
        this.buyerPageable.size = event.pageSize;
        this.loadBuyer(event.pageIndex);
    }

    private async loadBuyer(page) {
        this.buyerDTOs = null;

        this.buyerIndex = page
        this.buyerPageable.page = page;
        
        try {
            this.buyerDTOs = await this.buyerResourceService.getAllBuyersUsingGET(null,null,null,null,this.buyerFilter.eopooCode,null,null,null,null,null,this.buyerFilter.id,null,null,null,null,null,null,null,this.buyerPageable.page,this.buyerFilter.seller,null,null,null,null,null,null,null,this.buyerPageable.size,null,null,null,this.buyerFilter.statusNote,null,null,null).toPromise();
        } catch(e) {
            this.buyerError = e;
        }
    }

    private cleanBuyerFilters() {
        this.buyerFilter = {
            seller: null,
            id: null,
            eopooCode: null,
            statusNote: null,
        }
    }

    buyerSearch() {
        if(this.buyerSearchForm.value.id) {
            console.log("by id");
            this.cleanBuyerFilters();
            this.setFilterBuyer('id', this.buyerSearchForm.value.id);
        } else {
            if(this.buyerSearchForm.value.date != "") {
                this.buyerFilter.date = this.buyerSearchForm.value.date;
            }
            if(this.buyerSearchForm.value.code != "") {
                this.buyerFilter.code = this.buyerSearchForm.value.code;
            }
            
            this.setFilterBuyer('id', null);
        }
    }


























    // FISCAL TRANSACTION
    fiscalTransactionSearchForm: FormGroup;

    fiscalTransactiondisplayColumns: string[] = ['date', 'code', 'amount', 'buyer', 'status', 'buttons'];
    fiscalTransactionDTOs: FiscalTransactionDTO[];
    fiscalTransactionError: any;

    fiscalTransactionPageable = {
        page: 0,
        size: 30,
    }
    fiscalTransactionLength: number;
    fiscalTransactionIndex: number;

    fiscalTransactionFilter: any;

    private async setFilterFiscalTransaction(filterKey: string, value: any) {
        if(this.fiscalTransactionFilter == null) {
            this.cleanFiscalTransactionFilters();
        }
        this.fiscalTransactionFilter[filterKey] = value;
        // Block for current seller
        this.fiscalTransactionFilter.seller = this.selectedSeller.id;
        this.loadFiscalTransaction(0);
        try {
            this.fiscalTransactionLength = await this.fiscalTransactionResourceService.countFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.code,null,null,null,this.fiscalTransactionFilter.date,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,this.fiscalTransactionFilter.statusNote,null,null,null,null,null).toPromise();
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
            //this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.code,null,null,null,this.fiscalTransactionFilter.date,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.id,null,null,null,null,null,null,null,this.fiscalTransactionPageable.page,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,this.fiscalTransactionPageable.size,null,null,null,this.fiscalTransactionFilter.statusNote,null,null,null).toPromise();
        } catch(e) {
            this.fiscalTransactionError = e;
        }
    }

    private cleanFiscalTransactionFilters() {
        this.fiscalTransactionFilter = {
            seller: null,
            id: null,
            date: null,
            code: null,
            statusNote: null,
        }
    }

    fiscalTransactionSearch() {
        if(this.fiscalTransactionSearchForm.value.id) {
            this.cleanFiscalTransactionFilters();
            this.setFilterFiscalTransaction('id', this.fiscalTransactionSearchForm.value.id);
        } else {
            if(this.fiscalTransactionSearchForm.value.date != "") {
                this.fiscalTransactionFilter.date = this.fiscalTransactionSearchForm.value.date;
            }
            if(this.fiscalTransactionSearchForm.value.code != "") {
                this.fiscalTransactionFilter.code = this.fiscalTransactionSearchForm.value.code;
            }
            this.setFilterFiscalTransaction('id', null);
        }
    }

















    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    newBuy() {
        this.dialog.open(AigNewCustomBuyDialogComponent, { data: { seller: this.selectedSeller } });
    }
}

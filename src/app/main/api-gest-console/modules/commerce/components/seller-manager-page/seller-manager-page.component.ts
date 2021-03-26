import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigNewCustomBuyDialogComponent } from '../new-custom-buy-dialog/new-custom-buy-dialog.component';
import { PurchaseResourceService, SellerResourceService, PurchaseDTO, SellerDTO, FiscalTransactionDTO, FiscalTransactionResourceService, BuyerDTO, BuyerResourceService, PurchaseItemDTO } from 'aig-commerce';
import { PageEvent } from '@angular/material/paginator';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    templateUrl: './seller-manager-page.component.html',
    styleUrls: ['./seller-manager-page.component.scss']
})
export class AigSellerManagerPageComponent extends GenericComponent {
    constructor(
        private purchaseResourceService: PurchaseResourceService,
        private buyerResourceService: BuyerResourceService,
        private _formBuilder: FormBuilder,
        private _fuseSidebarService: FuseSidebarService,
        private dialog: MatDialog,
        private eventService :EventService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    purchaseDTOs: PurchaseDTO[] = [];
    purchaseItemDTOs: PurchaseItemDTO[] = [];
    buyerDTOs:BuyerDTO[] = [];
    selectedPurchase: PurchaseDTO;

    buyerDC: string[];

    loadingPage: boolean = true;
    errorInLoading: any;

    purchaseFilters = {
        idEquals: null,
        nameContains: null,
        page: 0,
    }

    /*buyerFilters = {
        idEquals: null,
        nameContains: null,
        page: 0,
    }
    */

    async loadPage() {
        /*this.buyerDC = ["confirmation","eopoo","eopooCode","id","seller","sellerId","statusNote"];
        

        this.buyerDTOs = await this.buyerResourceService.getAllBuyersUsingGET(this.buyerFilters).toPromise();*/
        try {
            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(this.purchaseFilters).toPromise();
            if (this.purchaseDTOs.length > 0) {
                this.setPurchase(this.purchaseDTOs[0]);
            } else {
                throw new Error("Nessuna vendita trovata");
            }
        } catch (e) {
            this.errorInLoading = e;
        }
        this.loadingPage = false;
    }

    private setPurchase(selectedPurchase: PurchaseDTO) {
        this.selectedPurchase = selectedPurchase;
        setTimeout(()=>{ this.eventService.reloadCurrentPage(); }, 1);
    }
}

   /* 

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
*/

























   













   
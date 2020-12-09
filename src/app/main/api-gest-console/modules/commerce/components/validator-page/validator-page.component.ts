import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { PurchaseResourceService, SellerResourceService, BuyerResourceService, FiscalTransactionResourceService, BuyerDTO, FiscalTransactionDTO } from 'aig-commerce';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog, PageEvent } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ValidateBuyerDialogComponent } from '../validate-buyer-dialog/validate-buyer-dialog.component';

@Component({
    templateUrl: './validator-page.component.html',
    styleUrls: ['./validator-page.component.scss']
})
export class AigCommValidatorPageComponent extends GenericComponent {
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

    loadPage() {
        this.fiscalTransactionSearchForm = this._formBuilder.group({
            id: [''],
            date: [''],
            code: [''],
        });

        this.buyerIndex = 0;
        this.setFilterBuyer('statusNote', 2);

        this.fiscalTransactionIndex = 0;
        this.setFilterFiscalTransaction('statusNote', 2);
    }

    reloadPage() {
        
        this.loadBuyer(this.buyerIndex);
        this.loadFiscalTransaction(this.fiscalTransactionIndex);
    }

    afterLoad() {

    }

























    // BUYER
    buyerSearchForm: FormGroup;

    buyerDisplayedColumns: string[] = ['id', 'seller', 'buyer', 'bornDate', 'status', 'validateButton'];
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

        fiscalTransactionDisplayedColumns: string[] = ['id', 'seller', 'amount', 'date', 'code', 'status', 'validateButton'];
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
                this.fiscalTransactionDTOs = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.code,null,null,null,this.fiscalTransactionFilter.date,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.id,null,null,null,null,null,null,null,this.fiscalTransactionPageable.page,null,null,null,null,null,null,null,null,this.fiscalTransactionFilter.seller,null,null,null,null,null,null,null,this.fiscalTransactionPageable.size,null,null,null,this.fiscalTransactionFilter.statusNote,null,null,null).toPromise();
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


















        








    validate() {
        this.dialog.open(ValidateBuyerDialogComponent, { data: {  } });
    }
}

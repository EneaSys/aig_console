import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { PurchaseResourceService, SellerResourceService, BuyerResourceService, FiscalTransactionResourceService, BuyerDTO } from 'aig-commerce';
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
        this.buyerIndex = 0;
        this.setFilterBuyer('statusNote', 2);
    }

    reloadPage() {

    }

    afterLoad() {

    }

























    // BUYER
    buyerSearchForm: FormGroup;

    buyerDisplayedColumns: string[] = ['id', 'seller', 'buyer', 'status', 'bornDate', 'validateButton'];
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


    










    validate() {
        this.dialog.open(ValidateBuyerDialogComponent, { data: {  } });
    }
}

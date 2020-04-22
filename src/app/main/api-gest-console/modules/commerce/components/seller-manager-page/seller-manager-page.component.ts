import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigNewCustomBuyDialogComponent } from '../new-custom-buy-dialog/new-custom-buy-dialog.component';
import { ValidateApiControllerService, ValidateEopooPersonRequest } from 'aig-generic';
import { PurchaseResourceService, SellerResourceService, PurchaseDTO, SellerDTO } from 'aig-commerce';
import { PageEvent } from '@angular/material/paginator';

@Component({
    templateUrl: './seller-manager-page.component.html',
    styleUrls: ['./seller-manager-page.component.scss']
})
export class AigSellerManagerPageComponent extends GenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
        private purchaseResourceService: PurchaseResourceService,
        private validateApiControllerService: ValidateApiControllerService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    sellerDTOs: SellerDTO[] = [];
    selectedSeller: SellerDTO;

    displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'buttons'];
    purchaseDTOs: PurchaseDTO[];

    message: string = "Caricando informazioni venditore";

    filter = {
        seller: null,
    }

    pageable = {
        page: 0,
        size: 30,
    }
    length: number;
    index: number;

    async loadPage() {
        try {
            this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET().toPromise();
            if(this.sellerDTOs.length > 0) {
                this.setSeller(this.sellerDTOs[0]);
            } else {
                throw new Error;
            }
        } catch(e) {
            this.message = "Non hai negozi associati.";
        }
    }

    async reloadPage() {
        this.loadPurchases(this.index);
    }

    private async setSeller(selectedSeller: SellerDTO) {
        this.purchaseDTOs = null;
        this.selectedSeller = selectedSeller;
        this.setFilter('seller', this.selectedSeller.id);
        this.loadPurchases(0);
    }

    private async setFilter(filterKey: string, value: any) {
        this.filter[filterKey] = value;
        // Block for current seller
        this.filter.seller = this.selectedSeller.id;

        this.loadPurchases(0);
        this.length = await this.purchaseResourceService.countPurchasesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.filter.seller, null, null, null, null, null, null, null).toPromise();
    }

    pageEvent(event: PageEvent) {
        this.pageable.size = event.pageSize;
        this.loadPurchases(event.pageIndex);
    }

    private async loadPurchases(page) {
        this.purchaseDTOs = null;

        this.index = page
        this.pageable.page = page;
        
        this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.pageable.page, null, null, null, null, null, null, null, null, this.filter.seller, null, null, null, null, null, null, null, this.pageable.size, null).toPromise();
    }
    
    newBuy() {
        this.dialog.open(AigNewCustomBuyDialogComponent, { data: { seller: this.selectedSeller } });
    }
}

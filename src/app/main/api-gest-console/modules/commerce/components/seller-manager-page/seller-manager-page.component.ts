import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigNewCustomBuyDialogComponent } from '../new-custom-buy-dialog/new-custom-buy-dialog.component';
import { ValidateApiControllerService, ValidateEopooPersonRequest } from 'aig-generic';
import { PurchaseResourceService, SellerResourceService, PurchaseDTO, SellerDTO } from 'aig-commerce';

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

    async loadComponent() {
        try {
            this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET().toPromise();
            if(this.sellerDTOs.length > 0) {
                this.setSeller(this.sellerDTOs[0]);
            }
        } catch(e) {
            this.message = "Non hai negozi associati.";
        }
    }

    async setSeller(selectedSeller: SellerDTO) {
        this.purchaseDTOs = null;
        this.selectedSeller = selectedSeller;
        this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.selectedSeller.id, null, null, null, null, null, null, null, null, null).toPromise();
    }
    
    newBuy() {
        this.dialog.open(AigNewCustomBuyDialogComponent, { data: { seller: this.selectedSeller } });
    }
}

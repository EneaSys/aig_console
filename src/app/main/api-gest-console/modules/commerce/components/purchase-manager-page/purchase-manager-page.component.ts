import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { BuyerDTO, BuyerResourceService, PurchaseDTO, PurchaseItemDTO, PurchaseItemResourceService, PurchaseResourceService } from 'aig-commerce';


@Component({
    templateUrl: './purchase-manager-page.component.html',
    styleUrls: ['./purchase-manager-page.component.scss']
})
export class AigPurchaseManagerPageComponent extends GenericComponent {
    constructor(
        private purchaseResourceService: PurchaseResourceService,
        private purchaseItemResourceService: PurchaseItemResourceService,
        private buyerResourceService: BuyerResourceService,
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

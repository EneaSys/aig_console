import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseResourceService, SellerResourceService, PurchaseDTO, SellerDTO, FiscalTransactionDTO, FiscalTransactionResourceService, BuyerDTO, BuyerResourceService, PurchaseItemDTO } from 'aig-commerce';
import { PageEvent } from '@angular/material/paginator';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './seller-manager-page.component.html',
    styleUrls: ['./seller-manager-page.component.scss']
})
export class AigSellerManagerPageComponent extends GenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseSidebarService: FuseSidebarService,
        private dialog: MatDialog,
        private eventService :EventService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    sellerDTOs: SellerDTO[] = [];

    selectedSeller: SellerDTO;

    loadingPage: boolean = true;
    errorInLoading: any;

    sellerFilters = {
        sellerIDEquals: null,
        sellerNameContains: null,
        page: 0,
    }

    

    async loadPage() {
        try {
            this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET(this.sellerFilters).toPromise();
            if(this.sellerDTOs.length == 0){
                this._snackBar.open("Nessun Venditore trovato!", null, {duration: 5000,});
            }
            if (this.sellerDTOs.length > 0) {
                this.setSeller(this.sellerDTOs[0]);
            } else {
                throw new Error("Nessuna vendita trovata");
            }
        } catch (e) {
            this.errorInLoading = e;
        }
        this.loadingPage = false;
    }

    private setSeller(selectedSeller: SellerDTO) {
        this.selectedSeller = selectedSeller;
        setTimeout(()=>{ this.eventService.reloadCurrentPage(); }, 1);
    }
}

   

























   













   
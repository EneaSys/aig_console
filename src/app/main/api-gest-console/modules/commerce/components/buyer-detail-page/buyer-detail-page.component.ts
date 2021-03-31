import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { BuyerDTO, BuyerResourceService, PurchaseResourceService, PurchaseDTO, ValidationImageReturnTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { HttpClient } from '@angular/common/http';
import { AigBuyerNewUpdateModalComponent } from '../buyer-new-update-modal/buyer-new-update-modal.component';
import { AigBuyerNewUpdateFormComponent } from 'aig-common/modules/commerce/components/buyer-new-update-form/buyer-new-update-form.component';

@Component({
    selector: 'aig-buyer-detail-page',
    templateUrl: './buyer-detail-page.component.html',
    styleUrls: ['./buyer-detail-page.component.scss']
})
export class AigBuyerDetailPageComponent extends GenericComponent {
    constructor(
        private buyerResourceService: BuyerResourceService,
        private purchaseResourceService: PurchaseResourceService,
        private httpClient: HttpClient,
        private _fuseProgressBarService: FuseProgressBarService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    buyerDTO: BuyerDTO;

    loadPage() {
        this.buyerDTO = this.route.snapshot.data.buyer;
        this.loadOther();
    }

    async reloadPage() {
        this.buyerDTO = await this.buyerResourceService.getBuyerUsingGET(this.buyerDTO.id).toPromise();
        this.loadOther();
    }

    editBuyer(buyerDTO: BuyerDTO) {
		this.dialog.open(AigBuyerNewUpdateFormComponent, { data: { buyer: buyerDTO } });
    }

    loadOther() {
        this.loadPurchases();
    }

    purchasedisplayColumns: string[] = ['id', 'date', 'statusNote', 'buttons'];
    purchaseDTOs: PurchaseDTO[];
    purchaseError: any;
    
    async loadPurchases() {
        this.purchaseDTOs = null;

		let filter = {
			idEqual: this.buyerDTO.id
		};
        try {
            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(filter).toPromise();
        } catch(e) {
            this.purchaseError = e;
        }
    }
}

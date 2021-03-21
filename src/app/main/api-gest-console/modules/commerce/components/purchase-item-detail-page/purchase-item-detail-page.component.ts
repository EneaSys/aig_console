import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import {  PurchaseItemDTO, PurchaseItemResourceService, } from 'aig-commerce';


@Component({
    selector: 'aig-purchase-item-detail-page',
    templateUrl: './purchase-item-detail-page.component.html',
    styleUrls: ['./purchase-item-detail-page.component.scss']
})
export class AigPurchaseItemDetailPageComponent extends GenericComponent {
    constructor(
        private purchaseItemResourceService: PurchaseItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    purchaseItemDTO: PurchaseItemDTO;
        
   
    loadPage() {
		this.purchaseItemDTO = this.route.snapshot.data.purchaseItem;
	}

	async reloadPage() {
		this.purchaseItemDTO = await this.purchaseItemResourceService.getPurchaseItemUsingGET(this.purchaseItemDTO.id).toPromise();
	}
}

import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { BuyerDTO, BuyerResourceService } from 'aig-commerce';

@Component({
    templateUrl: './buyer-detail-page.component.html',
    styleUrls: ['./buyer-detail-page.component.scss']
})
export class AigBuyerDetailPageComponent extends GenericComponent {
    constructor(
        private buyerResourceService: BuyerResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    buyer: BuyerDTO;

    loadPage() {
        this.buyer = this.route.snapshot.data.buyer;
        this.loadOther();
    }

    async reloadPage() {
        this.buyer = await this.buyerResourceService.getBuyerUsingGET(this.buyer.id).toPromise();
        this.loadOther();
    }

    loadOther() {

    }

    afterLoad() { }
}

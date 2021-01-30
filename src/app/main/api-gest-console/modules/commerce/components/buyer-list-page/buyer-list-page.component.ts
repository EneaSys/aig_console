import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BuyerDTO, BuyerResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
	templateUrl: './buyer-list-page.component.html',
	styleUrls: ['./buyer-list-page.component.scss']
})
export class AigBuyerListPageComponent extends GenericComponent {
	buyerDC: string[] = ["id", "name"];
	buyerDTOs: BuyerDTO[];
	buyerErr: any;

	constructor(
        private buyerResourceService: BuyerResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	async loadComponent() {
		try {
			this.buyerDTOs = await this.buyerResourceService.getAllBuyersUsingGET().toPromise();
		} catch (e) {
			this.buyerErr = e;
		}
	}
}

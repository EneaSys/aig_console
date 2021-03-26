import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPriceListItemNewUpdateDialogComponent } from '../price-list-item-new-update-dialog/price-list-item-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-item-detail-page',
    templateUrl: './price-list-item-detail-page.component.html',
    styleUrls: ['./price-list-item-detail-page.component.scss']
})
export class AigPriceListItemDetailPageComponent extends GenericComponent {
    constructor(
        private priceListItemResourceService: PriceListItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    priceListItemDTO: PriceListItemDTO;

    loadPage() {
        this.priceListItemDTO = this.route.snapshot.data.priceListItem;
        console.log (this.priceListItemDTO);
    }

    async reloadPage() {
		this.priceListItemDTO = await this.priceListItemResourceService.getPriceListItemUsingGET(this.priceListItemDTO.id).toPromise();
	}

    editPriceListItem(priceListItemDTO: PriceListItemDTO) {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { priceListItem: priceListItemDTO } });
    }
}
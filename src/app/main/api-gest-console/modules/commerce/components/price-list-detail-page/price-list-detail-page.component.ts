import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPriceListNewUpdateDialogComponent } from '../price-list-new-update-dialog/price-list-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-detail-page',
    templateUrl: './price-list-detail-page.component.html',
    styleUrls: ['./price-list-detail-page.component.scss']
})
export class AigPriceListDetailPageComponent extends GenericComponent {
    constructor(
        private priceListResourceService: PriceListResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    priceListDTO: PriceListDTO;

    loadPage() {
        this.priceListDTO = this.route.snapshot.data.priceList;
        console.log (this.priceListDTO);
    }

    async reloadPage() {
		this.priceListDTO = await this.priceListResourceService.getPriceListUsingGET(this.priceListDTO.id).toPromise();
	}

    editPriceList(priceListDTO: PriceListDTO) {
        this.dialog.open(AigPriceListNewUpdateDialogComponent, { data: { priceList: priceListDTO } });
    }
}
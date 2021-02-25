import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { SellerDTO, SellerResourceService } from "aig-commerce";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigSellerNewUpdateDialogComponent } from "../seller-new-update-dialog/seller-new-update-dialog.component";

@Component({
	selector: 'aig-seller-detail-page',
	templateUrl: './seller-detail-page.component.html',
	styleUrls: ['./seller-detail-page.component.scss']
})
export class AigSellerDetailPageComponent extends GenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	sellerDTO: SellerDTO;

    loadPage() {
		this.sellerDTO = this.route.snapshot.data.seller;
	}

	async reloadPage() {
		this.sellerDTO = await this.sellerResourceService.getSellerUsingGET(this.sellerDTO.id).toPromise();
	}
	
    editSeller(sellerDTO: SellerDTO) {
		this.dialog.open(AigSellerNewUpdateDialogComponent, { data: { seller: sellerDTO } });
    }
}
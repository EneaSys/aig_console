import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { BuyerDTO, BuyerResourceService, CatalogDTO, CatalogResourceService, SellerDTO, SellerResourceService } from "aig-commerce";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigBuyerNewUpdateModalComponent } from "../buyer-new-update-modal/buyer-new-update-modal.component";
import { AigCatalogNewUpdateDialogComponent } from "../catalog-new-update-dialog/catalog-new-update-dialog.component";
import { AigCommerceGenericComponent } from "../commerce-generic-component";
import { AigSellerNewUpdateDialogComponent } from "../seller-new-update-dialog/seller-new-update-dialog.component";

@Component({
	selector: 'aig-seller-detail-page',
	templateUrl: './seller-detail-page.component.html',
	styleUrls: ['./seller-detail-page.component.scss']
})
export class AigSellerDetailPageComponent extends AigCommerceGenericComponent {
	constructor(
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private sellerResourceService: SellerResourceService,
		private catalogResourceService: CatalogResourceService,
		private buyerResourceService: BuyerResourceService,
		private route: ActivatedRoute,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	sellerDTO: SellerDTO;

	loadPage() {
		this.sellerDTO = this.route.snapshot.data.seller;
		this.loadOther();
	}

	async reloadPage() {
		this.sellerDTO = await this.sellerResourceService.getSellerUsingGET(this.sellerDTO.id).toPromise();
		this.loadOther();
	}

	async loadOther() {
		this.loadCatalog();
		this.loadBuyer();
	}

	editSeller(sellerDTO: SellerDTO) {
		this.dialog.open(AigSellerNewUpdateDialogComponent, { data: { seller: sellerDTO } });
	}

	async deleteSeller(id: number) {
		this._fuseProgressBarService.show();

		try {
			await this.sellerResourceService.deleteSellerUsingDELETE(id).toPromise();

			this._snackBar.open(`Seller: '${id}' deleted.`, null, { duration: 2000, });

			this.router.navigate(['/commerce', 'seller']);
		} catch (e) {
			this._snackBar.open(`Error during deleting seller: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}

	catalogDC: string[] = ["id", "name", "buttons"];
	catalogDTOs: CatalogDTO[];
	catalogError: any;
	async loadCatalog() {
		let filters = {
			sellerIDEquals: this.sellerDTO.id
		};
		try {
			this.catalogDTOs = await this.catalogResourceService.getAllCatalogsUsingGET(filters).toPromise();
		} catch (e) {
			this.catalogError = e;
		}
	}

	addCatalog(sellerDTO: SellerDTO) {
        this.dialog.open(AigCatalogNewUpdateDialogComponent, { data: { catalog: { }, seller: sellerDTO } });
    }

	buyerDC: string[] = ["id", "buyer", "statusNote" ,"buttons"];
    buyerDTOs: BuyerDTO[];
    buyerError: any;
    async loadBuyer() {
        let filters = {
            sellerIDEquals: this.sellerDTO.id
        };
        try {
            this.buyerDTOs = await this.buyerResourceService.getAllBuyersUsingGET(filters).toPromise();
        } catch (e) {
            this.buyerError = e;
        }
    }

	addBuyer(sellerDTO: SellerDTO) {
        this.dialog.open(AigBuyerNewUpdateModalComponent, { data: { buyer: { }, seller: sellerDTO } });
    }
}
import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
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
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
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
	
    editSeller(sellerDTO: SellerDTO) {
		this.dialog.open(AigSellerNewUpdateDialogComponent, { data: { seller: sellerDTO } });
    }
}
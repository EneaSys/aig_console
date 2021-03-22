import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import {  PurchaseItemDTO, PurchaseItemResourceService, } from 'aig-commerce';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';


@Component({
    selector: 'aig-purchase-item-detail-page',
    templateUrl: './purchase-item-detail-page.component.html',
    styleUrls: ['./purchase-item-detail-page.component.scss']
})
export class AigPurchaseItemDetailPageComponent extends GenericComponent {
    constructor(
        private purchaseItemResourceService: PurchaseItemResourceService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    purchaseItemDTO: PurchaseItemDTO;
        
   
    loadPage() {
		this.purchaseItemDTO = this.route.snapshot.data.purchaseItem;
	}

	async reloadPage() {
		this.purchaseItemDTO = await this.purchaseItemResourceService.getPurchaseItemUsingGET(this.purchaseItemDTO.id).toPromise();
	}

    async deletePurchaseItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.purchaseItemResourceService.deletePurchaseItemUsingDELETE(id).toPromise();

            this.router.navigate(['/commerce', 'purchase-item']);

            this._snackBar.open(`Purchase item: '${id}' deleted.`, null, { duration: 2000, });
        } catch (e) {
            this._snackBar.open(`Error during deleting purchase item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }
}

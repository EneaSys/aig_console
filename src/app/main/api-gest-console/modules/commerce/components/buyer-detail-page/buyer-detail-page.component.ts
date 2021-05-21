import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { BuyerDTO, BuyerResourceService, PurchaseResourceService, PurchaseDTO } from 'aig-commerce';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigBuyerNewUpdateModalComponent } from '../buyer-new-update-modal/buyer-new-update-modal.component';

@Component({
    selector: 'aig-buyer-detail-page',
    templateUrl: './buyer-detail-page.component.html',
    styleUrls: ['./buyer-detail-page.component.scss']
})
export class AigBuyerDetailPageComponent extends AigCommerceGenericComponent {
    constructor(
        private buyerResourceService: BuyerResourceService,
        private purchaseResourceService: PurchaseResourceService,
        private _fuseProgressBarService: FuseProgressBarService,
        private router: Router,
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
		this.dialog.open(AigBuyerNewUpdateModalComponent, { data: { buyer: buyerDTO } });
    }

    async deleteBuyer(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.buyerResourceService.deleteBuyerUsingDELETE(id).toPromise();

            this._snackBar.open(`Buyer: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/commerce', 'buyer']);
        } catch (e) {
            this._snackBar.open(`Error during deleting buyer: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
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
			buyerIdEqual: this.buyerDTO.id
		};
        try {
            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(filter).toPromise();
        } catch(e) {
            this.purchaseError = e;
        }
    }
}

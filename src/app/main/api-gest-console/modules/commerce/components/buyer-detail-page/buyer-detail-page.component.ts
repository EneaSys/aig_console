import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { BuyerDTO, BuyerResourceService, PurchaseResourceService, PurchaseDTO, ValidationImageReturnTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './buyer-detail-page.component.html',
    styleUrls: ['./buyer-detail-page.component.scss']
})
export class AigBuyerDetailPageComponent extends GenericComponent {
    constructor(
        private buyerResourceService: BuyerResourceService,
        private purchaseResourceService: PurchaseResourceService,
        private httpClient: HttpClient,
        private _fuseProgressBarService: FuseProgressBarService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
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
        this.loadPurchases();
    }

    purchaseDisplayedColumns: string[] = ['id', 'date', 'status', 'buttons'];
    purchaseDTOs: PurchaseDTO[];
    purchaseError: any;
    
    async loadPurchases() {
        this.purchaseDTOs = null;

        try {
            this.purchaseDTOs = await this.purchaseResourceService.getAllPurchasesUsingGET(null, null, null, null, null, null, null, null, null, this.buyer.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).toPromise();
        } catch(e) {
            this.purchaseError = e;
        }
    }







    loadingBuyerValidationImage: boolean = false;

    buyerValidationImageUrl: string;
    async showDocument() {
        this._fuseProgressBarService.show();
        this.loadingBuyerValidationImage = true;
        try {
            let validationImageReturnTO: ValidationImageReturnTO = await this.buyerResourceService.getBuyerValidationImageUsingGET(this.buyer.id).toPromise();
            this.buyerValidationImageUrl = validationImageReturnTO.url;
        } catch(e) {
            this._snackBar.open(`Problema nel caricamento del documento.`, null, { duration: 10000, });
        }
        this.loadingBuyerValidationImage = false;
        this._fuseProgressBarService.hide();
    }

    buyerValidationImageFile: string;
    buyerValidationSelectedImage(event) {
        this.buyerValidationImageFile = event.target.files[0];
    }

    
    async uploadDocument() {
        this._fuseProgressBarService.show();
        this.loadingBuyerValidationImage = true;

        try {
            let validationImageReturnTO: ValidationImageReturnTO = await this.buyerResourceService.putBuyerValidationImageUsingPUT(this.buyer.id).toPromise();
            await this.httpClient.put(validationImageReturnTO.url, this.buyerValidationImageFile).toPromise();
            this.buyer.statusNote = "2";
            await this.buyerResourceService.updateBuyerUsingPUT(this.buyer).toPromise();
            this.eventService.reloadCurrentPage();
            this._snackBar.open(`Documento caricato con successo.`, null, { duration: 5000, });
        } catch(e) {
            this._snackBar.open(`Problema nel caricamento del documento.`, null, { duration: 10000, });
        }
        this.loadingBuyerValidationImage = false;
        this._fuseProgressBarService.hide();
    }








    afterLoad() { }
}

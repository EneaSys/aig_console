import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatSnackBar } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { BuyerDTO, BuyerResourceService, ValidationImageReturnTO } from 'aig-commerce';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';


@Component({
    templateUrl: './validate-buyer-page.component.html',
    styleUrls: ['./validate-buyer-page.component.scss']
})
export class ValidateBuyerPageComponent extends GenericComponent {
    constructor(
        private buyerResourceService: BuyerResourceService,
        private _fuseProgressBarService: FuseProgressBarService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
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
        if(this.buyer.statusNote != '1') {
            this.showDocument()
        } else {
            this._snackBar.open(`Il venditore non ha caricato il documento`, null, { duration: 5000, });
        }
    }

    buyerValidationImageUrl: string;
    async showDocument() {
        this._fuseProgressBarService.show();
        try {
            let validationImageReturnTO: ValidationImageReturnTO = await this.buyerResourceService.getBuyerValidationImageUsingGET(this.buyer.id).toPromise();
            this.buyerValidationImageUrl = validationImageReturnTO.url;
        } catch(e) {
            this._snackBar.open(`Problema nel caricamento del documento.`, null, { duration: 10000, });
        }
        this._fuseProgressBarService.hide();
    }

    loadingApprovationDocument: boolean = false;
    async approvationDocument(statusNote: string) {
        this._fuseProgressBarService.show();
        this.loadingApprovationDocument = true;

        try {
            this.buyer.statusNote = statusNote;
            await this.buyerResourceService.updateBuyerUsingPUT(this.buyer).toPromise();
            this.eventService.reloadCurrentPage();
            this._snackBar.open(`Documento aggiornato con successo.`, null, { duration: 5000, });
            this.loadNextCustomerToValidate();
        } catch(e) {
            this._snackBar.open(`Problema nell'aggiornamento del documento.`, null, { duration: 10000, });
        }
        this.loadingApprovationDocument = false;
        this._fuseProgressBarService.hide();
    }

    async loadNextCustomerToValidate() {
        try {
            let buyers = await this.buyerResourceService.getAllBuyersUsingGET().toPromise();
            let randomIndex = this.getRandomArbitrary(0, buyers.length)
            let buyer: BuyerDTO = buyers[parseInt(randomIndex)];

            this.buyer = buyer;
            this.router.navigateByUrl('/commerce/buyer/detail/' + buyer.id + '/validate');
        } catch(e) {
            this._snackBar.open(`Problema nel recupero di un documento`, null, { duration: 10000, });
        }
    }

    private getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}

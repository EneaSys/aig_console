import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { FiscalTransactionDTO, FiscalTransactionResourceService, ValidationImageReturnTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';


@Component({
    templateUrl: './validate-fiscal-transaction-page.component.html',
    styleUrls: ['./validate-fiscal-transaction-page.component.scss']
})
export class ValidateFiscalTransactionPageComponent extends GenericComponent {
    constructor(
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private _fuseProgressBarService: FuseProgressBarService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    fiscalTransaction: FiscalTransactionDTO;

    loadPage() {
        this.fiscalTransaction = this.route.snapshot.data.fiscalTransaction;
        this.loadOther();
    }

    async reloadPage() {
        this.fiscalTransaction = await this.fiscalTransactionResourceService.getFiscalTransactionUsingGET(this.fiscalTransaction.id).toPromise();
        this.loadOther();
    }

    loadOther() {
        if(this.fiscalTransaction.statusNote != '1') {
            this.showDocument()
        } else {
            this._snackBar.open(`Il venditore non ha caricato il documento fiscale.`, null, { duration: 5000, });
        }
    }

    fiscalTransactionValidationImageUrl: string;
    async showDocument() {
        this._fuseProgressBarService.show();
        try {
            let validationImageReturnTO: ValidationImageReturnTO = await this.fiscalTransactionResourceService.getFiscalTransactionValidationImageUsingGET(this.fiscalTransaction.id).toPromise();
            this.fiscalTransactionValidationImageUrl = validationImageReturnTO.url;
        } catch(e) {
            this._snackBar.open(`Problema nel caricamento del documento fiscale.`, null, { duration: 10000, });
        }
        this._fuseProgressBarService.hide();
    }

    loadingApprovationDocument: boolean = false;
    async approvationDocument(statusNote: string) {
        this._fuseProgressBarService.show();
        this.loadingApprovationDocument = true;

        try {
            this.fiscalTransaction.statusNote = statusNote;
            await this.fiscalTransactionResourceService.updateFiscalTransactionUsingPUT(this.fiscalTransaction).toPromise();
            this.eventService.reloadCurrentPage();
            this._snackBar.open(`Documento fiscale aggiornato con successo.`, null, { duration: 5000, });
            this.loadNextCustomerToValidate();
        } catch(e) {
            this._snackBar.open(`Problema nell'aggiornamento del documento fiscale.`, null, { duration: 10000, });
        }
        this.loadingApprovationDocument = false;
        this._fuseProgressBarService.hide();
    }

    async loadNextCustomerToValidate() {
        try {
            let fiscalTransactions = await this.fiscalTransactionResourceService.getAllFiscalTransactionsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'2',null,null,null,null,null).toPromise();
            let randomIndex = this.getRandomArbitrary(0, fiscalTransactions.length)
            let fiscalTransaction: FiscalTransactionDTO = fiscalTransactions[parseInt(randomIndex)];

            this.fiscalTransaction = fiscalTransaction;
            this.router.navigateByUrl('/commerce/fiscal-transaction/detail/' + fiscalTransaction.id + '/validate');
        } catch(e) {
            this._snackBar.open(`Problema nel recupero di un documento fiscale.`, null, { duration: 10000, });
        }
    }

    private getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}

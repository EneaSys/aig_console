import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { FiscalTransactionDTO, FiscalTransactionResourceService, ValidationImageReturnTO } from 'aig-commerce';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventService } from 'aig-common/event-manager/event.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector: 'fiscal-transaction-detail-page',
    templateUrl: './fiscal-transaction-detail-page.component.html',
    styleUrls: ['./fiscal-transaction-detail-page.component.scss']
})
export class AigFiscalTransactionDetailPageComponent extends GenericComponent {
    constructor(
        private httpClient: HttpClient,
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private _fuseProgressBarService: FuseProgressBarService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
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

    async loadOther() {
        
    }

    uploading: boolean = false;
    loadingFiscalTransactionValidationImageUrl: boolean = false;
    fiscalTransactionValidationImageUrl: string;
    async showDocument() {
        this._fuseProgressBarService.show();
        this.loadingFiscalTransactionValidationImageUrl = true;
        try {
            let validationImageReturnTO: ValidationImageReturnTO = await this.fiscalTransactionResourceService.getFiscalTransactionValidationImageUsingGET(this.fiscalTransaction.id).toPromise();
            this.fiscalTransactionValidationImageUrl = validationImageReturnTO.url;
        } catch(e) {
            this._snackBar.open(`Problema nel caricamento del documento.`, null, { duration: 10000, });
        }
        this.loadingFiscalTransactionValidationImageUrl = false;
        this._fuseProgressBarService.hide();
    }

    fiscalTransactionValidationImageFile: string;
    fiscalTransactionValidationSelectedImage(event) {
        this.fiscalTransactionValidationImageFile = event.target.files[0];
    }

    async uploadDocument() {
        this._fuseProgressBarService.show();
        this.uploading = true;

        try {
            let validationImageReturnTO: ValidationImageReturnTO = await this.fiscalTransactionResourceService.putFiscalTransactionValidationImageUsingPUT(this.fiscalTransaction.id).toPromise();
            await this.httpClient.put(validationImageReturnTO.url, this.fiscalTransactionValidationImageFile).toPromise();
            this.fiscalTransaction.statusNote = "2";
            await this.fiscalTransactionResourceService.updateFiscalTransactionUsingPUT(this.fiscalTransaction).toPromise()
            this.eventService.reloadCurrentPage();
            this._snackBar.open(`Documento caricato con successo.`, null, { duration: 5000, });
        } catch(e) {
            this._snackBar.open(`Problema nel caricamento del documento.`, null, { duration: 10000, });
        }
        this.uploading = false;
        this._fuseProgressBarService.hide();
    }

    afterLoad() {

    }
}

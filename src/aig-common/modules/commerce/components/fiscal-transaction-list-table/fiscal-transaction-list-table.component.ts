import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FiscalTransactionDTO, FiscalTransactionResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigFiscalTransactionNewUpdateModalComponent } from 'app/main/api-gest-console/modules/commerce/components/fiscal-transaction-new-update-modal/fiscal-transaction-new-update-modal.component';


@Component({
    selector: 'aig-fiscal-transaction-list-table',
    templateUrl: './fiscal-transaction-list-table.component.html',
    styleUrls: ['./fiscal-transaction-list-table.component.scss']
})
export class AigFiscalTransactionListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteFiscalTransaction(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.fiscalTransactionResourceService.deleteFiscalTransactionUsingDELETE(id).toPromise();
            this._snackBar.open(`Fiscal Transaction: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting fiscal transaction: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editFiscalTransaction(fiscalTransactionDTO: FiscalTransactionDTO) {
        this.dialog.open(AigFiscalTransactionNewUpdateModalComponent, { data: { fiscalTransaction: fiscalTransactionDTO } });
    }
}

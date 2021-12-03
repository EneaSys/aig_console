import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CreditCardResourceService, CreditCardDTO } from 'aig-wallet';
import { AigCreditCardNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/wallet/components/credit-card-new-update-dialog/credit-card-new-update-dialog.component';


@Component({
	selector: 'aig-credit-card-list-table',
	templateUrl: './credit-card-list-table.component.html',
	styleUrls: ['./credit-card-list-table.component.scss']
})
export class AigCreditCardListTableComponent implements OnInit {
	@Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: CreditCardDTO[];

    constructor(
        private creditCardResourceService: CreditCardResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteCreditCard(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.creditCardResourceService.deleteCreditCardUsingDELETE(id).toPromise();
            this._snackBar.open(`CreditCard: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting credit card: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

	editCreditCard(e: any) {
		this.dialog.open(AigCreditCardNewUpdateDialogComponent, { data: { creditCard: e } });
	}
}

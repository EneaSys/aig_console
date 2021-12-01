import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CreditCardDTO, TransactionResourceService } from 'aig-wallet';
import { AigTransactionNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/wallet/components/transaction-new-update-dialog/transaction-new-update-dialog.component';


@Component({
	selector: 'aig-transaction-list-table',
	templateUrl: './transaction-list-table.component.html',
	styleUrls: ['./transaction-list-table.component.scss']
})
export class AigTransactionListTableComponent implements OnInit {
	@Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: CreditCardDTO[];

    constructor(
        private transactionResourceService: TransactionResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

}

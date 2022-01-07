import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CreditCardDTO, GiveHaveDTO, TransactionDTO, TransactionResourceService } from 'aig-wallet';


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
    dataSource: TransactionDTO[];
	@Input()
	walletId: number;

    constructor(
        private transactionResourceService: TransactionResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

	totals = { };

    ngOnInit(): void { }

	calc(transaction: TransactionDTO) {
		transaction.giveHaves.forEach((giveHave: GiveHaveDTO) => {
			if(giveHave.type == 'INPUT') {
				this.totals[giveHave.transactionId] =+ giveHave.amount;
			}
		});
		
		return this.totals[transaction.id];
	}


}

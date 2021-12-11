import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CreditCardDTO, GiveHaveDTO, GiveHaveResourceService, TransactionResourceService } from 'aig-wallet';


@Component({
	selector: 'aig-give-have-list-table',
	templateUrl: './give-have-list-table.component.html',
	styleUrls: ['./give-have-list-table.component.scss']
})
export class AigGiveHaveListTableComponent implements OnInit {
	@Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: GiveHaveDTO[];

    constructor(
        private giveHaveResourceService: GiveHaveResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

}
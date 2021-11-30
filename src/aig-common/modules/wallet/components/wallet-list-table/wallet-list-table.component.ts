import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WalletResourceService, WalletDTO } from 'aig-wallet';
import { AigWalletNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/wallet/components/wallet-new-update-dialog/wallet-new-update-dialog.component';


@Component({
	selector: 'aig-wallet-list-table',
	templateUrl: './wallet-list-table.component.html',
	styleUrls: ['./wallet-list-table.component.scss']
})
export class AigWalletListTableComponent implements OnInit {
	@Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: WalletDTO[];

    constructor(
        private walletResourceService: WalletResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteWallet(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.walletResourceService.deleteWalletUsingDELETE(id).toPromise();
            this._snackBar.open(`Wallet: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting wallet: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

	editWallet(e: any) {
		this.dialog.open(AigWalletNewUpdateDialogComponent, { data: { wallet: e } });
	}
}

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigMerchantNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/wallet/components/merchant-new-update-dialog/merchant-new-update-dialog.component';
import { AigMerchantService } from '../../services/merchant.service';

@Component({
	selector: 'aig-merchant-list-table',
	templateUrl: './merchant-list-table.component.html',
	styleUrls: ['./merchant-list-table.component.scss']
})
export class AigMerchantListTableComponent implements OnInit {
	@Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    constructor(
        private merchantService: AigMerchantService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteMerchant(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.merchantService.deleteMerchant(id).toPromise();
            this._snackBar.open(`Merchant: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting merchant: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

	editMerchant(e: any) {
		this.dialog.open(AigMerchantNewUpdateDialogComponent, { data: { merchant: e } });
	}
}

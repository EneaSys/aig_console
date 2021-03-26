import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { SellerDTO, SellerResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigSellerNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/seller-new-update-dialog/seller-new-update-dialog.component';

@Component({
    selector: 'aig-seller-list-table',
    templateUrl: './seller-list-table.component.html',
    styleUrls: ['./seller-list-table.component.scss']
})
export class AigSellerListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private router: Router,
        private sellerResourceService : SellerResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteSeller(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.sellerResourceService.deleteSellerUsingDELETE(id).toPromise();
            this._snackBar.open(`Seller: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting seller: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editSeller(sellerDTO: SellerDTO) {
        this.dialog.open(AigSellerNewUpdateDialogComponent, { data: { seller: sellerDTO } });
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PurchaseDTO, PurchaseResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigPurchaseNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/purchase-new-update-dialog/purchase-new-update-dialog.component';
import { AigPurchaseNewUpdateFormComponent } from '../purchase-new-update-form/purchase-new-update-form.component';


@Component({
    selector: 'aig-purchase-list-table',
    templateUrl: './purchase-list-table.component.html',
    styleUrls: ['./purchase-list-table.component.scss']
})
export class AigPurchaseListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private purchaseResourceService: PurchaseResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deletePurchase(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.purchaseResourceService.deletePurchaseUsingDELETE(id).toPromise();
            this._snackBar.open(`Purchase: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Purchase: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPurchase(purchaseDTO: PurchaseDTO) {
        this.dialog.open(AigPurchaseNewUpdateDialogComponent, { data: { purchase: purchaseDTO } });
    }
}

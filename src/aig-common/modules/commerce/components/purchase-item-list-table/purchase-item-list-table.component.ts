import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PurchaseItemDTO, PurchaseItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigPurchaseItemNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/purchase-item-new-update-dialog/purchase-item-new-update-dialog.component';

@Component({
    selector: 'aig-purchase-item-list-table',
    templateUrl: './purchase-item-list-table.component.html',
    styleUrls: ['./purchase-item-list-table.component.scss']
})
export class AigPurchaseItemListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private purchaseItemResourceService: PurchaseItemResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deletePurchaseItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.purchaseItemResourceService.deletePurchaseItemUsingDELETE(id).toPromise();
            this._snackBar.open(`Purchase item: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting purchase item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }
    editPurchaseItem(purchaseItemDTO: PurchaseItemDTO) {
        this.dialog.open(AigPurchaseItemNewUpdateDialogComponent, { data: { purchaseItem: purchaseItemDTO } });
    }
}
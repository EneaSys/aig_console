import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { BuyerDTO, BuyerResourceService} from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigBuyerNewUpdateModalComponent } from 'app/main/api-gest-console/modules/commerce/components/buyer-new-update-modal/buyer-new-update-modal.component';

@Component({
    selector: 'aig-buyer-list-table',
    templateUrl: './buyer-list-table.component.html',
    styleUrls: ['./buyer-list-table.component.scss']
})
export class AigBuyerListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    constructor(
        private buyerResourceService: BuyerResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteBuyer(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.buyerResourceService.deleteBuyerUsingDELETE(id).toPromise();
            this._snackBar.open(`Buyer: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting buyer: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editBuyer(buyerDTO: BuyerDTO) {
        this.dialog.open(AigBuyerNewUpdateModalComponent, { data: { buyer: buyerDTO } });
    }
}

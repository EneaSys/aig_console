import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigPriceListItemNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/price-list-item-new-update-dialog/price-list-item-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-item-list-table',
    templateUrl: './price-list-item-list-table.component.html',
    styleUrls: ['./price-list-item-list-table.component.scss']
})
export class AigPriceListItemListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private priceListItemResourceService: PriceListItemResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deletePriceListItem(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.priceListItemResourceService.deletePriceListItemUsingDELETE(id).toPromise();
            this._snackBar.open(`Price List Item: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting price list item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPriceListItem(priceListItemDTO: PriceListItemDTO) {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { priceListItem: priceListItemDTO } });
    }

}


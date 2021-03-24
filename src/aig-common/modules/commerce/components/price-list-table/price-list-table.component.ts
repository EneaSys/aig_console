import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigPriceListNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/commerce/components/price-list-new-update-dialog/price-list-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-table',
    templateUrl: './price-list-table.component.html',
    styleUrls: ['./price-list-table.component.scss']
})
export class AigPriceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private priceListResourceService: PriceListResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {}

        async deletePriceList(id: number) {
            this._fuseProgressBarService.show();
    
            try {
                await this.priceListResourceService.deletePriceListUsingDELETE(id).toPromise();
                this._snackBar.open(`Price List: '${id}' deleted.`, null, { duration: 2000, });
    
                this.eventService.reloadCurrentPage();
            } catch (e) {
                this._snackBar.open(`Error during deleting Price List: '${id}'. (${e.message})`, null, { duration: 5000, });
            }
            this._fuseProgressBarService.hide();
        }
    
        editPriceList(priceListDTO: PriceListDTO) {
            this.dialog.open(AigPriceListNewUpdateDialogComponent, { data: { priceList: priceListDTO } });
        }
     
}
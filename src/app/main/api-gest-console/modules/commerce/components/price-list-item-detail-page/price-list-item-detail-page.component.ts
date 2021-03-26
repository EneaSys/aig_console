import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPriceListItemNewUpdateDialogComponent } from '../price-list-item-new-update-dialog/price-list-item-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-item-detail-page',
    templateUrl: './price-list-item-detail-page.component.html',
    styleUrls: ['./price-list-item-detail-page.component.scss']
})
export class AigPriceListItemDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private priceListItemResourceService: PriceListItemResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    priceListItemDTO: PriceListItemDTO;

    loadPage() {
        this.priceListItemDTO = this.route.snapshot.data.priceListItem;
        console.log (this.priceListItemDTO);
    }

    async reloadPage() {
		this.priceListItemDTO = await this.priceListItemResourceService.getPriceListItemUsingGET(this.priceListItemDTO.id).toPromise();
	}

    async deletePriceListItem(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.priceListItemResourceService.deletePriceListItemUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Price List Item: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/commerce', 'price-list-item']);
        } catch (e) {
            this._snackBar.open(`Error during deleting price list item: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editPriceListItem(priceListItemDTO: PriceListItemDTO) {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { priceListItem: priceListItemDTO } });
    }
}
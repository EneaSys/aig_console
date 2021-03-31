import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPriceListNewUpdateDialogComponent } from '../price-list-new-update-dialog/price-list-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-detail-page',
    templateUrl: './price-list-detail-page.component.html',
    styleUrls: ['./price-list-detail-page.component.scss']
})
export class AigPriceListDetailPageComponent extends GenericComponent {
    constructor(
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private priceListResourceService: PriceListResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    priceListDTO: PriceListDTO;

    loadPage() {
        this.priceListDTO = this.route.snapshot.data.priceList;
    }

    async reloadPage() {
		this.priceListDTO = await this.priceListResourceService.getPriceListUsingGET(this.priceListDTO.id).toPromise();
	}

    async deletePriceList(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.priceListResourceService.deletePriceListUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Price List: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/commerce', 'price-list']);
        } catch (e) {
            this._snackBar.open(`Error during deleting price list: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }

    editPriceList(priceListDTO: PriceListDTO) {
        this.dialog.open(AigPriceListNewUpdateDialogComponent, { data: { priceList: priceListDTO } });
    }
}
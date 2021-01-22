import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SellerResourceService, SellerDTO } from 'aig-commerce';
import { AigSellerNewUpdateDialogComponent } from '../seller-new-update-dialog/seller-new-update-dialog.component';

@Component({
    templateUrl: './seller-list-page.component.html',
    styleUrls: ['./seller-list-page.component.scss']
})
export class AigSellerListPageComponent extends GenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    sellerDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    sellerDTOs: SellerDTO[];

    async loadComponent() {
        this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET().toPromise();
    }

    newSeller() {
		this.dialog.open(AigSellerNewUpdateDialogComponent, { data: { } });
	}
	
}

import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { AigNewCustomBuyDialogComponent } from '../new-custom-buy-dialog/new-custom-buy-dialog.component';

@Component({
    templateUrl: './seller-manager-page.component.html',
    styleUrls: ['./seller-manager-page.component.scss']
})
export class AigSellerManagerPageComponent extends GenericComponent {
    constructor(
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'buttons'];
    buys: any[];

    loadComponent() {
        this.buys = [];
    }


    newBuy() {
        this.dialog.open(AigNewCustomBuyDialogComponent);
    }
}

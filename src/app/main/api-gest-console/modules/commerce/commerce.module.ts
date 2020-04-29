import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';

import { AigCommonCommerceModule } from 'aig-common/modules/commerce/common-commerce.module';

import { commerceRoute } from './commerce.route';
import { AigSellerManagerPageComponent } from './components/seller-manager-page/seller-manager-page.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AigNewCustomBuyDialogComponent } from './components/new-custom-buy-dialog/new-custom-buy-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AigCommerceApiModule } from 'aig-commerce';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AigSellerListPageComponent } from './components/seller-list-page/seller-list-page.component';
import { AigSellerNewUpdateDialogComponent } from './components/seller-new-update-dialog/seller-new-update-dialog.component';
import { AigPurchaseDetailPageComponent } from './components/purchase-detail-page/purchase-detail-page.component';
import { AigFiscalTransactionDetailPageComponent } from './components/fiscal-transaction-detail-page/fiscal-transaction-detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { AigBuyerDetailPageComponent } from './components/buyer-detail-page/buyer-detail-page.component';
import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';


@NgModule({
    imports: [
        RouterModule.forChild(commerceRoute),
        
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        AigCommonCommerceModule,
        AigCommerceApiModule,

        CommonGenericModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,

        MatIconModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,

    ],
    providers: [

    ],
    declarations: [
        AigSellerManagerPageComponent,
        AigNewCustomBuyDialogComponent,
        AigSellerListPageComponent,
        AigSellerNewUpdateDialogComponent,
        AigPurchaseDetailPageComponent,
        AigFiscalTransactionDetailPageComponent,
        AigBuyerDetailPageComponent,
    ],
    entryComponents: [
        AigNewCustomBuyDialogComponent,
        AigSellerNewUpdateDialogComponent,
    ],
    exports: [],
})
export class AigCommerceModule {}
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


@NgModule({
    imports: [
        RouterModule.forChild(commerceRoute),
        
        AigCommonCommerceModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,

        MatSnackBarModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatToolbarModule,

        
    ],
    providers: [

    ],
    declarations: [
        AigSellerManagerPageComponent,
        AigNewCustomBuyDialogComponent,
    ],
    entryComponents: [
        AigNewCustomBuyDialogComponent,
    ],
    exports: [],
})
export class AigCommerceModule {}
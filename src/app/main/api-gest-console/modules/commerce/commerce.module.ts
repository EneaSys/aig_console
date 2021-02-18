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
import { ValidateBuyerDialogComponent } from './components/validate-buyer-dialog/validate-buyer-dialog.component';
import { ValidateBuyerPageComponent } from './components/validate-buyer-page/validate-buyer-page.component';
import { ValidateFiscalTransactionPageComponent } from './components/validate-fiscal-transaction-page/validate-fiscal-transaction-page.component';
import { AigBuyerListPageComponent } from './components/buyer-list-page/buyer-list-page.component';
import { AigInventoryItemListPageComponent } from './components/inventory-item-list-page/inventory-item-list-page.component';
import { AigProducerListPageComponent } from './components/producer-list-page/producer-list-page.component';
import { AigInventoryCategoryListPageComponent } from './components/inventory-category-list-page/inventory-category-list-page.component';
import { AigWarehouseListPageComponent } from './components/warehouse-list-page/warehouse-list-page.component';
import { AigWarehouseNewUpdateModalComponent } from './components/warehouse-new-update-modal/warehouse-new-update-modal.component';
import { AigInventoryCategoryNewUpdateModalComponent } from './components/inventory-category-new-update-modal/inventory-category-new-update-modal.component';
import { AigInventoryCategoryDetailPageComponent } from './components/inventory-category-detail-page/inventory-category-detail-page.component';
import { AigInventoryItemDialogComponent } from './components/inventory-item-dialog/inventory-item-dialog.component';
import { AigInventoryItemDetailPageComponent } from './components/inventory-item-detail-page/inventory-item-detail-page.component';
import { AigProducerNewUpdateModalComponent } from './components/producer-new-update-modal-component/producer-new-update-modal.component';
import { AigProducerDetailPageComponent } from './components/producer-detail-page/producer-detail-page.component';
import { AigWarehouseDetailPageComponent } from './components/warehouse-detail-page/warehouse-detail-page.component';
import { AigFiscalTransactionListPageComponent } from './components/fiscal-transaction-list-page/fiscal-transaction-list-page.component';
import { AigFiscalTransactionNewUpdateModalComponent } from './components/fiscal-transaction-new-update-modal/fiscal-transaction-new-update-modal.component';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from './components/inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';
import { AigCatalogListPageComponent } from './components/catalog-list-page/catalog-list-page.component';
import { AigCatalogNewUpdateDialogComponent } from './components/catalog-new-update-dialog/catalog-new-update-dialog.component';
import { AigCatalogDetailPageComponent } from './components/catalog-detail-page/catalog-detail-page.component';
import { AigInventoryItemCombinationListPageComponent } from './components/inventory-item-combination-list-page/inventory-item-combination-list-page.component';


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
        AigNewCustomBuyDialogComponent,
        AigSellerListPageComponent,
        AigSellerNewUpdateDialogComponent,
        AigPurchaseDetailPageComponent,
        AigFiscalTransactionDetailPageComponent,
        AigBuyerDetailPageComponent,
        ValidateBuyerDialogComponent,
        ValidateBuyerPageComponent,
		ValidateFiscalTransactionPageComponent,
        AigBuyerListPageComponent,
        AigInventoryItemListPageComponent,
        AigProducerListPageComponent,
        AigInventoryCategoryListPageComponent,
        AigInventoryCategoryDetailPageComponent,
        AigInventoryCategoryNewUpdateModalComponent,
        AigWarehouseListPageComponent,
        AigWarehouseNewUpdateModalComponent,
        AigInventoryItemDialogComponent,
        AigInventoryItemDetailPageComponent,
        AigInventoryItemCombinationNewUpdateDialogComponent,
        AigProducerNewUpdateModalComponent,
        AigProducerDetailPageComponent,
        AigWarehouseDetailPageComponent,
        AigCatalogListPageComponent,
        AigCatalogDetailPageComponent,
        AigCatalogNewUpdateDialogComponent,
        AigFiscalTransactionListPageComponent,
        AigFiscalTransactionNewUpdateModalComponent,
        AigInventoryItemCombinationListPageComponent,
    ],
    entryComponents: [
        AigNewCustomBuyDialogComponent,
        AigWarehouseNewUpdateModalComponent,
        AigFiscalTransactionNewUpdateModalComponent,
        AigSellerNewUpdateDialogComponent,
        ValidateBuyerDialogComponent,
        AigInventoryCategoryNewUpdateModalComponent,
        AigInventoryItemDialogComponent,
        AigInventoryItemCombinationNewUpdateDialogComponent,
        AigProducerNewUpdateModalComponent,
        AigCatalogNewUpdateDialogComponent,
    ],
    exports: [],
})
export class AigCommerceModule {}
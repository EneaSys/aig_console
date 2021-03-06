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
import { MatToolbarModule } from '@angular/material/toolbar';
import { AigCommerceApiModule } from 'aig-commerce';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AigSellerListPageComponent } from './components/seller-list-page/seller-list-page.component';
import { AigSellerNewUpdateDialogComponent } from './components/seller-new-update-dialog/seller-new-update-dialog.component';
import { AigPurchaseDetailPageComponent } from './components/purchase-detail-page/purchase-detail-page.component';
import { AigFiscalTransactionDetailPageComponent } from './components/fiscal-transaction-detail-page/fiscal-transaction-detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatAutocompleteModule, MatSlideToggle, MatSlideToggleModule, MatCheckboxModule } from '@angular/material';
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
import { AigWarehouseHandlingListPageComponent } from './components/warehouse-handling-list-page/warehouse-handling-list-page.component';
import { AigWarehouseHandlingNewUpdateModalComponent } from './components/warehouse-handling-new-update-modal/warehouse-handling-new-update-modal.component';
import { AigWarehouseHandlingDetailPageComponent } from './components/warehouse-handling-detail-page/warehouse-handling-detail-page.component.ts/warehouse-handling-detail-page.component';
import { AigWarehouseManagerPageComponent } from './components/warehouse-manager-page/warehouse-manager-page.component';
import { AigSellerDetailPageComponent } from './components/seller-detail-page/seller-detail-page.component';
import { AigFiscalTransactionListPageComponent } from './components/fiscal-transaction-list-page/fiscal-transaction-list-page.component';
import { AigFiscalTransactionNewUpdateModalComponent } from './components/fiscal-transaction-new-update-modal/fiscal-transaction-new-update-modal.component';
import { AigInventoryItemCombinationNewUpdateDialogComponent } from './components/inventory-item-combination-new-update-dialog/inventory-item-combination-new-update-dialog.component';
import { AigCatalogListPageComponent } from './components/catalog-list-page/catalog-list-page.component';
import { AigCatalogNewUpdateDialogComponent } from './components/catalog-new-update-dialog/catalog-new-update-dialog.component';
import { AigCatalogDetailPageComponent } from './components/catalog-detail-page/catalog-detail-page.component';
import { AigInventoryItemCombinationListPageComponent } from './components/inventory-item-combination-list-page/inventory-item-combination-list-page.component';
import { AigPriceListListPageComponent } from './components/price-list-list-page/price-list-list-page.component';
import { AigPriceListNewUpdateDialogComponent } from './components/price-list-new-update-dialog/price-list-new-update-dialog.component';
import { AigPriceListDetailPageComponent } from './components/price-list-detail-page/price-list-detail-page.component';
import { AigCatalogManagerPageComponent } from './components/catalog-manager-page/catalog-manager-page.component';
import { AigCatalogItemListPageComponent } from './components/catalog-item-list-page/catalog-item-list-page.component';
import { AigCatalogItemNewUpdateDialogComponent } from './components/catalog-item-new-update-dialog/catalog-item-new-update-dialog.component';
import { AigCatalogItemDetailPageComponent } from './components/catalog-item-detail-page/catalog-item-detail-page.component';
import { AigPriceListItemListPageComponent } from './components/price-list-item-list-page/price-list-item-list-page.component';
import { AigPriceListItemNewUpdateDialogComponent } from './components/price-list-item-new-update-dialog/price-list-item-new-update-dialog.component';
import { AigPriceListItemDetailPageComponent } from './components/price-list-item-detail-page/price-list-item-detail-page.component';
import { AigWarehouseHandlingComplexModalComponent } from './components/warehouse-handling-complex-modal/warehouse-handling-complex-modal.component';
import { AigInventoryItemCombinationDetailPageComponent } from './components/inventory-item-combination-detail-page/inventory-item-combination-detail-page.component';
import { AigBuyerNewUpdateModalComponent } from './components/buyer-new-update-modal/buyer-new-update-modal.component';
import { AigPurchaseListPageComponent } from './components/purchase-list-page/purchase-list-page.component';
import { AigPurchaseNewUpdateDialogComponent } from './components/purchase-new-update-dialog/purchase-new-update-dialog.component';
import { AigPurchaseItemListPageComponent } from './components/purchase-item-list-page/purchase-item-list-page.component';
import { AigPurchaseNewUpdateFormComponent } from 'aig-common/modules/commerce/components/purchase-new-update-form/purchase-new-update-form.component';
import { AigPurchaseItemNewUpdateDialogComponent } from './components/purchase-item-new-update-dialog/purchase-item-new-update-dialog.component';
import { AigWarehouseHandlingItemListPageComponent } from './components/warehouse-handling-item-list-page/warehouse-handling-item-list-page.component';
import { AigWarehouseHandlingItemNewUpdateModalComponent } from './components/warehouse-handling-item-new-update-modal/warehouse-handling-item-new-update-modal.component';
import { AigPurchaseItemDetailPageComponent } from './components/purchase-item-detail-page/purchase-item-detail-page.component';
import { AigWarehouseHandlingItemDetailPageComponent } from './components/warehouse-handling-item-detail-page/warehouse-handling-item-detail-page.component';
import { AigSellerManagerPageComponent } from './components/seller-manager-page/seller-manager-page.component';
import { AigPurchaseComplexDialogComponent } from './components/purchase-complex-dialog/purchase-complex-dialog.component';
import { TranslateModule } from '@ngx-translate/core';




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

        TranslateModule,

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
        MatSelectModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatCheckboxModule,

    ],
    providers: [

    ],
    declarations: [
        AigSellerListPageComponent,
        AigSellerNewUpdateDialogComponent,
        AigPurchaseDetailPageComponent,
        AigFiscalTransactionDetailPageComponent,
        ValidateBuyerDialogComponent,
        ValidateBuyerPageComponent,
		ValidateFiscalTransactionPageComponent,
        AigBuyerListPageComponent,
        AigBuyerDetailPageComponent,
        AigBuyerNewUpdateModalComponent,
        AigWarehouseListPageComponent,
        AigWarehouseNewUpdateModalComponent,
        AigWarehouseDetailPageComponent,
        AigInventoryItemListPageComponent,
        AigProducerListPageComponent,
        AigInventoryCategoryListPageComponent,
        AigInventoryCategoryDetailPageComponent,
        AigInventoryCategoryNewUpdateModalComponent,
        AigInventoryItemDialogComponent,
        AigInventoryItemDetailPageComponent,
        AigInventoryItemCombinationNewUpdateDialogComponent,
        AigProducerNewUpdateModalComponent,
        AigProducerDetailPageComponent,
        AigWarehouseDetailPageComponent,
        AigCatalogListPageComponent,
        AigCatalogDetailPageComponent,
        AigCatalogNewUpdateDialogComponent,
        AigCatalogItemListPageComponent,
        AigCatalogItemNewUpdateDialogComponent,
        AigCatalogItemDetailPageComponent,
        AigCatalogManagerPageComponent,
        AigPurchaseListPageComponent,
        AigPurchaseNewUpdateDialogComponent,
        AigWarehouseHandlingListPageComponent,
        AigWarehouseHandlingNewUpdateModalComponent,
        AigWarehouseHandlingDetailPageComponent,
        AigWarehouseManagerPageComponent,
        AigWarehouseHandlingComplexModalComponent,
        AigWarehouseHandlingItemListPageComponent,
        AigWarehouseHandlingItemNewUpdateModalComponent,
        AigWarehouseHandlingItemDetailPageComponent,

        AigSellerDetailPageComponent,
        AigFiscalTransactionListPageComponent,
        AigFiscalTransactionNewUpdateModalComponent,
        AigPriceListListPageComponent,
        AigPriceListDetailPageComponent,
        AigPriceListNewUpdateDialogComponent,
        AigPriceListItemListPageComponent,
        AigPriceListItemDetailPageComponent,
        AigPriceListItemNewUpdateDialogComponent,
        AigSellerDetailPageComponent,
        AigInventoryItemCombinationListPageComponent,
        AigPurchaseItemListPageComponent,
        AigPurchaseItemNewUpdateDialogComponent,
        AigPurchaseComplexDialogComponent,
        AigSellerManagerPageComponent,

        AigInventoryItemCombinationDetailPageComponent,
        AigPurchaseItemDetailPageComponent,
        AigPriceListItemNewUpdateDialogComponent,
  
       

    ],
    
    entryComponents: [
        AigWarehouseNewUpdateModalComponent,
        AigBuyerNewUpdateModalComponent,
        AigFiscalTransactionNewUpdateModalComponent,
        AigSellerNewUpdateDialogComponent,
        ValidateBuyerDialogComponent,
        AigInventoryCategoryNewUpdateModalComponent,
        AigInventoryItemDialogComponent,
        AigInventoryItemCombinationNewUpdateDialogComponent,
        AigProducerNewUpdateModalComponent,
        AigCatalogNewUpdateDialogComponent,
        AigCatalogItemNewUpdateDialogComponent,
        AigPriceListNewUpdateDialogComponent,
        AigPriceListItemNewUpdateDialogComponent,
        AigPurchaseNewUpdateDialogComponent,
        AigPurchaseItemNewUpdateDialogComponent,
        AigWarehouseHandlingNewUpdateModalComponent,
        AigWarehouseHandlingComplexModalComponent,
        AigWarehouseHandlingItemNewUpdateModalComponent,
        AigPurchaseComplexDialogComponent,
    ],
    exports: [],
})
export class AigCommerceModule {}

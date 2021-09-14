import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AigCommonModule } from 'aig-common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AigSellerListTableComponent } from './components/seller-list-table/seller-list-table.component';
import { AigSellerNewUpdateFormComponent } from './components/seller-new-update-form/seller-new-update-form.component';
import { CommonGenericModule } from '../generic/common-generic.module';
import { PurchaseResolver } from './resolver/purchase.resolver';
import { AigFiscalTransactionListTableComponent } from './components/fiscal-transaction-list-table/fiscal-transaction-list-table.component';
import { FiscalTransactionResolver } from './resolver/fiscal-transaction.resolver';
import { AigC6eGenericStatusPipe } from './pipe/genericStatus.pipe';
import { AigBuyerListTableComponent } from './components/buyer-list-table/buyer-list-table.component';
import { BuyerResolver } from './resolver/buyer.resolver';
import { AigInventoryCategoryListTableComponent } from './components/inventory-category-list-table/inventory-category-list-table.component';
import { AigInventoryItemListTableComponent } from './components/inventory-item-list-table/inventory-item-list-table.component';
import { AigProducerListTableComponent } from './components/producer-list-table/producer-list-table.component';
import { AigWarehouseListTableComponent } from './components/warehouse-list-table/warehouse-list-table.component';
import { AigWarehouseNewUpdateFormComponent } from './components/warehouse-new-update-form/warehouse-new-update-form.component';
import { AigInventoryCategoryNewUpdateFormComponent } from './components/inventory-category-new-update-form/inventory-category-new-update-form.component';
import { AigInventoryCategoryResolver } from './resolver/inventory-category.resolver';
import { AigInventoryItemDialogFormComponent } from './components/inventory-item-dialog-form/inventory-item-dialog-form.component';
import { AigInventoryItemResolver } from './resolver/inventory-item-resolver';
import { AigProducerNewUpdateFormComponent } from './components/producer-new-update-form/producer-new-update-form.component';
import { AigProducerResolver } from './resolver/producer.resolver';
import { AigCommerceAutocompleteFilterService } from './service/autocomplete-filter.service';
import { AigCommerceAutocompleteDisplayService } from './service/autocomplete-display.service';
import { AigWarehouseResolver } from './resolver/warehouse.resolver';
import { AigPurchaseListTableComponent } from './components/purchase-list-table/purchase-list-table.component';
import { AigPurchaseComplexFormComponent } from './components/purchase-complex-form/purchase-complex-form.component';
import { AigPaymentListTableComponent } from './components/payment-list-table/payment-list-table.component';
import { MatRadioModule } from '@angular/material';
import { AigPurchaseNewUpdateFormComponent } from './components/purchase-new-update-form/purchase-new-update-form.component';
import { AigPurchaseItemListTableComponent } from './components/purchase-item-list-table/purchase-item-list-table.component';
import { AigPurchaseItemNewUpdateFormComponent } from './components/purchase-item-new-update-form/purchase-item-new-update-form.component';
import { AigWarehouseHandlingListTableComponent } from './components/warehouse-handling-list-table/warehouse-handling-list-table.component';
import { MatMenuModule} from '@angular/material';
import { AigWarehouseHandlingNewUpdateFormComponent } from './components/warehouse-handling-new-update-form/warehouse-handling-new-update-form.component';
import { AigWarehouseHandlingFormComplexComponent } from './components/warehouse-handling-form-complex/warehouse-handling-form-complex.component';
import { AigWarehouseHandlingItemListTableComponent } from './components/warehouse-handling-item-list-table/warehouse-handling-item-list-table.component';
import { AigWarehouseHandlingItemNewUpdateFormComponent } from './components/warehouse-handling-item-new-update-form/warehouse-handling-item-new-update-form.component';
import { AigWarehouseHandlingResolver } from './resolver/warehouse-handling.resolver';
import { AigFiscalTransactionNewUpdateFormComponent } from './components/fiscal-transaction-new-update-form/fiscal-transaction-new-update-form.component';
import { AigInventoryItemCombinationListTableComponent } from './components/inventory-item-combination-list-table/inventory-item-combination-list-table.component';
import { AigInventoryItemCombinationNewUpdateFormComponent } from './components/inventory-item-combination-new-update-form/inventory-item-combination-new-update-form.component';
import { AigInventoryItemPurchaseListTableComponent } from './components/inventory-item-purchase-list-table/inventory-item-purchase-list-table.component';
import { AigCatalogListTableComponent } from './components/catalog-list-table/catalog-list-table.component';
import { AigCatalogNewUpdateFormComponent } from './components/catalog-new-update-form/catalog-new-update-form.component';
import { AigCatalogResolver } from './resolver/catalog.resolver';
import { AigPriceListTableComponent } from './components/price-list-table/price-list-table.component';
import { AigPriceListNewUpdateFormComponent } from './components/price-list-new-update-form/price-list-new-update-form.component';
import { AigPriceListResolver } from './resolver/price-list.resolver';
import { AigCatalogItemListTableComponent } from './components/catalog-item-list-table/catalog-item-list-table.component';
import { AigCatalogItemNewUpdateFormComponent } from './components/catalog-item-new-update-form/catalog-item-new-update-form.component';
import { AigCatalogItemResolver } from './resolver/catalog-item.resolver';
import { AigPriceListItemListTableComponent } from './components/price-list-item-list-table/price-list-item-list-table.component';
import { AigBuyerNewUpdateFormComponent } from './components/buyer-new-update-form/buyer-new-update-form.component';
import { AigPriceListItemNewUpdateFormComponent } from './components/price-list-item-new-update-form/price-list-item-new-update-form.component';
import { AigSellerResolver } from './resolver/seller.resolver';
import { PurchaseItemResolver } from './resolver/purchase-item.resolver';
import { AigWarehouseHandlingItemResolver } from './resolver/warehouse-handling-item.resolver';
import { AigPriceListItemResolver } from './resolver/price-list-item.resolver';
import { AigCatalogPriceManagerListTableComponent } from './components/catalog-price-manager-list-table/catalog-price-manager-list-table.component';
import { AigInventoryItemCombinationResolver } from './resolver/inventory-item-combination.resolver';
import { AigEntityDetailInventoryItemComponent } from './components/inventory-item-box-detail/entity-detail-inventory-item.component';
import { AigEntityDetailCatalogComponent } from './components/catalog-box-detail/entity-detail-catalog.component';
import { AigEntityDetailWarehouseComponent } from './components/warehouse-box-detail/entity-detail-warehouse.component';
import { AigEntityDetailProducerComponent } from './components/producer-box-detail/entity-detail-producer.component';
import { AigEntityDetailSellerComponent } from './components/seller-box-detail/entity-detail-seller.component';
import { TranslateModule } from '@ngx-translate/core';
import { AigBuyerBoxDetailComponent } from './components/buyer-box-detail/buyer-box-detail.component';
import { AigWarehouseHandlingBoxDetailComponent } from './components/warehouse-handling-box-detail/warehouse-handling-box-detail.component';
import { AigCatalogItemBoxDetailComponent } from './components/catalog-item-box-detail/catalog-item-box-detail.component';
import { AigPriceListBoxDetailComponent } from './components/price-list-box-detail/price-list-box-detail.component';
import { AigInventoryCategoryBoxDetailComponent } from './components/inventory-category-box-detail/inventory-category-box-detail.component';
import { AigPriceListItemBoxDetailComponent } from './components/price-list-item-box-detail/price-list-item-box-detail.component';
import { AigInventoryItemCombinationBoxDetailComponent } from './components/inventory-item-combination-box-detail/inventory-item-combination-box-detail.component';
import { AigPurchaseBoxDetailComponent } from './components/purchase-box-detail/purchase-box-detail.component';
import { WarehouseFilterFormComponent } from './components/warehouse-filters-form/warehouse-filters-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';


@NgModule({
    imports: [

        AigCommonModule,
        CommonModule,
        CommonGenericModule,
        
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule,

        InputTextModule,
        BrowserModule,
        BrowserAnimationsModule,
        InputNumberModule,
        ButtonModule,
        FormsModule,
  



        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatMenuModule,
    ],
    declarations: [

        AigBuyerListTableComponent,
        AigBuyerNewUpdateFormComponent,
        AigBuyerBoxDetailComponent,

        AigCatalogListTableComponent,
        AigCatalogNewUpdateFormComponent,
        AigEntityDetailCatalogComponent,

        AigCatalogItemListTableComponent,
        AigCatalogItemNewUpdateFormComponent,
        AigCatalogItemBoxDetailComponent,

        AigCatalogPriceManagerListTableComponent,

        AigFiscalTransactionListTableComponent,
        AigFiscalTransactionNewUpdateFormComponent,

        AigInventoryCategoryListTableComponent,
        AigInventoryCategoryNewUpdateFormComponent,
        AigInventoryCategoryBoxDetailComponent,

        AigInventoryItemListTableComponent,
        AigInventoryItemDialogFormComponent,
        AigEntityDetailInventoryItemComponent,

        AigInventoryItemCombinationListTableComponent,
        AigInventoryItemCombinationNewUpdateFormComponent,
        AigInventoryItemCombinationBoxDetailComponent,

        AigInventoryItemPurchaseListTableComponent,

        AigPaymentListTableComponent,

        AigPriceListTableComponent,
        AigPriceListNewUpdateFormComponent,
        AigPriceListBoxDetailComponent,

        AigPriceListItemListTableComponent,
        AigPriceListItemNewUpdateFormComponent,
        AigPriceListItemBoxDetailComponent,

        AigProducerListTableComponent,
        AigProducerNewUpdateFormComponent,
        AigEntityDetailProducerComponent,

        AigPurchaseListTableComponent,
        AigPurchaseNewUpdateFormComponent,
        AigPurchaseBoxDetailComponent,

        AigPurchaseComplexFormComponent,

        AigPurchaseItemListTableComponent,
        AigPurchaseItemNewUpdateFormComponent,

        AigSellerListTableComponent,
        AigSellerNewUpdateFormComponent,
        AigEntityDetailSellerComponent,
        
        AigWarehouseListTableComponent,
        AigWarehouseNewUpdateFormComponent,
        AigEntityDetailWarehouseComponent,
        WarehouseFilterFormComponent,

        AigWarehouseHandlingListTableComponent,
        AigWarehouseHandlingNewUpdateFormComponent,
        AigWarehouseHandlingBoxDetailComponent,

        AigWarehouseHandlingFormComplexComponent,

        AigWarehouseHandlingItemListTableComponent,
        AigWarehouseHandlingItemNewUpdateFormComponent,

        AigC6eGenericStatusPipe,
    ],
    providers: [

        BuyerResolver,
        AigCatalogResolver,
        AigCatalogItemResolver,
        FiscalTransactionResolver,
        AigInventoryCategoryResolver,
        AigInventoryItemResolver,
        AigInventoryItemCombinationResolver,
        AigPriceListResolver,
        AigPriceListItemResolver,
        AigProducerResolver,
        PurchaseResolver,
        PurchaseItemResolver,
        AigSellerResolver,
        AigWarehouseResolver,
        AigWarehouseHandlingResolver,
        AigWarehouseHandlingItemResolver,

	    AigCommerceAutocompleteFilterService,
	    AigCommerceAutocompleteDisplayService,
    ],
    exports: [

        AigBuyerListTableComponent,
        AigBuyerNewUpdateFormComponent,
        AigBuyerBoxDetailComponent,

        AigCatalogListTableComponent,
        AigCatalogNewUpdateFormComponent,
        AigEntityDetailCatalogComponent,

        AigCatalogItemListTableComponent,
        AigCatalogItemNewUpdateFormComponent,
        AigCatalogItemBoxDetailComponent,

        AigCatalogPriceManagerListTableComponent,

        AigFiscalTransactionListTableComponent,
        AigFiscalTransactionNewUpdateFormComponent,

        AigInventoryCategoryListTableComponent,
        AigInventoryCategoryNewUpdateFormComponent,
        AigInventoryCategoryBoxDetailComponent,

        AigInventoryItemListTableComponent,
        AigInventoryItemDialogFormComponent,
        AigEntityDetailInventoryItemComponent,

        AigInventoryItemCombinationListTableComponent,
        AigInventoryItemCombinationNewUpdateFormComponent,
        AigInventoryItemCombinationBoxDetailComponent,

        AigInventoryItemPurchaseListTableComponent,

        AigPaymentListTableComponent,

        AigPriceListTableComponent,
        AigPriceListNewUpdateFormComponent,
        AigPriceListBoxDetailComponent,

        AigPriceListItemListTableComponent,
        AigPriceListItemNewUpdateFormComponent,
        AigPriceListItemBoxDetailComponent,
        
        AigProducerListTableComponent,
        AigProducerNewUpdateFormComponent,
        AigEntityDetailProducerComponent,

        AigPurchaseListTableComponent,
        AigPurchaseNewUpdateFormComponent,
        AigPurchaseBoxDetailComponent,

        AigPurchaseComplexFormComponent,

        AigPurchaseItemListTableComponent,
        AigPurchaseItemNewUpdateFormComponent,

        AigSellerListTableComponent,
        AigSellerNewUpdateFormComponent,
        AigEntityDetailSellerComponent,
        
        AigWarehouseListTableComponent,
        AigWarehouseNewUpdateFormComponent,
        AigEntityDetailWarehouseComponent,
        WarehouseFilterFormComponent,

        AigWarehouseHandlingListTableComponent,
        AigWarehouseHandlingNewUpdateFormComponent,
        AigWarehouseHandlingBoxDetailComponent,

        AigWarehouseHandlingFormComplexComponent,

        AigWarehouseHandlingItemListTableComponent,
        AigWarehouseHandlingItemNewUpdateFormComponent,

        AigC6eGenericStatusPipe,
    ],
})
export class AigCommonCommerceModule {}
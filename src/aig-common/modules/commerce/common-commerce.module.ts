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
import { AigBuyListTableComponent } from './components/buy-list-table/buy-list-table.component';
import { AigCustomSmlcNewPurchaseFormComponent } from './components/custom-smlc-new-purchase-form/custom-smlc-new-purchase-form.component';
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
import { AigCommerceAutocompleteService } from './service/autocomplete-filter.service';
import { AigAutocompleteDisplayService } from './service/autocomplete-display.service';
import { AigWarehouseResolver } from './resolver/warehouse.resolver';
import { AigWarehouseHandlingListTableComponent } from './components/warehouse-handling-list-table/warehouse-handling-list-table.component';
import { MatRadioModule } from '@angular/material';
import { AigWarehouseHandlingNewUpdateFormComponent } from './components/warehouse-handling-new-update-form/warehouse-handling-new-update-form.component';
import { AigWarehouseHandlingResolver } from './resolver/warehouse-handling.resolver';
import { AigFiscalTransactionNewUpdateFormComponent } from './fiscal-transaction-new-update-form/fiscal-transaction-new-update-form.component';
import { AigInventoryItemCombinationListTableComponent } from './components/inventory-item-combination-list-table/inventory-item-combination-list-table.component';
import { AigInventoryItemCombinationNewUpdateFormComponent } from './components/inventory-item-combination-new-update-form/inventory-item-combination-new-update-form.component';
import { AigWarehouseHandlingFormComplexComponent } from './components/warehouse-handling-form-complex/warehouse-handling-form-complex.component';
import { AigSellerResolver } from './resolver/seller.resolver';
import { AigBuyerNewUpdateFormComponent } from './components/buyer-new-update-form/buyer-new-update-form.component';
import { AigWarehouseHandlingItemListTableComponent } from './components/warehouse-handling-item-list-table/warehouse-handling-item-list-table.component';
import { AigWarehouseHandlingItemNewUpdateFormComponent } from './components/warehouse-handling-item-new-update-form/warehouse-handling-item-new-update-form.component';



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
        MatRadioModule,
    

    ],
    declarations: [
        AigBuyListTableComponent,
        AigCustomSmlcNewPurchaseFormComponent,
        AigSellerListTableComponent,
        AigSellerNewUpdateFormComponent,
        AigFiscalTransactionListTableComponent,
        AigC6eGenericStatusPipe,
        AigBuyerListTableComponent,
        AigBuyerNewUpdateFormComponent,
        AigInventoryCategoryListTableComponent,
        AigInventoryCategoryNewUpdateFormComponent,
        AigInventoryItemListTableComponent,
        AigInventoryItemCombinationListTableComponent,
        AigInventoryItemCombinationNewUpdateFormComponent,
        AigProducerListTableComponent,
        AigWarehouseListTableComponent,
        AigWarehouseNewUpdateFormComponent,
        AigInventoryItemDialogFormComponent,
        AigProducerNewUpdateFormComponent,
        AigWarehouseHandlingListTableComponent,
        AigWarehouseHandlingNewUpdateFormComponent,
        AigFiscalTransactionNewUpdateFormComponent,
        AigWarehouseHandlingFormComplexComponent,
        AigWarehouseHandlingItemListTableComponent,
        AigWarehouseHandlingItemNewUpdateFormComponent,
        
        
    ],
    providers: [
        PurchaseResolver,
        FiscalTransactionResolver,
        BuyerResolver,
        AigInventoryCategoryResolver,
        AigInventoryItemResolver,
        AigProducerResolver,
		AigCommerceAutocompleteService,
		AigAutocompleteDisplayService,
        AigWarehouseResolver,
        AigWarehouseHandlingResolver,
        AigSellerResolver,
    ],
    exports: [
        AigBuyListTableComponent,
        AigCustomSmlcNewPurchaseFormComponent,
        AigSellerListTableComponent,
        AigSellerNewUpdateFormComponent,
        AigFiscalTransactionListTableComponent,
        AigC6eGenericStatusPipe,
        AigBuyerListTableComponent,
        AigBuyerNewUpdateFormComponent,
        AigInventoryCategoryListTableComponent,
        AigInventoryCategoryNewUpdateFormComponent,
        AigInventoryItemListTableComponent,
        AigInventoryItemCombinationListTableComponent,
        AigInventoryItemCombinationNewUpdateFormComponent,
        AigProducerListTableComponent,
        AigWarehouseListTableComponent,
        AigWarehouseNewUpdateFormComponent,
        AigInventoryItemDialogFormComponent,
        AigProducerNewUpdateFormComponent,
        AigWarehouseHandlingListTableComponent,
        AigWarehouseHandlingNewUpdateFormComponent,
        AigWarehouseHandlingFormComplexComponent,
        AigWarehouseHandlingItemListTableComponent,
        AigWarehouseHandlingItemNewUpdateFormComponent,

        AigFiscalTransactionNewUpdateFormComponent
        
    ],
})
export class AigCommonCommerceModule {}
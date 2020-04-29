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

    ],
    declarations: [
        AigBuyListTableComponent,
        AigCustomSmlcNewPurchaseFormComponent,
        AigSellerListTableComponent,
        AigSellerNewUpdateFormComponent,
        AigFiscalTransactionListTableComponent,
        AigC6eGenericStatusPipe,
        AigBuyerListTableComponent,
    ],
    providers: [
        PurchaseResolver,
        FiscalTransactionResolver,
    ],
    exports: [
        AigBuyListTableComponent,
        AigCustomSmlcNewPurchaseFormComponent,
        AigSellerListTableComponent,
        AigSellerNewUpdateFormComponent,
        AigFiscalTransactionListTableComponent,
        AigC6eGenericStatusPipe,
        AigBuyerListTableComponent,
    ],
})
export class AigCommonCommerceModule {}
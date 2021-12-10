import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AigMerchantListTableComponent } from './components/merchant-list-table/merchant-list-table.component';
import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AigMerchantNewUpdateFormComponent } from './components/merchant-new-update-form/merchant-new-update-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AigMerchantService } from './services/merchant.service';
import { AigWalletApiModule } from 'aig-wallet';
import { AigWalletNewUpdateFormComponent } from './components/wallet-new-update-form/wallet-new-update-form.component';
import { AigWalletListTableComponent } from './components/wallet-list-table/wallet-list-table.component';
import { WalletResolver } from './resolver/wallet.resolver';
import { CommonGenericModule } from '../generic/common-generic.module';
import { AigWalletAutocompleteDisplayService } from './services/autocomplete-function.service';
import { AigWalletAutocompleteFilterService } from './services/autocomplete-filter.service';
import { AigCreditCardListTableComponent } from './components/credit-card-list-table/credit-card-list-table.component';
import { AigCreditCardNewUpdateFormComponent } from './components/credit-card-new-update-form/credit-card-new-update-form.component';
import { AigTransactionListTableComponent } from './components/transaction-list-table/transaction-list-table.component';
import { AigTransactionNewUpdateFormComponent } from './components/transaction-new-update-form/transaction-new-update-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AigGiveHaveListTableComponent } from './components/give-have-list-table/give-have-list-table.component';
import { TransactionResolver } from './resolver/transaction.resolver';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,
        RouterModule,
		
		InputTextModule,
		FormsModule,
		ReactiveFormsModule,

		AigWalletApiModule,
		CommonGenericModule,

		TranslateModule,

		MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
        MatAutocompleteModule,
		MatDatepickerModule,
		MatNativeDateModule,
		
	],
	providers: [
		AigWalletAutocompleteDisplayService,
		AigWalletAutocompleteFilterService,

		AigMerchantService,
		WalletResolver,
		TransactionResolver,
	],
	declarations: [
		AigMerchantListTableComponent,	
		AigMerchantNewUpdateFormComponent,

		AigWalletListTableComponent,
		AigWalletNewUpdateFormComponent,

		AigCreditCardListTableComponent,
		AigCreditCardNewUpdateFormComponent,

		AigTransactionListTableComponent,
		AigTransactionNewUpdateFormComponent,

		AigGiveHaveListTableComponent,


		
	],
	exports: [
		AigMerchantListTableComponent,
		AigMerchantNewUpdateFormComponent,

		AigWalletListTableComponent,
		AigWalletNewUpdateFormComponent,

		AigCreditCardListTableComponent,
		AigCreditCardNewUpdateFormComponent,

		AigTransactionListTableComponent,
		AigTransactionNewUpdateFormComponent,

		AigGiveHaveListTableComponent,


	],
	
})
export class AigCommonWalletModule {}
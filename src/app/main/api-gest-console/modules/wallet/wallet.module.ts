import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigMerchantListPageComponent } from './components/merchant-list-page/merchant-list-page.component';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { TranslateModule } from '@ngx-translate/core';
import { AigMerchantNewUpdateDialogComponent } from './components/merchant-new-update-dialog/merchant-new-update-dialog.component';
import { AigCommonWalletModule } from 'aig-common/modules/wallet/common-wallet.module';
import { walletRoute } from './wallet.route';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AigWalletNewUpdateDialogComponent } from './components/wallet-new-update-dialog/wallet-new-update-dialog.component';
import { AigWalletListPageComponent } from './components/wallet-list-page/wallet-list-page.component';
import { AigWalletDetailPageComponent } from './components/wallet-detail-page/wallet-detail-page.component';
import { AigCreditCardNewUpdateDialogComponent } from './components/credit-card-new-update-dialog/credit-card-new-update-dialog.component';
import { AigCreditCardListPageComponent } from './components/credit-card-list-page/credit-card-list-page.component';
import { AigTransactionListPageComponent } from './components/transaction-list-page/transaction-list-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';
import { AigTransactionDetailPageComponent } from './components/transaction-detail-page/transaction-detail-page.component';
import { AigTransactionNewDialogComponent } from './components/transaction-new-dialog/transaction-new-dialog.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(walletRoute),

		CommonModule,
		AigCommonWalletModule,
		CommonGenericModule,
		
		InputTextModule,
		FormsModule,
		ReactiveFormsModule,

		FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,

		TranslateModule,

		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatDialogModule,
		MatAutocompleteModule,
		MatPaginatorModule,


	],
	providers: [

	],
	declarations: [
		AigMerchantListPageComponent,
		AigMerchantNewUpdateDialogComponent,

		AigWalletListPageComponent,
		AigWalletDetailPageComponent,
		AigWalletNewUpdateDialogComponent,

		AigCreditCardListPageComponent,
		AigCreditCardNewUpdateDialogComponent,

		AigTransactionListPageComponent,
		AigTransactionDetailPageComponent,

		AigTransactionNewDialogComponent

	],
	entryComponents: [
		AigMerchantNewUpdateDialogComponent,
		AigWalletNewUpdateDialogComponent,
		AigCreditCardNewUpdateDialogComponent,
		AigTransactionNewDialogComponent,
	],
})
export class AigWalletModule {}
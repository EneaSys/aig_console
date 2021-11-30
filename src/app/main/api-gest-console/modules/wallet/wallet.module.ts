import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigMerchantListPageComponent } from './components/merchant-list-page/merchant-list-page.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { TranslateModule } from '@ngx-translate/core';
import { AigMerchantNewUpdateDialogComponent } from './components/merchant-new-update-dialog/merchant-new-update-dialog.component';
import { AigCommonWalletModule } from 'aig-common/modules/wallet/common-wallet.module';
import { walletRoute } from './wallet.route';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [ 
		RouterModule.forChild(walletRoute),

		CommonModule,
		AigCommonWalletModule,
		
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
		
	],
	providers: [

	],
	declarations: [
		AigMerchantListPageComponent,
		AigMerchantNewUpdateDialogComponent,

	],
	entryComponents: [
		AigMerchantNewUpdateDialogComponent,

	],
})
export class AigWalletModule {}
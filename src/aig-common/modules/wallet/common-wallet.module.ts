import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AigMerchantListTableComponent } from './components/merchant-list-table/merchant-list-table.component';
import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AigMerchantNewUpdateFormComponent } from './components/merchant-new-update-form/merchant-new-update-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AigMerchantService } from './services/merchant.service';
import { AigWalletApiModule } from 'aig-wallet';

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

		TranslateModule,

		MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
        MatAutocompleteModule,
	],
	providers: [
		AigMerchantService,
	],
	declarations: [
		AigMerchantListTableComponent,	
		AigMerchantNewUpdateFormComponent,

	],
	exports: [
		AigMerchantListTableComponent,
		AigMerchantNewUpdateFormComponent,

	],
	
})
export class AigCommonWalletModule {}
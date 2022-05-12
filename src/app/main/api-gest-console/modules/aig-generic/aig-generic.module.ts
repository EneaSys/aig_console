import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { aigGenericRoute } from './aig-generic.route';
import { AigGenericHeaderComponent } from './components/generic-header/generic-header.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { AigEopooListPageComponent } from './components/eopoo-list-page/eopoo-list-page.component';
import { FuseSidebarModule } from '@fuse/components';
import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';
import { AigEopooNewModalComponent } from './components/eopoo-new-modal/eopoo-new-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AigEopooTypeListPageComponent } from './components/eopoo-type-list-page/eopoo-type-list-page.component';
import { AigGenericClientModule } from 'aig-generic';
import { AigEopooTypeDetailPageComponent } from './components/eopoo-type-detail-page/eopoo-type-detail-page.component';
import { AigEopooTypeNewUpdateModalComponent } from './components/eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { AigEopooDetailPageComponent } from './components/eopoo-detail-page/eopoo-detail-page.component';
import { AigAddressNewUpdateModalComponent } from './components/address-new-update-modal/address-new-update-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { AigGenericEopooListPageComponent } from './components/generic-eopoo-list-page/generic-eopoo-list-page.component';
import { AigGenericEopooNewUpdateDialogComponent } from './components/generic-eopoo-new-update-dialog/generic-eopoo-new-update-dialog.component';
import { AigAddressListPageComponent } from './components/address-list-page/address-list-page.component';
import { AigAddressDetailPageComponent } from './components/address-detail-page/address-detail-page.component';
import { GenericEopooDetailPageComponent } from './components/generic-eopoo-detail-page/generic-eopoo-detail-page.component';
import { AigReferentListPageComponent } from './components/referent-list-page/referent-list-page.component';
import { AigReferentNewUpdateDialogComponent } from './components/referent-new-update-dialog/referent-new-update-dialog.component';
import { AigReferentDetailPageComponent } from './components/referent-detail-page/referent-detail-page.component';
import { AigContactListPageComponent } from './components/contact-list-page/contact-list-page.component';
import { AigContactNewUpdateDialogComponent } from './components/contact-new-update-dialog/contact-new-update-dialog.component';
import { AigContactDetailPageComponent } from './components/contact-detail-page/contact-detail-page.component';
import { AigCommonWalletModule } from 'aig-common/modules/wallet/common-wallet.module';
import { AigFormTypeListPageComponent } from './components/form-type-list-page/form-type-list-page.component';
import { AigFormTypeNewUpdateDialogComponent } from './components/form-type-new-update-dialog/form-type-new-update-dialog.component';
import { AigFormDataNewUpdateDialogComponent } from './components/form-data-new-update-dialog/form-data-new-update-dialog.component';
import { AigFormDataListPageComponent } from './components/form-data-list-page/form-data-list-page.component';
import { AigFormDataDetailPageComponent } from './components/form-data-detail-page/form-data-detail-page.component';
import { AigFormDataDetailPage3Component } from './components/form-data-detail-page-3/form-data-detail-page-3.component';
import { AigFormDataDetailPage2Component } from './components/form-data-detail-page-2/form-data-detail-page-2.component';
import { AigFormDataDetailPage4Component } from './components/form-data-detail-page-4/form-data-detail-page-4.component';

@NgModule({
    imports: [
        RouterModule.forChild(aigGenericRoute),

        CommonGenericModule,

        AigGenericClientModule,
		AigCommonWalletModule,

        FormsModule,
        ReactiveFormsModule,

        FuseSharedModule,
        FuseSidebarModule,

        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
		
		MatNativeDateModule,
    ],
    declarations: [
        AigGenericHeaderComponent,

        AigEopooListPageComponent,
        AigEopooDetailPageComponent,
        AigEopooNewModalComponent,

        AigEopooTypeListPageComponent,
        AigEopooTypeDetailPageComponent,
        AigEopooTypeNewUpdateModalComponent,

        AigGenericEopooListPageComponent,
        GenericEopooDetailPageComponent,
        AigGenericEopooNewUpdateDialogComponent,

        AigAddressListPageComponent,
        AigAddressDetailPageComponent,
        AigAddressNewUpdateModalComponent,

        AigReferentListPageComponent,
        AigReferentDetailPageComponent,
        AigReferentNewUpdateDialogComponent,

        AigContactListPageComponent,
        AigContactDetailPageComponent,
        AigContactNewUpdateDialogComponent,

		AigFormTypeListPageComponent,
		AigFormTypeNewUpdateDialogComponent,

        AigFormDataNewUpdateDialogComponent,
		AigFormDataListPageComponent,
		AigFormDataDetailPageComponent,

		AigFormDataDetailPage3Component,
		AigFormDataDetailPage2Component,
		AigFormDataDetailPage4Component,

    ],
    entryComponents: [
        AigEopooNewModalComponent,
        AigEopooTypeNewUpdateModalComponent,
        AigGenericEopooNewUpdateDialogComponent,
        AigAddressNewUpdateModalComponent,
        AigReferentNewUpdateDialogComponent,
        AigContactNewUpdateDialogComponent,
		AigFormTypeNewUpdateDialogComponent,
		AigFormDataNewUpdateDialogComponent,
    ],
    exports: [

    ],
    providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' },

    ],
})
export class AigGenericModule {}
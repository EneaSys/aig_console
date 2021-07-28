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
import { MatAutocompleteModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
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
import { EnzoAddressDetailPageComponent } from './components/address-detail-page copy/address-detail-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { AgalGenericModule} from '@agal-generic/agal-generic.module';


@NgModule({
    imports: [
        RouterModule.forChild(aigGenericRoute),

        CommonGenericModule,

        AigGenericClientModule,

        FormsModule,
        ReactiveFormsModule,

        FuseSharedModule,
        FuseSidebarModule,

        TranslateModule,
        AgalGenericModule,

        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDialogModule,
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
        EnzoAddressDetailPageComponent,
      

        AigReferentListPageComponent,
        AigReferentDetailPageComponent,
        AigReferentNewUpdateDialogComponent,

        AigContactListPageComponent,
        AigContactDetailPageComponent,
        AigContactNewUpdateDialogComponent,
    ],
    entryComponents: [
        AigEopooNewModalComponent,
        AigEopooTypeNewUpdateModalComponent,
        AigGenericEopooNewUpdateDialogComponent,
        AigAddressNewUpdateModalComponent,
        AigReferentNewUpdateDialogComponent,
        AigContactNewUpdateDialogComponent,
    ],
    exports: [

    ],
    providers: [

    ],
})
export class AigGenericModule {}
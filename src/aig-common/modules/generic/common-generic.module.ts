import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigEopooListTableComponent } from './components/eopoo-list-table/eopoo-list-table.component';
import { AigCommonModule } from 'aig-common/common.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EopooNamePipe } from './pipe/eopoo-name.pipe';
import { AigEopooNewFormComponent } from './components/eopoo-new-form/eopoo-new-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AigEopooTypeListTableComponent } from './components/eopoo-type-list-table/eopoo-type-list-table.component';
import { AigGenericClientModule } from 'aig-generic';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EopooTypeResolver } from './resolver/eopoo-type.resolver';
import { RouterModule } from '@angular/router';
import { AigEopooTypeNewUpdateFormComponent } from './components/eopoo-type-new-update-form/eopoo-type-new-update-form.component';
import { MatInputModule } from '@angular/material/input';
import { EopooResolver } from './resolver/eopoo.resolver';
import { AigCommonStandardModule } from '../standard/common-standard.module';
import { AigAddressNewUpdateFormComponent } from './components/address-new-update-form/address-new-update-form.component';
import { AigSolidaretyApiModule } from 'aig-solidarety'; 
import { AigGenericAutocompleteFilterService } from './services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from './services/form/autocomplete-function.service';
import { MatMenuModule } from '@angular/material';
import { AigGenericEopooListTableComponent } from './components/generic-eopoo-list-table/generic-eopoo-list-table.component';
import { AigGenericEopooNewUpdateFormComponent } from './components/generic-eopoo-new-update-form/generic-eopoo-new-update-form.component';
import { AigAddressEntityDetailComponent } from './components/address-entity-detail/address-entity-detail.component';
import { AigAddressListTableComponent } from './components/address-list-table/address-list-table.component';
import { AigGenericEopooEntityDetailComponent } from './components/generic-eopoo-entity-detail/generic-eopoo-entity-detail.component';
import { AigEopooEntityDetailComponent } from './components/eopoo-entity-detail/eopoo-entity-detail.component';
import { AigEopooTypeEntityDetailComponent } from './components/eopoo-type-entity-detail/eopoo-type-entity-detail.component';
import { AigReferentListTableComponent } from './components/referent-list-table/referent-list-table.component';
import { AigReferentEntityDetailComponent } from './components/referent-entity-detail/referent-entity-detail.component';
import { AigReferentNewUpdateFormComponent } from './components/referent-new-update-form/referent-new-update-form.component';
import { AigContactListTableComponent } from './components/contact-list-table/contact-list-table.component';
import { AigContactEntityDetailComponent } from './components/contact-entity-detail/contact-entity-detail.component';
import { AigContactNewUpdateFormComponent } from './components/contact-new-update-form/contact-new-update-form.component';
import { AigPersonNewUpdateFormComponent } from './components/person-new-update-form/person-new-update-form.component';
import { AddressResolver } from './resolver/address.resolver';
import { ReferentResolver } from './resolver/referent.resolver';
import { ContactResolver } from './resolver/contact.resolver';
import { AigFormTypeListTableComponent } from './components/form-type-list-table/form-type-list-table.component';
import { AigFormTypeNewUpdateFormComponent } from './components/form-type-new-update-form/form-type-new-update-form.component';
import { AigFormDataListTableComponent } from './components/form-data-list-table/form-data-list-table.component';
import { AigFormDataNewUpdateFormComponent } from './components/form-data-new-update-form/form-data-new-update-form.component';

@NgModule({
    imports: [
        AigCommonModule,
        AigCommonStandardModule,
        CommonModule,
        AigSolidaretyApiModule,

        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        AigGenericClientModule,

        FlexLayoutModule,
        RouterModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMenuModule,


    ],
    declarations: [
        EopooNamePipe,
        
        AigEopooListTableComponent,
        AigEopooNewFormComponent,
        AigEopooEntityDetailComponent,
        
        AigAddressListTableComponent,
        AigAddressNewUpdateFormComponent,
        AigAddressEntityDetailComponent,
        
        AigEopooTypeListTableComponent,
        AigEopooTypeNewUpdateFormComponent,
        AigEopooTypeEntityDetailComponent,

        AigGenericEopooListTableComponent,
        AigGenericEopooNewUpdateFormComponent,
        AigGenericEopooEntityDetailComponent,

        AigReferentListTableComponent,
        AigReferentNewUpdateFormComponent,
        AigReferentEntityDetailComponent,

        AigContactListTableComponent,
        AigContactNewUpdateFormComponent,
        AigContactEntityDetailComponent,

        AigPersonNewUpdateFormComponent,

		AigFormTypeListTableComponent,
		AigFormTypeNewUpdateFormComponent,

		AigFormDataListTableComponent,
		AigFormDataNewUpdateFormComponent
    ],
    providers: [
        EopooResolver,
        EopooTypeResolver,
        AddressResolver,
        ReferentResolver,
        ContactResolver,
        
        AigGenericAutocompleteFilterService,
        AigGenericAutocompleteDisplayService,
    ],
    exports: [
        EopooNamePipe,
        
        AigEopooListTableComponent,
        AigEopooNewFormComponent,
        AigEopooEntityDetailComponent,

        AigAddressListTableComponent,
        AigAddressNewUpdateFormComponent,
        AigAddressEntityDetailComponent,

        AigEopooTypeListTableComponent,
        AigEopooTypeNewUpdateFormComponent,
        AigEopooTypeEntityDetailComponent,

        AigGenericEopooListTableComponent,
        AigGenericEopooNewUpdateFormComponent,
        AigGenericEopooEntityDetailComponent,

        AigReferentListTableComponent,
        AigReferentNewUpdateFormComponent,
        AigReferentEntityDetailComponent,

        AigContactListTableComponent,
        AigContactNewUpdateFormComponent,
        AigContactEntityDetailComponent,

        AigPersonNewUpdateFormComponent,

		AigFormTypeListTableComponent,
		AigFormTypeNewUpdateFormComponent,

		AigFormDataListTableComponent,
		AigFormDataNewUpdateFormComponent,
    ],
})
export class CommonGenericModule {}
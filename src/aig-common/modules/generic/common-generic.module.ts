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
import { AigEopooGenericNewUpdateFormComponent } from './components/eopoo-form/eopoo-generic-new-update-form/eopoo-generic-new-update-form.component';
import { AigEopooPersonNewUpdateFormComponent } from './components/eopoo-form/eopoo-person-new-update-form/eopoo-person-new-update-form.component';
import { EopooResolver } from './resolver/eopoo.resolver';
import { AigCommonStandardModule } from '../standard/common-standard.module';
import { AigEopooAddressListTableComponent } from './components/address-list-table/address-list-table.component';
import { AigAddressNewUpdateFormComponent } from './components/address-new-update-form/address-new-update-form.component';

@NgModule({
    imports: [
        AigCommonModule,
        AigCommonStandardModule,
        CommonModule,

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


    ],
    providers: [
        EopooResolver,
        EopooTypeResolver,
    ],
    declarations: [
        EopooNamePipe,
        
        AigEopooListTableComponent,
        AigEopooNewFormComponent,
        AigEopooGenericNewUpdateFormComponent,
        AigEopooPersonNewUpdateFormComponent,
        
        AigEopooAddressListTableComponent,
        AigAddressNewUpdateFormComponent,
        
        AigEopooTypeListTableComponent,
        AigEopooTypeNewUpdateFormComponent,
    ],
    exports: [
        EopooNamePipe,
        
        AigEopooListTableComponent,
        AigEopooNewFormComponent,
        AigEopooGenericNewUpdateFormComponent,
        AigEopooPersonNewUpdateFormComponent,

        AigEopooAddressListTableComponent,
        AigAddressNewUpdateFormComponent,

        AigEopooTypeListTableComponent,
        AigEopooTypeNewUpdateFormComponent,
    ],
})
export class CommonGenericModule {}
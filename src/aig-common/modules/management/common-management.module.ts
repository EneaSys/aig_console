import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { AigContextTableComponent } from './components/context-table/context-table.component';
import { AigRoleTableComponent } from './components/role-table/role-table.component';
import { MatButtonModule } from '@angular/material/button';
import { AigPermissionTableComponent } from './components/permission-table/permission-table.component';
import { AigCommonModule } from '../../common.module';
import { AigRoleNewFormComponent } from './components/role-new-form/role-new-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AigPermissionNewFormComponent } from './components/permission-new-form/permission-new-form.component';
import { AigAssociateRolePermissionFormComponent } from './components/associate-role-permission-form/associate-role-permission-form.component';
import { AigManagementAutocompleteFilterService } from './services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from './services/form/autocomplete-function.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        AigCommonModule,
        
        CommonModule,

        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        MatTableModule,
        MatProgressSpinnerModule,

        MatButtonModule,
        MatIconModule,
        
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        
        FlexLayoutModule,
        
    ],
    declarations: [
        AigContextTableComponent,
        AigRoleTableComponent,
        AigPermissionTableComponent,

        AigRoleNewFormComponent,
        AigPermissionNewFormComponent,
        AigAssociateRolePermissionFormComponent,
    ],
    exports: [
        AigContextTableComponent,
        AigRoleTableComponent,
        AigPermissionTableComponent,

        AigRoleNewFormComponent,
        AigPermissionNewFormComponent,
        AigAssociateRolePermissionFormComponent,
    ],
    providers: [
        AigManagementAutocompleteFilterService,
        AigManagementAutocompleteFunctionService,

    ],
})
export class AigCommonManagementModule {}
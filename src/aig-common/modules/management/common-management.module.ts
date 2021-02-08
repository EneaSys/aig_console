import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


import { AigCommonModule } from '../../common.module';
import { AigContextTableComponent } from './components/context-table/context-table.component';
import { AigRoleTableComponent } from './components/role-table/role-table.component';
import { AigPermissionTableComponent } from './components/permission-table/permission-table.component';
import { AigRoleNewFormComponent } from './components/role-new-form/role-new-form.component';
import { AigPermissionNewFormComponent } from './components/permission-new-form/permission-new-form.component';
import { AigAssociateRolePermissionFormComponent } from './components/associate-role-permission-form/associate-role-permission-form.component';
import { AigManagementAutocompleteFilterService } from './services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from './services/form/autocomplete-function.service';
import { AigTenantContextListTableComponent } from './components/tenant-context-list-table/tenant-context-list-table.component';
import { RouterModule } from '@angular/router';
import { AigApplicationModuleListTableComponent } from './components/application-module-table/application-module-list-table.component';
import { AigContextModuleListTableComponent } from './components/context-module-list-table/context-module-list-table.component';
import { AigApplicationModuleNewUpdateFormComponent } from './components/application-module-new-update-form/application-module-new-update-form.component';
import { AigTenantContextResolver } from './resolver/tenant-context.resolver';
import { AigApplicationModuleResolver } from './resolver/application-module.resolver';

@NgModule({
    imports: [
        AigCommonModule,
		
		RouterModule,
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

        AigApplicationModuleListTableComponent,
        AigApplicationModuleNewUpdateFormComponent,
        
        AigRoleNewFormComponent,
        AigPermissionNewFormComponent,
		AigAssociateRolePermissionFormComponent,
		
        AigTenantContextListTableComponent,
        AigContextModuleListTableComponent,
    ],
	exports: [
        AigContextTableComponent,
        AigRoleTableComponent,
        AigPermissionTableComponent,

        AigApplicationModuleListTableComponent,
        AigApplicationModuleNewUpdateFormComponent,
        
        AigRoleNewFormComponent,
        AigPermissionNewFormComponent,
		AigAssociateRolePermissionFormComponent,
		
        AigTenantContextListTableComponent,
        AigContextModuleListTableComponent,
    ],
    providers: [
        AigManagementAutocompleteFilterService,
        AigManagementAutocompleteFunctionService,

		AigTenantContextResolver,
        AigApplicationModuleResolver,
    ],
})
export class AigCommonManagementModule {}
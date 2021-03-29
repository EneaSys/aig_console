import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatTableModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AigCommonModule } from "aig-common/common.module";
import { AigApplicationModuleListTableComponent } from "./components/application-module-list-table/application-module-list-table.component";
import { AigApplicationModuleNewUpdateFormComponent } from "./components/application-module-new-update-form/application-module-new-update-form.component";
import { AigAssociateRolePermissionFormComponent } from "./components/associate-role-permission-new-update-form/associate-role-permission-form.component";
import { AigContextModuleListTableComponent } from "./components/context-module-list-table/context-module-list-table.component";
import { AigContextModuleNewUpdateFormComponent } from "./components/context-module-new-update-form/context-module-new-update-form.component";
import { AigContextUserListTableComponent } from "./components/context-user-list-table/context-user-list-table.component";
import { AigContextUserNewUpdateFormComponent } from "./components/context-user-new-update-form/context-user-new-update-form.component";
import { AigEntityReferenceListTableComponent } from "./components/entity-reference-list-table/entity-reference-list-table.component";
import { AigEntityReferenceNewUpdateFormComponent } from "./components/entity-reference-new-update-form/entity-reference-new-update-form.component";
import { AigPermissionListTableComponent } from "./components/permission-list-table/permission-list-table.component";
import { AigPermissionNewUpdateFormComponent } from "./components/permission-new-update-form/permission-new-update-form.component";
import { AigPersonalizationListTableComponent } from "./components/personalization-list-table/personalization-list-table.component";
import { AigPersonalizationNewUpdateFormComponent } from "./components/personalization-new-update-form/personalization-new-update-form.component";
import { AigRoleListTableComponent } from "./components/role-list-table/role-list-table.component";
import { AigRoleNewUpdateFormComponent } from "./components/role-new-update-form/role-new-update-form.component";
import { AigTenantContextListTableComponent } from "./components/tenant-context-list-table/tenant-context-list-table.component";
import { AigTenantContextNewUpdateFormComponent } from "./components/tenant-context-new-update-form/tenant-context-new-update-form.component";
import { AigApplicationModuleResolver } from "./resolver/application-module.resolver";
import { AigContextModuleResolver } from "./resolver/context-module.resolver";
import { AigContextUserResolver } from "./resolver/context-user.resolver";
import { AigEntityReferenceResolver } from "./resolver/entity-reference.resolver";
import { AigPermissionResolver } from "./resolver/permission.resolver";
import { AigPersonalizationResolver } from "./resolver/personalization.resolver";
import { AigRoleResolver } from "./resolver/role.resolver";
import { AigTenantContextResolver } from "./resolver/tenant-context.resolver";
import { AigManagementAutocompleteFilterService } from "./services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "./services/form/autocomplete-function.service";


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
        MatMenuModule,
        FlexLayoutModule,

    ],
	declarations: [
        AigApplicationModuleListTableComponent,
        AigApplicationModuleNewUpdateFormComponent,

        AigContextModuleListTableComponent,
        AigContextModuleNewUpdateFormComponent,

        AigContextUserListTableComponent,
        AigContextUserNewUpdateFormComponent,

        AigEntityReferenceListTableComponent,
        AigEntityReferenceNewUpdateFormComponent,

        AigPermissionListTableComponent,
        AigPermissionNewUpdateFormComponent,

        AigPersonalizationListTableComponent,
        AigPersonalizationNewUpdateFormComponent,

        AigRoleListTableComponent, 
        AigRoleNewUpdateFormComponent,

        AigTenantContextListTableComponent,
        AigTenantContextNewUpdateFormComponent,
        
		AigAssociateRolePermissionFormComponent, 
    ],
	exports: [
        AigApplicationModuleListTableComponent,
        AigApplicationModuleNewUpdateFormComponent,

        AigContextModuleListTableComponent,
        AigContextModuleNewUpdateFormComponent,

        AigContextUserListTableComponent,
        AigContextUserNewUpdateFormComponent,

        AigEntityReferenceListTableComponent,
        AigEntityReferenceNewUpdateFormComponent,

        AigPermissionListTableComponent,
        AigPermissionNewUpdateFormComponent,

        AigPersonalizationListTableComponent,
        AigPersonalizationNewUpdateFormComponent,

        AigRoleListTableComponent, 
        AigRoleNewUpdateFormComponent,

        AigTenantContextListTableComponent,
        AigTenantContextNewUpdateFormComponent,
        
		AigAssociateRolePermissionFormComponent,
    ],
    providers: [
        AigManagementAutocompleteFilterService,
        AigManagementAutocompleteFunctionService,
       

        AigApplicationModuleResolver,
		AigContextModuleResolver,
        AigContextUserResolver,        
        AigEntityReferenceResolver,
        AigPermissionResolver,
        AigPersonalizationResolver,
        AigRoleResolver,
        AigTenantContextResolver,
    ],
})
export class AigCommonManagementModule {}
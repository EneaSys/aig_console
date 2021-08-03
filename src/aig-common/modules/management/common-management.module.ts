import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatStepperModule, MatTableModule, MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AigCommonModule } from "aig-common/common.module";
import { CommonGenericModule } from "../generic/common-generic.module";
import { AigApplicationModuleListTableComponent } from "./components/application-module-list-table/application-module-list-table.component";
import { AigApplicationModuleNewUpdateFormComponent } from "./components/application-module-new-update-form/application-module-new-update-form.component";
import { AigAssociateRolePermissionFormComponent } from "./components/associate-role-permission-new-update-form/associate-role-permission-form.component";
import { AigContextModuleListTableComponent } from "./components/context-module-list-table/context-module-list-table.component";
import { AigContextModuleNewUpdateFormComponent } from "./components/context-module-new-update-form/context-module-new-update-form.component";
import { AigContextUserListTableComponent } from "./components/context-user-list-table/context-user-list-table.component";
import { AigContextUserNewUpdateFormComponent } from "./components/context-user-new-update-form/context-user-new-update-form.component";
import { AigEntityDetailRoleComponent } from "./components/entity-detail-role/entity-detail-role.component";
import { AigEntityDetailTenantContextComponent } from "./components/entity-detail-tenant-context/entity-detail-tenant-context.component";
import { AigEntityReferenceListTableComponent } from "./components/entity-reference-list-table/entity-reference-list-table.component";
import { AigEntityReferenceNewUpdateFormComponent } from "./components/entity-reference-new-update-form/entity-reference-new-update-form.component";
import { AigLicenceListTableComponent } from "./components/licence-list-table/licence-list-table.component";
import { AigLicenceNewUpdateFormComponent } from "./components/licence-new-update-form/licence-new-update-form.component";
import { AigPermissionListTableComponent } from "./components/permission-list-table/permission-list-table.component";
import { AigPermissionNewUpdateFormComponent } from "./components/permission-new-update-form/permission-new-update-form.component";
import { AigPersonalizationListTableComponent } from "./components/personalization-list-table/personalization-list-table.component";
import { AigPersonalizationNewUpdateFormComponent } from "./components/personalization-new-update-form/personalization-new-update-form.component";
import { AigRoleListTableComponent } from "./components/role-list-table/role-list-table.component";
import { AigRoleNewUpdateFormComponent } from "./components/role-new-update-form/role-new-update-form.component";
import { AigTenantContextListTableComponent } from "./components/tenant-context-list-table/tenant-context-list-table.component";
import { AigTenantContextNewUpdateFormComponent } from "./components/tenant-context-new-update-form/tenant-context-new-update-form.component";
import { AigUserLicenceListTableComponent } from "./components/user-licence-list-table/user-licence-list-table.component";
import { AigUserLicenceNewUpdateFormComponent } from "./components/user-licence-new-update-form/user-licence-new-update-form.component";
import { AigEntityDetailPermissionComponent } from "./entity-detail-permission/entity-detail-permission.component";
import { AigApplicationModuleResolver } from "./resolver/application-module.resolver";
import { AigContextModuleResolver } from "./resolver/context-module.resolver";
import { AigContextUserResolver } from "./resolver/context-user.resolver";
import { AigEntityReferenceResolver } from "./resolver/entity-reference.resolver";
import { AigLicenceResolver } from "./resolver/licence.resolver";
import { AigPermissionResolver } from "./resolver/permission.resolver";
import { AigPersonalizationResolver } from "./resolver/personalization.resolver";
import { AigRoleResolver } from "./resolver/role.resolver";
import { AigTenantContextResolver } from "./resolver/tenant-context.resolver";
import { AigUserLicenceResolver } from "./resolver/user-licence.resolver";
import { AigManagementAutocompleteFilterService } from "./services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "./services/form/autocomplete-function.service";


@NgModule({
    imports: [
        AigCommonModule,
        CommonModule,

        CommonGenericModule,
        
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        
        FlexLayoutModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatMenuModule,
    
    ],
	declarations: [

        AigUserLicenceListTableComponent,
        AigUserLicenceNewUpdateFormComponent,

        AigLicenceNewUpdateFormComponent,
        AigLicenceListTableComponent,

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
        AigEntityDetailRoleComponent,
        AigEntityDetailPermissionComponent,
        AigEntityDetailTenantContextComponent
    ],
	exports: [
        AigUserLicenceListTableComponent,
        AigUserLicenceNewUpdateFormComponent,
        
        AigLicenceNewUpdateFormComponent,
        AigLicenceListTableComponent,
        
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
        AigEntityDetailRoleComponent,
        AigEntityDetailPermissionComponent,
        AigEntityDetailTenantContextComponent
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
        AigLicenceResolver,
        AigUserLicenceResolver,
        AigTenantContextResolver,
    ],
})
export class AigCommonManagementModule {}
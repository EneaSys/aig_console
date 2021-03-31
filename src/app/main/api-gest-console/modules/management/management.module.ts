import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatToolbarModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { FuseSidebarModule } from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";
import { AigCommonModule } from "aig-common/common.module";
import { AigCommonManagementModule } from "aig-common/modules/management/common-management.module";
import { AigManagementApiModule } from "aig-management";
import { ApiGestModule } from "api-gest";
import { AigApplicationModuleDetailPageComponent } from "./components/application-module-detail-page/application-module-detail-page.component";
import { AigApplicationModuleListPageComponent } from "./components/application-module-list-page/application-module-list-page.component";
import { AigApplicationModuleNewUpdateModalComponent } from "./components/application-module-new-update-modal/application-module-new-update-modal.component";
import { AigAssociateRoleToPermissionDialogComponent } from "./components/associate-role-premission-dialog/associate-role-premission-dialog.component";
import { AigContextModuleDetailPageComponent } from "./components/context-module-detail-page/context-module-detail-page.component";
import { AigContextModuleListPageComponent } from "./components/context-module-list-page/context-module-list-page.component";
import { AigContextModuleNewUpdateModalComponent } from "./components/context-module-new-update-modal/context-module-new-update-modal.component";
import { AigContextUserDetailPageComponent } from "./components/context-user-detail-page/context-user-detail-page.component";
import { AigContextUserListPageComponent } from "./components/context-user-list-page/context-user-list-page.component";
import { AigContextUserNewUpdateModalComponent } from "./components/context-user-new-update-modal/context-user-new-update-modal.component";
import { AigEntityReferenceDetailPageComponent } from "./components/entity-reference-detail-page/entity-reference-detail-page.component";
import { AigEntityReferenceListPageComponent } from "./components/entity-reference-list-page/entity-reference-list-page.component";
import { AigEntityReferenceNewUpdateModalComponent } from "./components/entity-reference-new-update-modal/entity-reference-new-update-modal.component";
import { AigPermissionDetailPageComponent } from "./components/permission-detail-page/permission-detail-page.component";
import { AigPermissionListPageComponent } from "./components/permission-list-page/permission-list-page.component";
import { AigPermissionNewUpdateModalComponent } from "./components/permission-new-update-modal/permission-new-update-modal.component";
import { AigPersonalizationDetailPageComponent } from "./components/personalization-detail-page/personalization-detail-page.component";
import { AigPersonalizationListPageComponent } from "./components/personalization-list-page/personalization-list-page.component";
import { AigPersonalizationNewUpdateModalComponent } from "./components/personalization-new-update-modal/personalization-new-update-modal.component";
import { AigRoleDetailPageComponent } from "./components/role-detail-page/role-detail-page.component";
import { AigRoleListPageComponent } from "./components/role-list-page/role-list-page.component";
import { AigRoleNewUpdateModalComponent } from "./components/role-new-update-modal/role-new-update-modal.component";
import { AigTenantContextDetailPageComponent } from "./components/tenant-context-detail-page/tenant-context-detail-page.component";
import { AigTenantContextListPageComponent } from "./components/tenant-context-list-page/tenant-context-list-page.component";
import { AigTenantContextNewUpdateModalComponent } from "./components/tenant-context-new-update-modal/tenant-context-new-update-modal.component";
import { managementRoute } from "./management.route";


@NgModule({
    imports: [
		RouterModule.forChild(managementRoute),

        AigCommonModule,
        AigCommonManagementModule,

        AigManagementApiModule,

        FuseSharedModule,
        FuseSidebarModule,

        ApiGestModule,
        HttpClientModule,

        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatChipsModule,
        MatSnackBarModule,
        MatToolbarModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
    ],
    declarations: [
    
        AigApplicationModuleDetailPageComponent,
        AigApplicationModuleListPageComponent,
        AigApplicationModuleNewUpdateModalComponent,

        AigContextModuleDetailPageComponent,
        AigContextModuleListPageComponent,
        AigContextModuleNewUpdateModalComponent,

        AigContextUserDetailPageComponent,
        AigContextUserListPageComponent,
        AigContextUserNewUpdateModalComponent,
        
        AigEntityReferenceDetailPageComponent,
        AigEntityReferenceListPageComponent,
        AigEntityReferenceNewUpdateModalComponent,
       
        AigPermissionDetailPageComponent,
        AigPermissionListPageComponent,
        AigPermissionNewUpdateModalComponent,
        
        AigPersonalizationDetailPageComponent,
        AigPersonalizationListPageComponent,
        AigPersonalizationNewUpdateModalComponent,

        AigRoleDetailPageComponent,
        AigRoleListPageComponent,
        AigRoleNewUpdateModalComponent,              
        
		AigTenantContextDetailPageComponent,
        AigTenantContextListPageComponent,
        AigTenantContextNewUpdateModalComponent,       

        AigAssociateRoleToPermissionDialogComponent,
    ],
    exports: [ ],
    providers: [ ],
    entryComponents: [
        AigApplicationModuleNewUpdateModalComponent,
        AigContextModuleNewUpdateModalComponent,
        AigContextUserNewUpdateModalComponent,
        AigEntityReferenceNewUpdateModalComponent,
        AigPermissionNewUpdateModalComponent,
        AigPersonalizationNewUpdateModalComponent,
        AigRoleNewUpdateModalComponent, 
        AigTenantContextNewUpdateModalComponent,

        AigAssociateRoleToPermissionDialogComponent,
    ],
})
export class AigManagementModule {}
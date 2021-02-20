import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatToolbarModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { FuseSidebarModule } from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";
import { AigCommonModule } from "aig-common/common.module";
import { AigCommonManagementModule } from "aig-common/modules/management/common-management.module";
import { ApiGestModule } from "api-gest";
import { AigApplicationModuleDetailPageComponent } from "./components/application-module-detail-page/application-module-detail-page.component";
import { AigApplicationModuleListPageComponent } from "./components/application-module-list-page/application-module-list-page.component";
import { AigApplicationModuleNewUpdateModalComponent } from "./components/application-module-new-update-modal/application-module-new-update-modal.component";
import { AigAssociateRoleToPermissionDialogComponent } from "./components/associate-role-premission-dialog/associate-role-premission-dialog.component";
import { AigContextListPageComponent } from "./components/context-list-page/context-list-page.component";
import { AigContextModuleDetailPageComponent } from "./components/context-module-detail-page/context-module-detail-page.component";
import { AigContextModuleListPageComponent } from "./components/context-module-list-page/context-module-list-page-component";
import { AigContextModuleNewUpdateModalComponent } from "./components/context-module-new-update-modal/context-module-new-update-modal.component";
import { AigEntityReferenceDetailPageComponent } from "./components/entity-reference-detail-page/entity-reference-detail-page.component";
import { AigEntityReferenceListPageComponent } from "./components/entity-reference-list-page/entity-reference-list-page.component";
import { AigEntityReferenceNewUpdateModalComponent } from "./components/entity-reference-new-update-modal/entity-reference-new-update-modal.component";
import { AigManagementHeaderComponent } from "./components/management-header/management-header.component";
import { AigPermissionDetailPageComponent } from "./components/permission-detail-page/permission-detail-page.component";
import { AigPermissionListPageComponent } from "./components/permission-list-page/permission-list-page.component";
import { AigPermissionNewUpdateModalComponent } from "./components/permission-new-update-modal/permission-new-update-modal.component";
import { AigRoleDetailPageComponent } from "./components/role-detail-page/role-detail-page.component";
import { AigRoleListPageComponent } from "./components/role-list-page/role-list-page.component";
import { AigRoleNewUpdateModalComponent } from "./components/role-new-update-modal/role-new-update-modal.component";
import { AigTenantContextDetailPageComponent } from "./components/tenant-context-detail-page/tenant-context-detail-page.component";
import { AigTenantContextListPageComponent } from "./components/tenant-context-list-page/tenant-context-list-page.component";
import { AigTenantContextNewUpdateModalComponent } from "./components/tenant-context-new-update-dialog/tenant-context-new-update-dialog.component";
import { managementRoute } from "./management.route";

@NgModule({
    imports: [
		RouterModule.forChild(managementRoute),

        AigCommonModule,
        AigCommonManagementModule,

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
        AigManagementHeaderComponent,

        AigContextListPageComponent,

        AigAssociateRoleToPermissionDialogComponent,

        AigApplicationModuleListPageComponent,
        AigApplicationModuleNewUpdateModalComponent,
        AigApplicationModuleDetailPageComponent,

        AigEntityReferenceListPageComponent,
        AigEntityReferenceNewUpdateModalComponent,
        AigEntityReferenceDetailPageComponent,

        AigPermissionListPageComponent,
        AigPermissionNewUpdateModalComponent,
        AigPermissionDetailPageComponent,

        AigRoleListPageComponent,
        AigRoleNewUpdateModalComponent,
        AigRoleDetailPageComponent,          
                
        AigContextModuleListPageComponent,
        AigContextModuleNewUpdateModalComponent, 
        AigContextModuleDetailPageComponent,

		AigTenantContextDetailPageComponent,
        AigTenantContextNewUpdateModalComponent,
        AigTenantContextListPageComponent,
    ],
    exports: [ ],
    providers: [ ],
    entryComponents: [
        AigAssociateRoleToPermissionDialogComponent,
        AigApplicationModuleNewUpdateModalComponent,
        AigEntityReferenceNewUpdateModalComponent,
        AigPermissionNewUpdateModalComponent,
        AigRoleNewUpdateModalComponent,        
        AigContextModuleNewUpdateModalComponent,        
        AigTenantContextNewUpdateModalComponent,
    ],
})
export class AigManagementModule {}
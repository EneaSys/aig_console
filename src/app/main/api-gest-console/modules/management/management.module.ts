import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ApiGestModule } from 'api-gest';

import { AigManagementHeaderComponent } from './components/management-header/management-header.component';
import { AigPermissionListPageComponent } from './components/permission-list-page/permission-list-page.component';
import { AigRoleDetailPageComponent } from './components/role-detail-page/role-page-detail.component';
import { AigRoleListPageComponent } from './components/role-list-page/role-list-page.component';
import { AigContextListPageComponent } from './components/context-list-page/context-list-page.component';
import { AigCommonModule } from 'aig-common/common.module';
import { AigCommonManagementModule } from 'aig-common/modules/management/common-management.module';
import { AigPermissionNewDialogComponent } from './components/permission-new-dialog/permission-new-dialog.component';
import { AigRoleNewDialogComponent } from './components/role-new-dialog/role-new-dialog.component';
import { AigAssociateRoleToPermissionDialogComponent } from './components/associate-role-premission-dialog/associate-role-premission-dialog.component';
import { AigTenantContextListPageComponent } from './components/tenant-context-list-page/tenant-context-list-page.component';
import { RouterModule } from '@angular/router';
import { managementRoute } from './management.route';
import { MatPaginatorModule } from '@angular/material';
import { AigApplicationModuleListPageComponent } from './components/application-module-list-page/application-module-list-page.component';

import { AigContextModuleListPageComponent } from './components/context-module-list-page/context-module-list-page-component';
import { AigApplicationModuleNewUpdateModalComponent } from './components/application-module-new-update-modal/application-module-new-update-modal.component';
import { AigTenantContextDetailPageComponent } from './components/tenant-context-detail-page/tenant-context-detail-page.component';
import { AigApplicationModuleDetailPageComponent } from './components/application-module-detail-page/application-module-detail-page.component';
import { AigTenantContextNewUpdateModalComponent } from './components/tenant-context-new-update-dialog/tenant-context-new-update-dialog.component';

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

        AigApplicationModuleListPageComponent,
        AigApplicationModuleNewUpdateModalComponent,
        AigApplicationModuleDetailPageComponent,

        AigContextListPageComponent,

        AigPermissionListPageComponent,

        AigRoleListPageComponent,
        AigRoleDetailPageComponent,
        
        AigPermissionNewDialogComponent,
        AigRoleNewDialogComponent,
		AigAssociateRoleToPermissionDialogComponent,
        AigTenantContextListPageComponent,
        AigContextModuleListPageComponent,

		AigTenantContextDetailPageComponent,
        AigTenantContextNewUpdateModalComponent,
    ],
    exports: [ ],
    providers: [ ],
    entryComponents: [
        AigPermissionNewDialogComponent,
        AigRoleNewDialogComponent,
        AigAssociateRoleToPermissionDialogComponent,
        AigApplicationModuleNewUpdateModalComponent,
        AigTenantContextNewUpdateModalComponent,
    ],
})
export class AigManagementModule {}
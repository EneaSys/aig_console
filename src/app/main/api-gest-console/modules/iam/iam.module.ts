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
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';

import { ApiGestModule } from 'api-gest';

import { AigCommonModule } from 'aig-common/common.module';
import { AigCommonIamModule } from 'aig-common/modules/iam/common-iam.module';
import { AigCommonManagementModule } from 'aig-common/modules/management/common-management.module';


import { AigIamHeaderComponent } from './components/iam-header/iam-header.component';
import { AigUserListComponent } from './components/user-list/user-list.component';
import { AigUserGroupChipsComponent } from './components/usergroup-chips/usergroup-chips.component';
import { AigUserGroupChipsChildComponent } from './components/usergroup-chips/usergroup-chips-child.component';
import { AigGroupListComponent } from './components/group-list/group-list.component';
import { AigUserNewDialogComponent } from './components/user-new-dialog/user-new-dialog.component';
import { AigPermissionCustomNewDialogComponent } from './components/permission-custom-new-dialog/permission-custom-new-dialog.component';
import { AigUserDetailComponent } from './components/user-detail/user-detail.component';
import { AigGroupDetailComponent } from './components/group-detail/group-detail.component';
import { AigGroupNewDialogComponent } from './components/group-new-dialog/group-new-dialog.component';
import { AigRoleAssociateDialogComponent } from './components/role-associate-dialog/role-associate-dialog.component';
import { AigGroupAssociateDialogComponent } from './components/group-associate-dialog/group-associate-dialog.component';
import { AigCustomRolePageComponent } from './components/custom-role-page/custom-role-page.component';
import { AigRoleCustomNewDialogComponent } from './components/custom-role-new-dialog/custom-role-new-dialog.component';
import { AigRoleCustomDetailComponent } from './components/custom-role-detail-page/custom-role-detail-page.component';
import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';
import { AiguserEopooAssociateDialogComponent } from './components/user-eopoo-associate-dialog/user-eopoo-associate-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    imports: [
        AigCommonModule,
        AigCommonIamModule,
        AigCommonManagementModule,

        CommonGenericModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,

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
        MatAutocompleteModule,
        MatPaginatorModule,

    ],
    declarations: [
        //EXTERNAL
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,

        //INTERNAL
        AigIamHeaderComponent,

        AigCustomRolePageComponent,

        AigUserListComponent,
        AigUserNewDialogComponent,
        AigGroupListComponent,
        AigRoleCustomNewDialogComponent,
        AigRoleCustomDetailComponent,
        AigPermissionCustomNewDialogComponent,
        AigUserDetailComponent,
        AigGroupDetailComponent,
        AigGroupNewDialogComponent,
        AigRoleAssociateDialogComponent,
        AigGroupAssociateDialogComponent,
        AiguserEopooAssociateDialogComponent,

    ],
    entryComponents: [
        AigUserNewDialogComponent,
        AigRoleCustomNewDialogComponent,
        AigPermissionCustomNewDialogComponent,
        AigGroupNewDialogComponent,
        AigRoleAssociateDialogComponent,
        AigGroupAssociateDialogComponent,
        AiguserEopooAssociateDialogComponent,
    ],
    providers: [ ],
    exports: [
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,
    ],
})
export class AigIamModule {}
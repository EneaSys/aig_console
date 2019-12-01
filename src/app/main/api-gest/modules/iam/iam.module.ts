import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';

import { ApiGestModule, BASE_PATH } from 'api-gest';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AigCommonModule } from '../_common/common.module';
import { AigIamHeaderComponent } from './components/iam-header/iam-header.component';
import { AigUserListComponent } from './components/user-list/user-list.component';
import { AigUserGroupChipsComponent } from './components/usergroup-chips/usergroup-chips.component';
import { AigUserGroupChipsChildComponent } from './components/usergroup-chips/usergroup-chips-child.component';

import { AigGroupListComponent } from './components/group-list/group-list.component';
import { AigUserNewDialogComponent } from './components/user-new-dialog/user-new-dialog.component';
import { API_URL } from 'app/app.constants';
import { AigPermissionCustomNewDialogComponent } from './components/permission-custom-new-dialog/permission-custom-new-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AigUserDetailComponent } from './components/user-detail/user-detail.component';
import { AigGroupDetailComponent } from './components/group-detail/group-detail.component';
import { AigGroupNewDialogComponent } from './components/group-new-dialog/group-new-dialog.component';
import { AigRoleAssociateDialogComponent } from './components/role-associate-dialog/role-associate-dialog.component';
import { AigGroupAssociateDialogComponent } from './components/group-associate-dialog/group-associate-dialog.component';
import { AigCommonManagementModule } from '../_common/modules/management/common-management.module';
import { AigCustomRolePageComponent } from './components/custom-role-page/custom-role-page.component';
import { AigCommonIamModule } from '../_common/modules/iam/common-iam.module';
import { AigRoleCustomNewDialogComponent } from './components/custom-role-new-dialog/custom-role-new-dialog.component';
import { AigRoleCustomDetailComponent } from './components/custom-role-custom-detail/custom-role-custom-detail.component';

@NgModule({
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
        
    ],
    imports: [
        AigCommonModule,

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

        AigCommonIamModule,
        AigCommonManagementModule,
        
    ],
    exports: [
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,
    ],
    entryComponents:[
        AigUserNewDialogComponent,
        AigRoleCustomNewDialogComponent,
        AigPermissionCustomNewDialogComponent,
        AigGroupNewDialogComponent,
        AigRoleAssociateDialogComponent,
        AigGroupAssociateDialogComponent,
    ],
    providers: [
        { provide: BASE_PATH,  useValue: API_URL }
    ],
})
export class AigIamModule {}
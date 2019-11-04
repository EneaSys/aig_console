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


import { AigRoleListComponent } from './components/role/role-list.component';
import { AigCommonModule } from '../_common/common.module';
import { AigIamHeaderComponent } from './components/iam-header/iam-header.component';
import { AigUserListComponent } from './components/user-list/user-list.component';
import { AigUserTableComponent } from './components/user-table/user-table.component';
import { AigUserGroupChipsComponent } from './components/usergroup-chips/usergroup-chips.component';
import { AigUserGroupChipsChildComponent } from './components/usergroup-chips/usergroup-chips-child.component';

import { AigGroupListComponent } from './components/group-list/group-list.component';
import { AigGroupTableComponent } from './components/group-table/group-table.component';
import { AigUserNewComponent } from './components/user-new/user-new.component';
import { AigUserNewDialogComponent } from './components/user-new-dialog/user-new-dialog.component';
import { API_URL } from 'app/app.constants';
import { AigRoleSystemTableComponent } from './components/role-system-table/role-system-table.component';
import { AigRoleCustomTableComponent } from './components/role-custom-table/role-custom-table.component';
import { AigRoleCustomNewDialogComponent } from './components/role-new-dialog/role-new-dialog.component';
import { AigRoleCustomNewComponent } from './components/role-custom-new/role-custom-new.component';
import { AigRoleCustomDetailComponent } from './components/role-custom-detail/role-custom-detail.component';
import { AigRoleSystemDetailComponent } from './components/role-system-detail/role-system-detail.component';
import { AigPermissionSystemTableComponent } from './components/permission-system-table/permission-system-table.component';
import { AigPermissionCustomTableComponent } from './components/permission-custom-table/permission-custom-table.component';
import { AigPermissionCustomNewDialogComponent } from './components/permission-custom-new-dialog/permission-custom-new-dialog.component';
import { AigPermissionCustomNewComponent } from './components/permission-custom-new/permission-custom-new.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AigUserDetailComponent } from './components/user-detail/user-detail.component';
import { AigPermissionListComponent } from './components/permission-list/permission-list.component';
import { AigGroupDetailComponent } from './components/group-detail/group-detail.component';
import { AigRoleTableComponent } from './components/role-table/role-table.component';
import { AigGroupNewDialogComponent } from './components/group-new-dialog/group-new-dialog.component';
import { AigRoleAssociateDialogComponent } from './components/role-associate-dialog/role-associate-dialog.component';
import { AigGroupAssociateDialogComponent } from './components/group-associate-dialog/group-associate-dialog.component';
import { AigGroupAssociateComponent } from './components/group-associate/group-associate.component';

/*
export function apiConfigFactory (): Configuration => {
    const params: ConfigurationParameters = {
        basePath: ""
    }
    return new Configuration(params);
}
*/

@NgModule({
    declarations: [
        //EXTERNAL
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,
        AigUserNewComponent,
        AigRoleCustomNewComponent,
        AigPermissionCustomNewComponent,
        AigGroupAssociateComponent,
        

        //table
        AigUserTableComponent,
        AigGroupTableComponent,
        AigRoleSystemTableComponent,
        AigRoleCustomTableComponent,
        AigPermissionSystemTableComponent,
        AigPermissionCustomTableComponent,
        AigRoleTableComponent,

        //INTERNAL
        AigIamHeaderComponent,
        
        AigUserListComponent,
        AigUserNewDialogComponent,
        AigGroupListComponent,
        AigRoleListComponent,
        AigRoleCustomNewDialogComponent,
        AigRoleSystemDetailComponent,
        AigRoleCustomDetailComponent,
        AigPermissionCustomNewDialogComponent,
        AigUserDetailComponent,
        AigPermissionListComponent,
        AigGroupDetailComponent,
        AigGroupNewDialogComponent,
        AigRoleAssociateDialogComponent,
        AigGroupAssociateDialogComponent
        
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
        
    ],
    exports: [
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,
        AigUserNewComponent,
        AigRoleCustomNewComponent,
        AigPermissionCustomNewComponent,
        AigGroupAssociateComponent,

        AigUserTableComponent,
        AigGroupTableComponent,
        AigRoleSystemTableComponent,
        AigRoleCustomTableComponent,
        AigPermissionSystemTableComponent,
        AigPermissionCustomTableComponent,
        AigRoleTableComponent,
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
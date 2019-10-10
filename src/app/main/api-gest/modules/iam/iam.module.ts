import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

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
import { SERVER_API_URL } from 'app/app.constants';

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

        //table
        AigUserTableComponent,
        AigGroupTableComponent,

        //INTERNAL
        AigIamHeaderComponent,
        
        AigUserListComponent,
        AigUserNewDialogComponent,
        AigGroupListComponent,
        AigRoleListComponent,
        
    ],
    imports: [
        AigCommonModule,

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
        MatProgressSpinnerModule
        
    ],
    exports: [
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,
        AigUserNewComponent,

        AigUserTableComponent,
    ],
    entryComponents:[
        AigUserNewDialogComponent,
    ],
    providers: [
        { provide: BASE_PATH,  useValue: SERVER_API_URL }
    ],
})
export class AigIamModule {}
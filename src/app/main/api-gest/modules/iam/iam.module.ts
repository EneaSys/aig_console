import { NgModule } from '@angular/core';
import { AigRoleListComponent } from './components/role/role-list.component';
import { AigCommonModule } from '../_common/common.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AigIamHeaderComponent } from './components/iam-header/iam-header.component';
import { AigUserListComponent } from './components/user-list/user-list.component';
import { AigUserTableComponent } from './components/user-table/user-table.component';
import { AigUserGroupChipsComponent } from './components/usergroup-chips/usergroup-chips.component';
import { AigUserGroupChipsChildComponent } from './components/usergroup-chips/usergroup-chips-child.component';
import { MatChipsModule } from '@angular/material/chips';
import { AigGroupListComponent } from './components/group-list/group-list.component';
import { AigGroupTableComponent } from './components/group-table/group-table.component';

@NgModule({
    declarations: [
        //EXTERNAL
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,

        //table
        AigUserTableComponent,
        AigGroupTableComponent,

        //INTERNAL
        AigIamHeaderComponent,
        
        AigUserListComponent,
        AigGroupListComponent,
        AigRoleListComponent,
        
    ],
    imports: [
        AigCommonModule,

        FuseSharedModule,
        FuseSidebarModule,

        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatChipsModule,
        
    ],
    exports: [
        AigUserGroupChipsComponent,
        AigUserGroupChipsChildComponent,

        AigUserTableComponent,
    ],
    providers: [

    ],
})
export class AigIamModule {}
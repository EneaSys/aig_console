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

import { ApiGestModule, BASE_PATH } from 'api-gest';

import { API_URL } from 'app/app.constants';

import { AigCommonModule } from '../_common/common.module';
import { AigCommonManagementModule } from '../_common/modules/management/common-management.module';

import { AigManagementHeaderComponent } from './components/management-header/management-header.component';
import { AigPermissionListPageComponent } from './components/permission-list-page/permission-list-page.component';
import { AigRoleDetailPageComponent } from './components/role-detail-page/role-page-detail.component';
import { AigRoleListPageComponent } from './components/role-list-page/role-list-page.component';
import { AigContextListPageComponent } from './components/context-list-page/context-list-page.component';

@NgModule({
    declarations: [
        AigManagementHeaderComponent,

        AigContextListPageComponent,

        AigPermissionListPageComponent,

        AigRoleListPageComponent,
        AigRoleDetailPageComponent,
        
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
        MatProgressSpinnerModule,

        AigCommonManagementModule,
    ],
    exports: [ ],
    providers: [
        { provide: BASE_PATH,  useValue: API_URL }
    ],
})
export class AigManagementModule {}
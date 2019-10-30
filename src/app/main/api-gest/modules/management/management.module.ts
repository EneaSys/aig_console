import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ApiGestModule, BASE_PATH } from 'api-gest';
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

import { AigCommonModule } from '../_common/common.module';

import { AigContextListComponent } from './components/context-list/context-list.component';
import { AigManagementHeaderComponent } from './components/management-header/management-header.component';
import { API_URL } from 'app/app.constants';
import { AigContextTableComponent } from './components/context-table/context-table.component';


@NgModule({
    declarations: [
        AigContextTableComponent,

        AigManagementHeaderComponent,
        AigContextListComponent,
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
        AigContextTableComponent,
    ],
    providers: [
        { provide: BASE_PATH,  useValue: API_URL }
    ],
})
export class AigManagementModule {}
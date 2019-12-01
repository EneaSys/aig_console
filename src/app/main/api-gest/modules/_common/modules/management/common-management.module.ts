import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { AigContextTableComponent } from './components/context-table/context-table.component';
import { AigRoleTableComponent } from './components/role-table/role-table.component';
import { MatButtonModule } from '@angular/material/button';
import { AigPermissionTableComponent } from './components/permission-table/permission-table.component';

@NgModule({
    declarations: [
        AigContextTableComponent,
        AigRoleTableComponent,
        AigPermissionTableComponent,
    ],
    imports: [
        CommonModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        
    ],
    exports: [
        AigContextTableComponent,
        AigRoleTableComponent,
        AigPermissionTableComponent,
    ],
    providers: [],
})
export class AigCommonManagementModule {}
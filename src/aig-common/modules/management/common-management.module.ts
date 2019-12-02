import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { AigContextTableComponent } from './components/context-table/context-table.component';
import { AigRoleTableComponent } from './components/role-table/role-table.component';
import { MatButtonModule } from '@angular/material/button';
import { AigPermissionTableComponent } from './components/permission-table/permission-table.component';
import { AigCommonModule } from '../../common.module';
import { AigRoleNewFormComponent } from './components/role-new-form/role-new-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AigPermissionNewFormComponent } from './components/permission-new-form/permission-new-form.component';

@NgModule({
    imports: [
        AigCommonModule,
        
        CommonModule,

        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        MatTableModule,
        MatProgressSpinnerModule,

        MatButtonModule,
        MatIconModule,
        
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        
    ],
    declarations: [
        AigContextTableComponent,
        AigRoleTableComponent,
        AigPermissionTableComponent,

        AigRoleNewFormComponent,
        AigPermissionNewFormComponent,
    ],
    exports: [
        AigContextTableComponent,
        AigRoleTableComponent,
        AigPermissionTableComponent,

        AigRoleNewFormComponent,
        AigPermissionNewFormComponent,
    ],
    providers: [],
})
export class AigCommonManagementModule {}
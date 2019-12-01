import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigUserTableComponent } from './components/user-table/user-table.component';
import { AigGroupTableComponent } from './components/group-table/group-table.component';
import { AigRoleCustomTableComponent } from './components/role-custom-table/role-custom-table.component';
import { AigPermissionCustomTableComponent } from './components/permission-custom-table/permission-custom-table.component';
import { AigUserNewComponent } from './components/user-new/user-new.component';
import { AigRoleCustomNewComponent } from './components/role-custom-new/role-custom-new.component';
import { AigPermissionCustomNewComponent } from './components/permission-custom-new/permission-custom-new.component';
import { AigGroupAssociateComponent } from './components/group-associate/group-associate.component';
import { AigRoleAssociateComponent } from './components/role-associate/role-associate.component';
import { AigGroupNewComponent } from './components/group-new/group-new.component';
import { AigRoleAssociationTableComponent } from './components/role-association-table/role-association-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        AigUserTableComponent,
        AigGroupTableComponent,
        AigRoleCustomTableComponent,
        AigPermissionCustomTableComponent,
        AigRoleAssociationTableComponent,

        AigUserNewComponent,
        AigGroupNewComponent,
        AigRoleCustomNewComponent,
        AigPermissionCustomNewComponent,
        
        AigGroupAssociateComponent,
        AigRoleAssociateComponent,

    ],
    imports: [
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
    exports: [
        AigUserTableComponent,
        AigGroupTableComponent,
        AigRoleCustomTableComponent,
        AigPermissionCustomTableComponent,
        AigRoleAssociationTableComponent,

        AigUserNewComponent,
        AigGroupNewComponent,
        AigRoleCustomNewComponent,
        AigPermissionCustomNewComponent,
        
        AigGroupAssociateComponent,
        AigRoleAssociateComponent,

    ],
    providers: [],
})
export class AigCommonIamModule {}
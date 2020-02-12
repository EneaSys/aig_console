import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AigCommonModule } from '../../common.module';

import { AigRoleAssignationsToGroupsPipe, AigRoleAssignationToGroupPipe } from './pipe/role-assignation-to-group.pipe';
import { AigRoleAssignationsToUsersPipe, AigRoleAssignationToUserPipe } from './pipe/role-assignation-to-user.pipe';

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
import { AigAutocompleteFilterService } from './services/form/autocomplete-filter.service';
import { AigAutocompleteFunctionService } from './services/form/autocomplete-function.service';
import { AigValidatorService } from './services/form/validator.service';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        AigCommonModule,
        CommonModule,

        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        RouterModule,

        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,

        

    ],
    declarations: [
        AigRoleAssignationsToGroupsPipe,
        AigRoleAssignationToGroupPipe,
        AigRoleAssignationsToUsersPipe,
        AigRoleAssignationToUserPipe,
        
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
    exports: [
        AigRoleAssignationsToGroupsPipe,
        AigRoleAssignationToGroupPipe,
        AigRoleAssignationsToUsersPipe,
        AigRoleAssignationToUserPipe,
        
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
    providers: [
        AigAutocompleteFilterService,
        AigAutocompleteFunctionService,
        
        AigValidatorService,
    ],
})
export class AigCommonIamModule {}
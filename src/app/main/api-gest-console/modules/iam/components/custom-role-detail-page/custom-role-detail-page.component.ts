import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomRoleDTO, CustomRolePermissionDTO, RoleAssignationResourceService, RoleAssignationDTO, CustomRolePermissionResourceService } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigPermissionCustomNewDialogComponent } from '../permission-custom-new-dialog/permission-custom-new-dialog.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './custom-role-detail-page.component.html',
    styleUrls: ['./custom-role-detail-page.component.scss']
})
export class AigRoleCustomDetailComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private customRolePermissionResourceService: CustomRolePermissionResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    permissionsCustomDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName', 'buttons'];
    usersDisplayedColumns: string[] = ['usercode', 'email', 'type'];
    groupsDisplayedColumns: string[] = ['id', 'name'];
    
    permissionButtonConfig: any;

    customRole: CustomRoleDTO;
    permissionsRoleCustom: CustomRolePermissionDTO[];
    users: RoleAssignationDTO[];
    groups: RoleAssignationDTO[];

    permissionsRoleCustomError: any;
    usersError: any;
    groupsError: any;

    loadComponent(): void {
        this.customRole = this.route.snapshot.data.roleCustom;

        this.permissionButtonConfig = {
            details: false,
            removeFromCustomRole: this.customRole,
        }
        let destructor = null;
        
        destructor = this.customRolePermissionResourceService.getAllCustomRolePermissionsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.customRole.id, null, null, null, null, null, null, null, null, null)
            .subscribe(
                res => this.permissionsRoleCustom = res,
                error => this.permissionsRoleCustomError = error,
            );
        this._destructors.push(destructor);

        destructor = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET(this.customRole.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null)
            .subscribe(
                res => this.users = res,
                error => this.usersError = error,
            );
        this._destructors.push(destructor);


        destructor = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET(this.customRole.id, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
            .subscribe(
                res => this.groups = res,
                error => this.groupsError = error,
            );
        this._destructors.push(destructor);
    }

    newCustomPermission() {
        this.dialog.open(AigPermissionCustomNewDialogComponent, { data: this.customRole });
    }
}

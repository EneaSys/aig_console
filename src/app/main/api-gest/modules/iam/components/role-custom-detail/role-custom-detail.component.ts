import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomRoleDTO, CustomRolePermissionDTO, RoleAssignationResourceService, RoleAssignationDTO } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigPermissionCustomNewDialogComponent } from '../permission-custom-new-dialog/permission-custom-new-dialog.component';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './role-custom-detail.component.html',
    styleUrls: ['./role-custom-detail.component.scss']
})
export class AigRoleCustomDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private roleAssignationResourceService: RoleAssignationResourceService,
    ) { }

    permissionsCustomDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName', 'buttons'];
    usersDisplayedColumns: string[] = ['usercode', 'email', 'type'];
    groupsDisplayedColumns: string[] = ['id', 'name'];
    
    permissionButtonConfig: any;

    customRole: CustomRoleDTO;
    permissionsRoleCustom: CustomRolePermissionDTO[];
    users: Observable<RoleAssignationDTO[]>;
    groups: Observable<RoleAssignationDTO[]>;

    ngOnInit(): void {
        this.customRole = this.route.snapshot.data.roleCustom;
        this.permissionsRoleCustom = this.route.snapshot.data.permissionsRoleCustom;

        this.permissionButtonConfig = {
            details: false,
            removeFromCustomRole: this.customRole,
        }

        this.users = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, this.customRole.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null);
        this.groups = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, this.customRole.id, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    newCustomPermission() {
        this.dialog.open(AigPermissionCustomNewDialogComponent, { data: this.customRole });
    }
}

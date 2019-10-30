import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomRoleDTO, CustomRolePermissionDTO, RoleAssignationResourceService, RoleAssignationDTO } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigPermissionCustomNewDialogComponent } from '../permission-custom-new-dialog/permission-custom-new-dialog.component';

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

    permissionsCustomDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName'];
    permissionsRoleCustom: CustomRolePermissionDTO[];

    customRole: CustomRoleDTO;

    datasourceUser: any;
    datasourceGroup: any;

    ngOnInit(): void {
        this.customRole = this.route.snapshot.data.roleCustom;
        this.permissionsRoleCustom = this.route.snapshot.data.permissionsRoleCustom;

        this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, this.customRole.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null).subscribe(
            (value: RoleAssignationDTO[]) => {
                this.datasourceUser = value;
            }
        );

        this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, this.customRole.id, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).subscribe(
            (value: RoleAssignationDTO[]) => {
                this.datasourceGroup = value;
            }
        );
    }

    newCustomPermission() {
        this.dialog.open(AigPermissionCustomNewDialogComponent, { data: this.customRole });
    }
}

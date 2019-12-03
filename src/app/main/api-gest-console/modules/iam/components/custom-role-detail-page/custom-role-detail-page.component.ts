import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomRoleDTO, CustomRolePermissionDTO, RoleAssignationResourceService, RoleAssignationDTO, CustomRolePermissionResourceService } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigPermissionCustomNewDialogComponent } from '../permission-custom-new-dialog/permission-custom-new-dialog.component';
import { Observable } from 'rxjs';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    templateUrl: './custom-role-detail-page.component.html',
    styleUrls: ['./custom-role-detail-page.component.scss']
})
export class AigRoleCustomDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private customRolePermissionResourceService: CustomRolePermissionResourceService,
        private eventService: EventService,
    ) {
        this.eventService.reloadPage$.subscribe((data?: any) => {
            this.ngOnInit()
        });
    }

    permissionsCustomDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName', 'buttons'];
    usersDisplayedColumns: string[] = ['usercode', 'email', 'type'];
    groupsDisplayedColumns: string[] = ['id', 'name'];
    
    permissionButtonConfig: any;

    customRole: CustomRoleDTO;
    permissionsRoleCustom: Observable<CustomRolePermissionDTO[]>;
    users: RoleAssignationDTO[];
    groups: Observable<RoleAssignationDTO[]>;

    userTableError: any;

    ngOnInit(): void {
        this.customRole = this.route.snapshot.data.roleCustom;

        this.permissionButtonConfig = {
            details: false,
            removeFromCustomRole: this.customRole,
        }

        this.permissionsRoleCustom = this.customRolePermissionResourceService.getAllCustomRolePermissionsUsingGET("", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.customRole.id, null, null, null, null, null, null, null, null, null, null);
        this.roleAssignationResourceService.getAllRoleAssignationsUsingGET("", this.customRole.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null)
            .subscribe(
                res => this.users = res,
                err => this.userTableError = err,
            );

        this.groups = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET("", this.customRole.id, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    newCustomPermission() {
        this.dialog.open(AigPermissionCustomNewDialogComponent, { data: this.customRole });
    }
}

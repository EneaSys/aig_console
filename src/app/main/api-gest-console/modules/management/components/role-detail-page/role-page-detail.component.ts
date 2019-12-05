import { Component, OnInit } from '@angular/core';
import { RoleDTO, RoleAssignationResourceService, RoleAssignationDTO } from 'api-gest';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigAssociateRoleToPermissionDialogComponent } from '../associate-role-premission-dialog/associate-role-premission-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    templateUrl: './role-page-detail.component.html',
    styleUrls: ['./role-page-detail.component.scss']
})
export class AigRoleDetailPageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private eventService: EventService,
        private dialog: MatDialog,
    ) {
        this.eventService.reloadPage$.subscribe((data?: any) => this.ngOnInit());
    }

    permissionSystemDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName', 'buttons'];
    usersDisplayedColumns: string[] = ['usercode', 'email', 'type'];
    groupsDisplayedColumns: string[] = ['id', 'name'];

    role: RoleDTO;
    users: Observable<RoleAssignationDTO[]>;
    groups: Observable<RoleAssignationDTO[]>;

    ngOnInit(): void {
        this.role = this.route.snapshot.data.role;

        this.users = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET("", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.role.roleCode, null, null, null, null, null, 0, null, null, null, null, null, null);
        this.groups = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET("", null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.role.roleCode, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    addPermissionToRole(): void {
        this.dialog.open(AigAssociateRoleToPermissionDialogComponent, { data: { role: this.role } });
    }
}

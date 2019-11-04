import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RoleAssignationResourceService, ContextGroupDTO, ContextGroupResourceService, RoleAssignationDTO, UserResourceService, UserDTO } from 'api-gest';
import { Observable } from 'rxjs';
import { AigGroupAssociateDialogComponent } from '../group-associate-dialog/group-associate-dialog.component';
import { AigRoleAssociateDialogComponent } from '../role-associate-dialog/role-associate-dialog.component';

@Component({
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.scss']
})
export class AigGroupDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private userResourceService: UserResourceService,
        private contextGroupResourceService: ContextGroupResourceService,
    ) { }

    memberOfDisplayedColumns: string[] = ['name', 'buttons'];
    roleDisplayedColumns: string[] = ['id', 'type', 'name', 'buttons'];
    userDisplayedColumns: string[] = ['usercode', 'email', 'type',];
    membersDisplayedColumns: string[] = ['id', 'name'];

    group: ContextGroupDTO;
    roles: Observable<RoleAssignationDTO[]>;
    users: Observable<UserDTO[]>;
    groups: Observable<ContextGroupDTO[]>;

    ngOnInit(): void {
        this.group = this.route.snapshot.data.group;

        this.roles = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, null, null, null, null, null, null, null, this.group.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
        this.users = this.userResourceService.getAllUsersUsingGET({}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.group.id, null, null, null, null, null, null);
        this.groups = this.contextGroupResourceService.getAllContextGroupsUsingGET({}, this.group.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    associateToGroup() {
        this.dialog.open(AigGroupAssociateDialogComponent, { data: { groupChild: this.group } });
    }

    associateToRole() {
        this.dialog.open(AigRoleAssociateDialogComponent, { data: { group: this.group } });
    }
}

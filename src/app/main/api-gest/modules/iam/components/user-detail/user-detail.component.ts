import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO, ContextGroupDTO, RoleAssignationDTO, UserResourceService, RoleAssignationResourceService, ContextGroupResourceService } from 'api-gest';
import { Observable } from 'rxjs';
import { AigGroupAssociateDialogComponent } from '../group-associate-dialog/group-associate-dialog.component';
import { AigRoleAssociateDialogComponent } from '../role-associate-dialog/role-associate-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class AigUserDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private roleAssignationResourceService: RoleAssignationResourceService,
    ) { }

    memberOfDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    roleDisplayedColumns: string[] = ['id', 'type', 'name', 'buttons'];

    memberOfButtonConfig: any;
    roleButtonConfig: any;

    user: any; //UserDTO
    roles: Observable<RoleAssignationDTO[]>;

    ngOnInit(): void {
        this.user = this.route.snapshot.data.user;

        this.memberOfButtonConfig = {
            details: false,
            removeUserFromGroup: this.user,
        }

        this.roleButtonConfig = {
            details: true,
            removeFromUser: this.user,
        }

        this.roles = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.user.id, null, null, null, null, null, null)
    }

    associateToGroup() {
        this.dialog.open(AigGroupAssociateDialogComponent, { data: { user: this.user } });
    }

    associateToRole() {
        this.dialog.open(AigRoleAssociateDialogComponent, { data: { user: this.user } });
    }
}

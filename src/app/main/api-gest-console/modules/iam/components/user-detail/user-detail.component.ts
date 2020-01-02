import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleAssignationDTO, RoleAssignationResourceService } from 'api-gest';
import { Observable } from 'rxjs';
import { AigGroupAssociateDialogComponent } from '../group-associate-dialog/group-associate-dialog.component';
import { AigRoleAssociateDialogComponent } from '../role-associate-dialog/role-associate-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class AigUserDetailComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private roleAssignationResourceService: RoleAssignationResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    memberOfDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    roleDisplayedColumns: string[] = ['id', 'type', 'name', 'buttons'];

    memberOfButtonConfig = {
        details: true,
        removeUserFromGroup: null,
    }
    roleButtonConfig = {
        details: true,
        removeFromUser: null,
    }

    user: any; //UserDTO
    roles: Observable<RoleAssignationDTO[]>;

    loadComponent(): void {
        this.user = this.route.snapshot.data.user;

        this.memberOfButtonConfig.removeUserFromGroup = this.user;
        this.roleButtonConfig.removeFromUser = this.user;

        this.roles = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 10, null, this.user.id, null, null, null, null, null, null, null);
    }

    associateToGroup() {
        this.dialog.open(AigGroupAssociateDialogComponent, { data: { user: this.user } });
    }

    associateToRole() {
        this.dialog.open(AigRoleAssociateDialogComponent, { data: { user: this.user } });
    }
}

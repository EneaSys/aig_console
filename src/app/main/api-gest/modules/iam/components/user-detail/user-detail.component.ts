import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO, ContextGroupDTO, RoleAssignationDTO, UserResourceService, RoleAssignationResourceService, ContextGroupResourceService } from 'api-gest';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class AigUserDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private contextGroupResourceService: ContextGroupResourceService,
    ) { }

    memberOfDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    roleDisplayedColumns: string[] = ['id', 'type', 'name', 'buttons'];

    user: any; //UserDTO
    //groups: Observable<ContextGroupDTO[]>;
    roles: Observable<RoleAssignationDTO[]>;

    ngOnInit(): void {
        this.user = this.route.snapshot.data.user;

        //this.groups = this.contextGroupResourceService.getAllContextGroupsUsingGET({}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.user.id, null, null, null, null, null, null, null);
        this.roles = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.user.id, null, null, null, null, null, null)
    }
}

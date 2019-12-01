import { Component, OnInit } from '@angular/core';
import { RoleDTO, RoleAssignationResourceService, RoleAssignationDTO } from 'api-gest';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'app/main/api-gest/event.service';

@Component({
    templateUrl: './role-page-detail.component.html',
    styleUrls: ['./role-page-detail.component.scss']
})
export class AigRoleDetailPageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private eventService: EventService,
    ) {
        this.eventService.reloadPage$.subscribe((data?: any) => this.ngOnInit());
    }

    permissionSystemDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName'];
    usersDisplayedColumns: string[] = ['usercode', 'email', 'type'];
    groupsDisplayedColumns: string[] = ['id', 'name'];


    roleSystem: RoleDTO;
    users: Observable<RoleAssignationDTO[]>;
    groups: Observable<RoleAssignationDTO[]>;

    ngOnInit(): void {
        this.roleSystem = this.route.snapshot.data.roleSystem;

        this.users = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET("", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.roleSystem.roleCode, null, null, null, null, null, 0, null, null, null, null, null, null);
        this.groups = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET("", null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.roleSystem.roleCode, null, null, null, null, null, null, null, null, null, null, null, null);
    }
}

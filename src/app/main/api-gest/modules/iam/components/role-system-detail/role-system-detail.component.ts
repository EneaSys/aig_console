import { Component, OnInit } from '@angular/core';
import { RoleDTO, RoleAssignationResourceService, RoleAssignationDTO } from 'api-gest';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './role-system-detail.component.html',
    styleUrls: ['./role-system-detail.component.scss']
})
export class AigRoleSystemDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private roleAssignationResourceService: RoleAssignationResourceService,
    ) { }

    roleSystem: RoleDTO;
    permissionSystemDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName'];

    datasourceUser: any;
    datasourceGroup: any;

    ngOnInit(): void {
        this.roleSystem = this.route.snapshot.data.roleSystem;

        this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.roleSystem.roleCode, null, null, null, null, null, 0, null, null, null, null, null, null).subscribe(
            (value: RoleAssignationDTO[]) => {
                this.datasourceUser = value;
            }
        );

        this.roleAssignationResourceService.getAllRoleAssignationsUsingGET({}, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.roleSystem.roleCode, null, null, null, null, null, null, null, null, null, null, null, null).subscribe(
            (value: RoleAssignationDTO[]) => {
                this.datasourceGroup = value;
            }
        );
    }
}

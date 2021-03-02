import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AigAssociateRoleToPermissionDialogComponent } from '../associate-role-premission-dialog/associate-role-premission-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigRoleNewUpdateModalComponent } from '../role-new-update-modal/role-new-update-modal.component';
import { RoleDTO, RoleResourceService } from 'aig-management';

@Component({
    selector: 'aig-role-detail-page',
    templateUrl: './role-detail-page.component.html',
    styleUrls: ['./role-detail-page.component.scss']
})
export class AigRoleDetailPageComponent extends GenericComponent {
    constructor(
        private roleResourceService: RoleResourceService,
        private route: ActivatedRoute,        
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

 // permissionSystemDisplayColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName', 'buttons'];
 // usersDisplayColumns: string[] = ['usercode', 'email', 'type'];
 // groupsDisplayedColumns: string[] = ['id', 'name'];

    roleDTO: RoleDTO;
    // users: Observable<RoleAssignationDTO[]>;
    //groups: Observable<RoleAssignationDTO[]>;

    loadPage(): void {
        this.roleDTO = this.route.snapshot.data.role;

        //this.users = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.role.roleCode, null, null, null, null, null, null, 0, null);
        //this.groups = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET(null, null, null, null, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,  this.role.roleCode, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    async reloadPage() {
		this.roleDTO = await this.roleResourceService.getRoleUsingGET(this.roleDTO.id).toPromise();
	}

    editRole(roleDTO: RoleDTO) {
        this.dialog.open(AigRoleNewUpdateModalComponent, { data: { role: roleDTO } });
    }
    
}

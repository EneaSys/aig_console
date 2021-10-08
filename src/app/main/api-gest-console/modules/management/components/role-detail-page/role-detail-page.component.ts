import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AigAssociateRoleToPermissionDialogComponent } from '../associate-role-premission-dialog/associate-role-premission-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigRoleNewUpdateModalComponent } from '../role-new-update-modal/role-new-update-modal.component';
import { PermissionDTO, PermissionResourceService, RoleDTO, RoleResourceService } from 'aig-management';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { RoleAssignationDTO, RoleAssignationResourceService } from 'api-gest';
import { AigPermissionNewUpdateModalComponent } from '../permission-new-update-modal/permission-new-update-modal.component';

@Component({
    selector: 'aig-role-detail-page',
    templateUrl: './role-detail-page.component.html',
    styleUrls: ['./role-detail-page.component.scss']
})
export class AigRoleDetailPageComponent extends GenericComponent {
    constructor(
        private roleResourceService: RoleResourceService,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private permissionResourceService: PermissionResourceService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,        
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    roleDTO: RoleDTO;
    users: Observable<RoleAssignationDTO[]>;
    groups: Observable<RoleAssignationDTO[]>;

    loadPage(): void {
        this.roleDTO = this.route.snapshot.data.role;
        this.loadOther();
    }

    async loadOther() {
        this.loadPermission();
      }

    async reloadPage() {
		this.roleDTO = await this.roleResourceService.getRoleUsingGET(this.roleDTO.id).toPromise();
	}

    async deleteRole(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.roleResourceService.deleteRoleUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Role: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'role']);
        } catch (e) {
            this._snackBar.open(`Error during deleting role: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editRole(roleDTO: RoleDTO) {
        this.dialog.open(AigRoleNewUpdateModalComponent, { data: { role: roleDTO } });
    }
    

    
    permissionDC: string[] = ['id', 'name', 'permissionCode', 'moduleName', 'buttons'];
    permissionDTOs: PermissionDTO[];
    permissionError: any;

    async loadPermission() {
        this.permissionDTOs = this.roleDTO.permissions
    }
    
	associatePermission(roleDTO: RoleDTO): void {
		this.dialog.open(AigAssociateRoleToPermissionDialogComponent, { data: { role: roleDTO } });
	}

	
	

}

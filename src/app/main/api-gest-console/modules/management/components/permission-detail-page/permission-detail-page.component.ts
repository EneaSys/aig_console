import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { PermissionDTO, PermissionResourceService } from "aig-management";
import { RoleDTO, RoleResourceService } from "api-gest";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPermissionNewUpdateModalComponent } from "../permission-new-update-modal/permission-new-update-modal.component";
import { AigRoleNewUpdateModalComponent } from "../role-new-update-modal/role-new-update-modal.component";

@Component({
	selector: 'aig-permission-detail-page',
	templateUrl: './permission-detail-page.component.html',
	styleUrls: ['./permission-detail-page.component.scss']
})
export class AigPermissionDetailPageComponent extends GenericComponent {
    constructor(
        private permissionResourceService: PermissionResourceService,
		private roleResourceService: RoleResourceService,
        private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
    	private router: Router,
    	private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	permissionDTO: PermissionDTO;

    loadPage() {
		this.permissionDTO = this.route.snapshot.data.permission;
		this.loadRoleList();
	}

	async reloadPage() {
		this.permissionDTO = await this.permissionResourceService.getPermissionUsingGET(this.permissionDTO.id).toPromise();
		this.loadRoleList();
	}

	async deletePermission(id: number) {
		this._fuseProgressBarService.show();
	
		try {
			await this.permissionResourceService.deletePermissionUsingDELETE(id).toPromise();
	
			this._snackBar.open(`Permission: '${id}' deleted.`, null, { duration: 2000, });
			
			this.router.navigate(['/m8t', 'permission']);
		} catch (e) {
			this._snackBar.open(`Error during deleting permission: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}
	
    editPermission(permissionDTO: PermissionDTO) {
		
		this.dialog.open(AigPermissionNewUpdateModalComponent, { data: { permission: permissionDTO } });
    }

	roleDTOs: RoleDTO[];
	roleError: any;
	roleDC: string[] = ["id", "name", 'roleCode', 'buttons'];

    private async loadRoleList() {
        let filters = {
            idEquals: null,
        };
        try {
            this.roleDTOs = await this.roleResourceService.getAllRolesUsingGET().toPromise();
        } catch (e) {
            this.roleError = e;
        }
    }

	newRole(permission: PermissionDTO): void {
		this.dialog.open(AigRoleNewUpdateModalComponent, { data: { permission: permission } });
	  }

}

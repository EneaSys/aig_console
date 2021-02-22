import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { PermissionDTO, PermissionResourceService } from "api-gest";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPermissionNewUpdateModalComponent } from "../permission-new-update-modal/permission-new-update-modal.component";

@Component({
	selector: 'aig-permission-detail-page',
	templateUrl: './permission-detail-page.component.html',
	styleUrls: ['./permission-detail-page.component.scss']
})
export class AigPermissionDetailPageComponent extends GenericComponent {
    constructor(
        private permissionResourceService: PermissionResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	permissionDTO: PermissionDTO;

    loadPage() {
		this.permissionDTO = this.route.snapshot.data.permission;
	}

	async reloadPage() {
		this.permissionDTO = await this.permissionResourceService.getPermissionUsingGET(this.permissionDTO.id).toPromise();
	}
	
    editPermission(permissionDTO: PermissionDTO) {
		
		this.dialog.open(AigPermissionNewUpdateModalComponent, { data: { permission: permissionDTO } });
    }
}

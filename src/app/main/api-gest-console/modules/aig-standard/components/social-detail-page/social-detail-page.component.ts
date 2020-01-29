import { Component, OnInit } from '@angular/core';
import { RoleDTO, RoleAssignationResourceService, RoleAssignationDTO } from 'api-gest';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// import { AigAssociateRoleToPermissionDialogComponent } from '../associate-role-premission-dialog/associate-role-premission-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialResourceService, SocialActionDTO } from 'aig-standard';

@Component({
    templateUrl: './social-detail-page.component.html',
    styleUrls: ['./social-detail-page.component.scss']
})
export class AigSocialDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private roleAssignationResourceService: SocialResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    socialdisplayedColumns: string[] = ['id', 'name', 'code', 'buttons'];

    role: SocialActionDTO;
    
    loadComponent(): void {
        console.log(this.route.snapshot);
        this.role = this.route.snapshot.data.role;
        console.log(this.role);
    }

    // addPermissionToRole(): void {
    //     this.dialog.open(AigAssociateRoleToPermissionDialogComponent, { data: { role: this.role } });
    // }
}

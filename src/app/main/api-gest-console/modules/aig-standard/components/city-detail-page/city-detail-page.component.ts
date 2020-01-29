import { Component, OnInit } from '@angular/core';
import { RoleDTO, RoleAssignationResourceService, RoleAssignationDTO,CityDTO, CityResourceService } from 'api-gest';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// import { AigAssociateRoleToPermissionDialogComponent } from '../associate-role-premission-dialog/associate-role-premission-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './city-detail-page.component.html',
    styleUrls: ['./city-detail-page.component.scss']
})
export class AigCityDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private roleAssignationResourceService: CityResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    citydisplayedColumns: string[] = ['id', 'name', 'code', 'buttons'];

    role: CityDTO;
    
    loadComponent(): void {
        this.role = this.route.snapshot.data.role;
        console.log(this.role);
    }

    // addPermissionToRole(): void {
    //     this.dialog.open(AigAssociateRoleToPermissionDialogComponent, { data: { role: this.role } });
    // }
}

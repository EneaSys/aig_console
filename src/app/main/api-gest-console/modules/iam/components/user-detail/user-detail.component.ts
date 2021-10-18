import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleAssignationDTO, RoleAssignationResourceService, ContextUserEopooResourceService, ContextUserEopooDTO } from 'api-gest';
import { Observable } from 'rxjs';
import { AigGroupAssociateDialogComponent } from '../group-associate-dialog/group-associate-dialog.component';
import { AigRoleAssociateDialogComponent } from '../role-associate-dialog/role-associate-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooResourceService, EopooDTO } from 'aig-generic';
import { AiguserEopooAssociateDialogComponent } from '../user-eopoo-associate-dialog/user-eopoo-associate-dialog.component';

@Component({
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class AigUserDetailComponent extends GenericComponent {
    constructor(
        private roleAssignationResourceService: RoleAssignationResourceService,
        private contextUserEopooResourceService: ContextUserEopooResourceService,
        private eopooResourceService: EopooResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    memberOfDisplayColumns: string[] = ['id', 'name', 'buttons'];
    roleDisplayColumns: string[] = ['id', 'type', 'name', 'buttons'];
    associatedEopooDisplayColumns: string[] = ['id', 'name', 'buttons'];

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
    eopooDTOs: EopooDTO[];

    associatedEopooLoadError: any;

    async loadComponent() {
        this.user = this.route.snapshot.data.user;

        this.memberOfButtonConfig.removeUserFromGroup = this.user;
        this.roleButtonConfig.removeFromUser = this.user;

        this.roles = this.roleAssignationResourceService.getAllRoleAssignationsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 10, null, this.user.id, null, null, null, null, null, null, null);

        try {
            this.eopooDTOs = null;

            let eopooIds: number[] = [];
            {
                let contextUserEopooDTOs: ContextUserEopooDTO[] = await this.contextUserEopooResourceService.getAllContextUserEopoosUsingGET(this.user.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).toPromise();
                contextUserEopooDTOs.forEach((contextUserEopooDTO: ContextUserEopooDTO) => {
                    eopooIds.push(Number(contextUserEopooDTO.eopooCode));
                });
            }
            if(eopooIds.length > 0) {
				let filter = {
					eopooIDIn: eopooIds
				}
                this.eopooDTOs = await this.eopooResourceService.getAllEopoosUsingGET(filter).toPromise();
            } else {
                this.eopooDTOs = [];
            }
        } catch(error) {
            this.associatedEopooLoadError = error;
        }
    }

    associateToGroup() {
        this.dialog.open(AigGroupAssociateDialogComponent, { data: { user: this.user } });
    }

    associateToRole() {
        this.dialog.open(AigRoleAssociateDialogComponent, { data: { user: this.user } });
    }
    associateToEopoo() {
        this.dialog.open(AiguserEopooAssociateDialogComponent, { data: { user: this.user } });
    }
}

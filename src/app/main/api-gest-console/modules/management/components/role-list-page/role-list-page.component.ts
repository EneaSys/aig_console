import { Component, OnInit } from '@angular/core';
import { RoleResourceService, RoleDTO } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AigRoleNewDialogComponent } from '../role-new-dialog/role-new-dialog.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './role-list-page.component.html',
    styleUrls: ['./role-list-page.component.scss']
})
export class AigRoleListPageComponent extends GenericComponent {
    constructor(
        private roleResourceService: RoleResourceService,
        private eventService: EventService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    roleSystemDisplayedColumns: string[] = ['id', 'name', 'roleCode', 'buttons'];
    roleSystemDataSource: Observable<RoleDTO[]>;

    loadComponent(): void {
        this.roleSystemDataSource = this.roleResourceService.getAllRolesUsingGET();
        console.log(this.roleSystemDataSource);
    }

    newRole(): void {
        this.dialog.open(AigRoleNewDialogComponent);
    }
}

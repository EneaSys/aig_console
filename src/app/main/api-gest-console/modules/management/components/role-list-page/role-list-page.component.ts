import { Component, OnInit } from '@angular/core';
import { RoleResourceService, RoleDTO } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AigRoleNewDialogComponent } from '../role-new-dialog/role-new-dialog.component';

@Component({
    templateUrl: './role-list-page.component.html',
    styleUrls: ['./role-list-page.component.scss']
})
export class AigRoleListPageComponent implements OnInit {
    constructor(
        private roleResourceService: RoleResourceService,
        private eventService: EventService,
        private dialog: MatDialog,
    ) {
        this.eventService.reloadPage$.subscribe(() => this.ngOnInit());
    }

    roleSystemDisplayedColumns: string[] = ['id', 'name', 'roleCode', 'buttons'];
    roleSystemDataSource: Observable<RoleDTO[]>;

    ngOnInit(): void {
        this.roleSystemDataSource = this.roleResourceService.getAllRolesUsingGET();
    }

    newRole(): void {
        this.dialog.open(AigRoleNewDialogComponent);
    }
}

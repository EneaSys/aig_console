import { Component, OnInit } from '@angular/core';
import { CustomRoleResourceService, CustomRoleDTO, RoleResourceService, RoleDTO } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigRoleCustomNewDialogComponent } from '../role-new-dialog/role-new-dialog.component';
import { EventService } from 'app/main/api-gest/event.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class AigRoleListComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private roleResourceService: RoleResourceService,
        private customRoleResourceService: CustomRoleResourceService,
        private eventService: EventService,
    ) {
        this.eventService.reloadPage$.subscribe(() => this.ngOnInit());
    }

    roleSystemDisplayedColumns: string[] = ['id', 'name', 'roleCode', 'buttons'];
    roleSystemDataSource: Observable<RoleDTO[]>;

    roleCustomDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    roleCustomDataSource: Observable<CustomRoleDTO[]>;

    ngOnInit(): void {
        this.roleSystemDataSource = this.roleResourceService.getAllRolesUsingGET();
        this.roleCustomDataSource = this.customRoleResourceService.getAllCustomRolesUsingGET("");
    }

    newCustomRole() {
        this.dialog.open(AigRoleCustomNewDialogComponent);
    }
}

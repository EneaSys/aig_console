import { Component, OnInit } from '@angular/core';
import { PermissionResourceService, PermissionDTO } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigPermissionNewDialogComponent } from '../permission-new-dialog/permission-new-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    templateUrl: './permission-list-page.component.html',
    styleUrls: ['./permission-list-page.component.scss']
})
export class AigPermissionListPageComponent implements OnInit {
    constructor(
        private permissionResourceService: PermissionResourceService,
        private eventService: EventService,
        private dialog: MatDialog,
    ) {
        this.eventService.reloadPage$.subscribe(() => this.ngOnInit());
    }

    permissionsDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName'];
    permissionsDataSource: PermissionDTO[] = [];

    ngOnInit(): void {
        this.permissionResourceService.getAllPermissionsUsingGET().subscribe(
            (value: PermissionDTO[]) => {
                this.permissionsDataSource = value;
            }
        );
    }

    newPermission(): void {
        this.dialog.open(AigPermissionNewDialogComponent);
    }
}

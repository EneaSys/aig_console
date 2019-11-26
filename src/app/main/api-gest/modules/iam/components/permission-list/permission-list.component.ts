import { Component, OnInit } from '@angular/core';
import { PermissionResourceService, PermissionDTO } from 'api-gest';
import { EventService } from 'app/main/api-gest/event.service';

@Component({
    templateUrl: './permission-list.component.html',
    styleUrls: ['./permission-list.component.scss']
})
export class AigPermissionListComponent implements OnInit {
    constructor(
        private permissionResourceService: PermissionResourceService,
        private eventService: EventService,
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
}

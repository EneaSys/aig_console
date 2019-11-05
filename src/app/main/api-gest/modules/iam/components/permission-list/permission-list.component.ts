import { Component, OnInit } from '@angular/core';
import { PermissionResourceService, PermissionDTO } from 'api-gest';

@Component({
    templateUrl: './permission-list.component.html',
    styleUrls: ['./permission-list.component.scss']
})
export class AigPermissionListComponent implements OnInit {
    constructor(
        private permissionResourceService: PermissionResourceService,
    ) { }

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

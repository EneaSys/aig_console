import { Component } from '@angular/core';
import { PermissionResourceService, PermissionDTO } from 'api-gest';
import { AigPermissionNewDialogComponent } from '../permission-new-dialog/permission-new-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './permission-list-page.component.html',
    styleUrls: ['./permission-list-page.component.scss']
})
export class AigPermissionListPageComponent extends GenericComponent {
    constructor(
        private permissionResourceService: PermissionResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    permissionsDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName'];
    permissionsDataSource: PermissionDTO[] = [];

    loadComponent(): void {
        var destructor = this.permissionResourceService.getAllPermissionsUsingGET().subscribe(
            (value: PermissionDTO[]) => {
                this.permissionsDataSource = value;
            }
        );
        this._destructors.push(destructor);
    }

    newPermission(): void {
        this.dialog.open(AigPermissionNewDialogComponent);
    }
}

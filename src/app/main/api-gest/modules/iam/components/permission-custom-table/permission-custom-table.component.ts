import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PermissionDTO, CustomRoleDTO, CustomRolePermissionResourceService } from 'api-gest';

@Component({
    selector: 'aig-permission-custom-table',
    templateUrl: './permission-custom-table.component.html',
    styleUrls: ['./permission-custom-table.component.scss']
})
export class AigPermissionCustomTableComponent implements OnInit {
    constructor(
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private customRolePermissionResourceService: CustomRolePermissionResourceService
    ) { }

    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    buttonConfig: any = {};

    ngOnInit(): void { }

    detailPermissionCustom(permissionCustom: any) {
        console.log(permissionCustom);
    }

    removeFromCustomRole(permission: any) {
        this._fuseProgressBarService.show();

        let customRole: CustomRoleDTO = this.buttonConfig.removeFromCustomRole;

        this.customRolePermissionResourceService.deleteCustomRolePermissionUsingDELETE(permission.id).subscribe(
            () => {
                this._snackBar.open("Removed permission: '" + permission.permissionDetail.name + "' from custom role: " + customRole.name, null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            }
        );
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PermissionDTO, PermissionResourceService } from 'aig-management';
import { AigPermissionNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/permission-new-update-modal/permission-new-update-modal.component';

@Component({
    selector: 'aig-permission-list-table',
    templateUrl: './permission-list-table.component.html',
    styleUrls: ['./permission-list-table.component.scss']
})
export class AigPermissionListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;
   
    constructor(
        private permissionResourceService: PermissionResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ) { }

    ngOnInit(): void { }

    async deletePermission(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.permissionResourceService.deletePermissionUsingDELETE(id).toPromise();
            this._snackBar.open(`Permission: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Permission: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPermission(permissionDTO: PermissionDTO) {
        this.dialog.open(AigPermissionNewUpdateModalComponent, { data: { permission: permissionDTO } });
    }

}

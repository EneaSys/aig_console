import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { RoleDTO, RoleResourceService } from 'aig-management';
import { AigRoleNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/role-new-update-modal/role-new-update-modal.component';

@Component({
    selector: 'aig-role-list-table',
    templateUrl: './role-list-table.component.html',
    styleUrls: ['./role-list-table.component.scss']
})
export class AigRoleListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private roleResourceService: RoleResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ){ }

    ngOnInit(): void {}

    async deleteRole(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.roleResourceService.deleteRoleUsingDELETE(id).toPromise();
            this._snackBar.open(`Role: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Role: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editRole(roleDTO: RoleDTO) {
        this.dialog.open(AigRoleNewUpdateModalComponent, { data: { role: roleDTO } });
    }
}



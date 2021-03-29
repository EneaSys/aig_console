import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CustomRoleDTO, CustomRoleResourceService } from 'api-gest';
import { AigPermissionCustomNewDialogComponent } from 'app/main/api-gest-console/modules/iam/components/permission-custom-new-dialog/permission-custom-new-dialog.component';

@Component({
    selector: 'aig-role-custom-table',
    templateUrl: './role-custom-table.component.html',
    styleUrls: ['./role-custom-table.component.scss']
})
export class AigRoleCustomTableComponent implements OnInit {   
    constructor(
        private router: Router,
        private customRoleResourceService: CustomRoleResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteCustomRole(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.customRoleResourceService.deleteCustomRoleUsingDELETE(id).toPromise();
            this._snackBar.open(`Role Custom: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting warehouse handling: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editCustomRole(customRoleDTO: CustomRoleDTO) {
        this.dialog.open(AigPermissionCustomNewDialogComponent, { data: { customRole: customRoleDTO } });
    }

    public detailCustomRole(idCustomRole: string){
        this.router.navigate(['iam', 'role', 'detail', idCustomRole]);
    }
}

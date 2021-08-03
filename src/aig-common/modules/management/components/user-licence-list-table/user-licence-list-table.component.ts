import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { EntityReferenceDTO, EntityReferenceResourceService, LicenzeDTO, LicenzeResourceService, UserLicenzeDTO, UserLicenzeResourceService } from 'aig-management';
import { AigEntityReferenceNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/entity-reference-new-update-modal/entity-reference-new-update-modal.component';
import { AigLicenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/licence-new-update-dialog/licence-new-update-dialog.component';
import { AigUserLicenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/user-licence-new-update-dialog/user-licence-new-update-dialog.component';

@Component({
	selector: 'aig-user-licence-list-table',
	templateUrl: './user-licence-list-table.component.html',
	styleUrls: ['./user-licence-list-table.component.scss']
})
export class AigUserLicenceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
	error: any;
	
	constructor(
        private userLicenceResourceService: UserLicenzeResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
		private router: Router,
	) { }

	ngOnInit(): void { }

	async deleteUserLicence(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.userLicenceResourceService.deleteUserLicenzeUsingDELETE(id).toPromise();
            this._snackBar.open(`User Licence: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting user licence: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editUserLicence(userLicenceDTO: UserLicenzeDTO) {
        this.dialog.open(AigUserLicenceNewUpdateDialogComponent, { data: { userLicence: userLicenceDTO } });
    }
}

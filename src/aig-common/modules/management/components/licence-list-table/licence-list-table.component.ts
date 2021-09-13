import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { EntityReferenceDTO, EntityReferenceResourceService, LicenzeDTO, LicenzeResourceService } from 'aig-management';
import { AigEntityReferenceNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/entity-reference-new-update-modal/entity-reference-new-update-modal.component';
import { AigLicenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/licence-new-update-dialog/licence-new-update-dialog.component';

@Component({
	selector: 'aig-licence-list-table',
	templateUrl: './licence-list-table.component.html',
	styleUrls: ['./licence-list-table.component.scss']
})
export class AigLicenceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
	error: any;
	
	constructor(
        private licenceResourceService: LicenzeResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
		private router: Router,
	) { }

	ngOnInit(): void { }

	async deleteLicence(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.licenceResourceService.deleteLicenzeUsingDELETE(id).toPromise();
            this._snackBar.open(`Licence: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting licence: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editLicence(licenceDTO: LicenzeDTO) {
        this.dialog.open(AigLicenceNewUpdateDialogComponent, { data: { licence: licenceDTO } });
    }
}

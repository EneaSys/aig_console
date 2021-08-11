import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import {  UserLicenzeDTO, UserLicenzeResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigUserLicenceNewUpdateDialogComponent } from "../user-licence-new-update-dialog/user-licence-new-update-dialog.component";

@Component({
	selector: 'aig-user-licence-detail-page',
	templateUrl: './user-licence-detail-page.component.html',
	styleUrls: ['./user-licence-detail-page.component.scss']
})
export class AigUserLicenceDetailPageComponent extends GenericComponent {
	constructor(
		private userLicenceResourceService: UserLicenzeResourceService,
		private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	userLicenceDTO: UserLicenzeDTO;

	loadPage() {
		this.userLicenceDTO = this.route.snapshot.data.userLicence;
		
	}

	async reloadPage() {
		this.userLicenceDTO = await this.userLicenceResourceService.getUserLicenzeUsingGET(this.userLicenceDTO.id).toPromise();
	}

	async deleteUserLicence(id: number) {
		this._fuseProgressBarService.show();

		try {
			await this.userLicenceResourceService.deleteUserLicenzeUsingDELETE(id).toPromise();

			this._snackBar.open(`User Licence: '${id}' deleted.`, null, { duration: 2000, });

			this.router.navigate(['/m8t', 'user-licence']);
		} catch (e) {
			this._snackBar.open(`Error during deleting user licence: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}

	editUserLicence(userLicenceDTO: UserLicenzeDTO) {
		this.dialog.open(AigUserLicenceNewUpdateDialogComponent, { data: { userLicence: userLicenceDTO } });
	}
}

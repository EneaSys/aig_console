import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EntityReferenceDTO, EntityReferenceResourceService, LicenzeDTO, LicenzeResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigEntityReferenceNewUpdateModalComponent } from "../entity-reference-new-update-modal/entity-reference-new-update-modal.component";
import { AigLicenceNewUpdateDialogComponent } from "../licence-new-update-dialog/licence-new-update-dialog.component";

@Component({
	selector: 'aig-licence-detail-page',
	templateUrl: './licence-detail-page.component.html',
	styleUrls: ['./licence-detail-page.component.scss']
})
export class AigLicenceDetailPageComponent extends GenericComponent {
	constructor(
		private licenceResourceService: LicenzeResourceService,
		private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	licenceDTO: LicenzeDTO;

	loadPage() {
		this.licenceDTO = this.route.snapshot.data.licence;
		
	}

	async reloadPage() {
		this.licenceDTO = await this.licenceResourceService.getLicenzeUsingGET(this.licenceDTO.id).toPromise();
	}

	async deleteLicence(id: number) {
		this._fuseProgressBarService.show();

		try {
			await this.licenceResourceService.deleteLicenzeUsingDELETE(id).toPromise();

			this._snackBar.open(`Licence: '${id}' deleted.`, null, { duration: 2000, });

			this.router.navigate(['/m8t', 'licence']);
		} catch (e) {
			this._snackBar.open(`Error during deleting licence: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}

	editLicence(licenceDTO: LicenzeDTO) {
		this.dialog.open(AigLicenceNewUpdateDialogComponent, { data: { licence: licenceDTO } });
	}
}

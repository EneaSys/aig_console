import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EntityReferenceDTO, EntityReferenceResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";

import { AigPartecipationModalityNewUpdateDialogComponent } from "../partecipation-modality-new-update-dialog/partecipation-modality-new-update-dialog.component";

@Component({
	selector: 'aig-partecipation-modality-detail-page',
	templateUrl: './partecipation-modality-detail-page.component.html',
	styleUrls: ['./partecipation-modality-detail-page.component.scss']
})
export class AigPartecipationModalityDetailPageComponent extends GenericComponent {
	constructor(
		//private partecipationModalityResourceService: PartecipationModalityResourceService,
		private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	//partecipationModalityDTO: PartecipationModalityDTO;

	loadPage() {
		//this.partecipationModalityDTO = this.route.snapshot.data.partecipationModality;
		
	}

	async reloadPage() {
		//this.partecipationModalityDTO = await this.partecipationModalityResourceService.getPartecipationModalityUsingGET(this.partecipationModalityDTO.id).toPromise();
	}

	async deletePartecipationModality(id: number) {
		this._fuseProgressBarService.show();

		try {
			//await this.partecipationModalityResourceService.deletepartecipationModalityUsingDELETE(id).toPromise();

			this._snackBar.open(`Partecipation Modality: '${id}' deleted.`, null, { duration: 2000, });

			this.router.navigate(['/m8t', 'partecipation-modality']);
		} catch (e) {
			this._snackBar.open(`Error during deleting partecipation Modality: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}

	/*editPartecipationModality(partecipationModalityDTO: PartecipationModalityDTO) {
		this.dialog.open(AigPartecipationModalityNewUpdateDialogComponent, { data: { partecipationModality: partecipationModalityDTO } });
	}
    */
}



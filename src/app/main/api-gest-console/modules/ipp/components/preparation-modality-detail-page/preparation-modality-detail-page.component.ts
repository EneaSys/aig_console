import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { PartecipationModalityDTO, PartecipationModalityResourceService, PreparationModalityDTO, PreparationModalityResourceService } from "aig-italianlegislation";
import { EntityReferenceDTO, EntityReferenceResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";

import { AigPartecipationModalityNewUpdateDialogComponent } from "../partecipation-modality-new-update-dialog/partecipation-modality-new-update-dialog.component";
import { AigPreparationModalityNewUpdateDialogComponent } from "../preparation-modality-new-update-dialog/preparation-modality-new-update-dialog.component";

@Component({
	selector: 'aig-preparation-modality-detail-page',
	templateUrl: './preparation-modality-detail-page.component.html',
	styleUrls: ['./preparation-modality-detail-page.component.scss']
})
export class AigPreparationModalityDetailPageComponent extends GenericComponent {
	constructor(
		private preparationModalityResourceService: PreparationModalityResourceService,
		private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	preparationModalityDTO: PreparationModalityDTO;

	loadPage() {
		this.preparationModalityDTO = this.route.snapshot.data.preparationModality;
		
	}

	async reloadPage() {
		this.preparationModalityDTO = await this.preparationModalityResourceService.getPreparationModalityUsingGET(this.preparationModalityDTO.id).toPromise();
	}

	async deletePreparationModality(id: number) {
		this._fuseProgressBarService.show();

		try {
			await this.preparationModalityResourceService.deletePreparationModalityUsingDELETE(id).toPromise();

			this._snackBar.open(`Preparation Modality: '${id}' deleted.`, null, { duration: 2000, });

			this.router.navigate(['/m8t', 'preparation-modality']);
		} catch (e) {
			this._snackBar.open(`Error during deleting preparation Modality: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}

	editPreparationModality(preparationModalityDTO: PreparationModalityDTO) {
		this.dialog.open(AigPreparationModalityNewUpdateDialogComponent, { data: { preparationModality: preparationModalityDTO } });
	}
    
}



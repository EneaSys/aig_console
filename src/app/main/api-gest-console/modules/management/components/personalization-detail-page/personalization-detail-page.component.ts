import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { PersonalizationDTO, PersonalizationResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPersonalizationNewUpdateModalComponent } from "../personalization-new-update-modal/personalization-new-update-modal.component";

@Component({
	selector: 'aig-personalization-detail-page',
	templateUrl: './personalization-detail-page.component.html',
	styleUrls: ['./personalization-detail-page.component.scss']
})
export class AigPersonalizationDetailPageComponent extends GenericComponent {
    constructor(
        private personalizationResourceService: PersonalizationResourceService,
        private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
    	private router: Router,
    	private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	personalizationDTO: PersonalizationDTO;

    loadPage() {
		this.personalizationDTO = this.route.snapshot.data.personalization;
	}

	async reloadPage() {
		this.personalizationDTO = await this.personalizationResourceService.getPersonalizationUsingGET(this.personalizationDTO.id).toPromise();
	}

	async deletePersonalization(id: number) {
		this._fuseProgressBarService.show();
	
		try {
			await this.personalizationResourceService.deletePersonalizationUsingDELETE(id).toPromise();
	
			this._snackBar.open(`Personalization: '${id}' deleted.`, null, { duration: 2000, });
			
			this.router.navigate(['/m8t', 'personalization']);
		} catch (e) {
			this._snackBar.open(`Error during deleting personalization: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}
	
    editPersonalization(personalizationDTO: PersonalizationDTO) {
		
		this.dialog.open(AigPersonalizationNewUpdateModalComponent, { data: { personalization: personalizationDTO } });
    }
}
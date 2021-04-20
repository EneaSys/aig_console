import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EntityReferenceDTO, EntityReferenceResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigEntityReferenceNewUpdateModalComponent } from "../entity-reference-new-update-modal/entity-reference-new-update-modal.component";

@Component({
	selector: 'aig-entity-reference-detail-page',
	templateUrl: './entity-reference-detail-page.component.html',
	styleUrls: ['./entity-reference-detail-page.component.scss']
})
export class AigEntityReferenceDetailPageComponent extends GenericComponent {
	constructor(
		private entityReferenceResourceService: EntityReferenceResourceService,
		private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	entityReferenceDTO: EntityReferenceDTO;

	loadPage() {
		this.entityReferenceDTO = this.route.snapshot.data.entityReference;
		
	}

	async reloadPage() {
		this.entityReferenceDTO = await this.entityReferenceResourceService.getEntityReferenceUsingGET(this.entityReferenceDTO.id).toPromise();
	}

	async deleteEntityReference(id: number) {
		this._fuseProgressBarService.show();

		try {
			await this.entityReferenceResourceService.deleteEntityReferenceUsingDELETE(id).toPromise();

			this._snackBar.open(`Entity Reference: '${id}' deleted.`, null, { duration: 2000, });

			this.router.navigate(['/m8t', 'entity-reference']);
		} catch (e) {
			this._snackBar.open(`Error during deleting entity reference: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}

	editEntityReference(entityReferenceDTO: EntityReferenceDTO) {
		this.dialog.open(AigEntityReferenceNewUpdateModalComponent, { data: { entityReference: entityReferenceDTO } });
	}
}

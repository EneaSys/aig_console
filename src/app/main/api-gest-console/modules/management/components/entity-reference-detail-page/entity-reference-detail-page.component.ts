import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { EntityReferenceDTO, EntityReferenceResourceService } from "api-gest";
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
	
    editEntityReference(entityReferenceDTO: EntityReferenceDTO) {
		this.dialog.open(AigEntityReferenceNewUpdateModalComponent, { data: { entityReference: entityReferenceDTO } });
    }
}

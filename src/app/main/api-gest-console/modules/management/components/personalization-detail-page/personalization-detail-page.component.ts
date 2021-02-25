import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
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
	
    editPersonalization(personalizationDTO: PersonalizationDTO) {
		
		this.dialog.open(AigPersonalizationNewUpdateModalComponent, { data: { personalization: personalizationDTO } });
    }
}
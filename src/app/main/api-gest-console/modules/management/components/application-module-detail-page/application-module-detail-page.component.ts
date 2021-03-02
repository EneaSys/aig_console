import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { ApplicationModuleDTO, ApplicationModuleResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigApplicationModuleNewUpdateModalComponent } from "../application-module-new-update-modal/application-module-new-update-modal.component";

@Component({
	selector: 'aig-application-module-detail-page',
	templateUrl: './application-module-detail-page.component.html',
	styleUrls: ['./application-module-detail-page.component.scss']
})
export class AigApplicationModuleDetailPageComponent extends GenericComponent {
    constructor(
        private applicationModuleResourceService: ApplicationModuleResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	applicationModuleDTO: ApplicationModuleDTO;

    loadPage() {
		this.applicationModuleDTO = this.route.snapshot.data.applicationModule;
	}

	async reloadPage() {
		this.applicationModuleDTO = await this.applicationModuleResourceService.getApplicationModuleUsingGET(this.applicationModuleDTO.id).toPromise();
	}
	
    editApplicationModule(applicationModuleDTO: ApplicationModuleDTO) {
		this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }
}
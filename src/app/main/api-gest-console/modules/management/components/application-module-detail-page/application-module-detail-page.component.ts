import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
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
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
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

	async deleteApplicationModule(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.applicationModuleResourceService.deleteApplicationModuleUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Application Module: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'application-module']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Application Module: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }
	
    editApplicationModule(applicationModuleDTO: ApplicationModuleDTO) {
		this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }
}
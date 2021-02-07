import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { ApplicationModuleDTO, ApplicationModuleResourceService, TenantContextDTO, TenantContextResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigApplicationModuleNewUpdateModalComponent } from '../application-module-new-update-modal/application-module-new-update-modal.component';


@Component({
	selector: 'aig-application-module-list-page',
	templateUrl: './application-module-list-page.component.html',
	styleUrls: ['./application-module-list-page.component.scss']
})
export class AigApplicationModuleListPageComponent extends GenericComponent {
	constructor(
		private applicationModuleResourceService: ApplicationModuleResourceService,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	applicationModuleDTOs: ApplicationModuleDTO[];
	applicationModuleDC: string[] = [ "id", "name", "buttons" ];
	applicationModuleError: any;

	length: number;
	page: number;
	size: number = 10;
	
	loadPage() {
		this.reloadPage();
	}

	paginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadPage();
	}
	
	async reloadPage() {
		try {
			this.length = await this.applicationModuleResourceService.countApplicationModulesUsingGET().toPromise();
			this.applicationModuleDTOs = await this.applicationModuleResourceService.getAllApplicationModulesUsingGET().toPromise();
		} catch(e) {
			this.applicationModuleError = e;
		}
	}

	newApplicationModule(): void {
        this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: {} } });
    }
}


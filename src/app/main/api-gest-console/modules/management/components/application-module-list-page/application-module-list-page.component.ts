import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	
	
	loadPage() {
		this.initApplicationModuleSearch();

		this.showAllApplicationModule();
	}

	reloadPage() {
		this.showAllApplicationModule();
	}


//			---- APPLICATION MODULE TABLE AND SEARCH SECTION ----

	applicationModuleSearchFormGroup: FormGroup;
	applicationModulePagination: any;
	applicationModuleFilters: any;

	applicationModuleLength: number;
	applicationModuleDTOs: ApplicationModuleDTO[];
	applicationModuleError: any;

	applicationModuleDC: string[];

	
	private initApplicationModuleSearch() {
		this.applicationModuleDC = ["id", "name", "buttons"];

		this.applicationModulePagination = {
			page: 0,
			size: 10,
		}

		this.applicationModuleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersApplicationModule() {
		this.applicationModuleFilters = {
			id: null,
			name: null,
		}
	}

	private async searchApplicationModule() {
		try {
			this.applicationModuleLength = await this.applicationModuleResourceService.countApplicationModulesUsingGET().toPromise();
			this.applicationModuleDTOs = await this.applicationModuleResourceService.getAllApplicationModulesUsingGET(this.applicationModuleFilters.id,null,null,null,null,null,null,null,this.applicationModuleFilters.name,null, null, null, null, null, this.applicationModulePagination.page,this.applicationModulePagination.size).toPromise();
		} catch(e) {
			this.applicationModuleError = e;
		}
	}

	newApplicationModule(): void {
        this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: {} } });
    }
	showAllApplicationModule() {
		this.clearFiltersApplicationModule();
		this.searchApplicationModule();
	}

	applicationModulePaginationEvent(pageEvent: PageEvent) {
		this.applicationModulePagination.size = pageEvent.pageSize;
		this.applicationModulePagination.page = pageEvent.pageIndex;

		this.searchApplicationModule();
	}

	applicationModuleSearchWithFilter() {
		this.applicationModuleFilters.id = this.applicationModuleSearchFormGroup.controls.id.value;
		this.applicationModuleFilters.name = this.applicationModuleSearchFormGroup.controls.name.value;

		this.searchApplicationModule();
	}
	
}


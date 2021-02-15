import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ApplicationModuleDTO, ApplicationModuleResourceService} from 'api-gest';
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
		private _snackBar: MatSnackBar,
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
		
		this.applicationModulePagination = {
			size: 10,
			page: 0,
		}

		this.applicationModuleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.applicationModuleDC = ["id", "name", "buttons"];
	}

	private clearFiltersApplicationModule() {
		this.applicationModuleFilters = {
			id: null,
			name: null,
		}
	}

	private async searchApplicationModule(page: number) {
		this.applicationModulePagination.page = page;
        this.applicationModuleDTOs = null;
		try {
			this.applicationModuleLength = await this.applicationModuleResourceService.countApplicationModulesUsingGET(this.applicationModuleFilters.id, null, null, null, null, null, null, null, this.applicationModuleFilters.name,).toPromise();
			if(this.applicationModuleLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.applicationModuleDTOs = [];
				return;
			}
			this.applicationModuleDTOs = await this.applicationModuleResourceService.getAllApplicationModulesUsingGET(this.applicationModuleFilters.id,null,null,null,null,null,null,null,this.applicationModuleFilters.name,null, null, null, null, null, this.applicationModulePagination.page,this.applicationModulePagination.size).toPromise();
		} catch(e) {
			this.applicationModuleError = e;
		}
	}

	showAllApplicationModule() {
		this.resetFiltersApplicationModule();
	}

	resetFiltersApplicationModule() {
		this.applicationModuleSearchFormGroup.reset();
		this.clearFiltersApplicationModule();
		this.searchApplicationModule(0);
	}

	applicationModulePaginationEvent(pageEvent: PageEvent) {
		this.applicationModulePagination.size = pageEvent.pageSize;
		this.searchApplicationModule(pageEvent.pageIndex);
	}

	applicationModuleSearchWithFilter() {
		let searchedId = this.applicationModuleSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersApplicationModule();
			this.applicationModuleSearchFormGroup.reset();
			this.applicationModuleFilters.id = searchedId;
			this.searchApplicationModule(0);
			return;
		}
		this.applicationModuleFilters.id = null;

		this.applicationModuleFilters.name = this.applicationModuleSearchFormGroup.controls.name.value;

		this.searchApplicationModule(0);
	}

	newApplicationModule(): void {
        this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: {} } });
    }
	
}


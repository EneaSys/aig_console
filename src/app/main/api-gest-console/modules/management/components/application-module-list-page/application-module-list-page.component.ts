import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ApplicationModuleDTO, ApplicationModuleResourceService } from 'aig-management';
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
	applicationModulePaginationSize: number;
	applicationModuleFilters: any;

	applicationModuleLength: number;
	applicationModuleDTOs: ApplicationModuleDTO[];
	applicationModuleError: any;

	applicationModuleDC: string[];

	
	private initApplicationModuleSearch() {
		
		this.applicationModulePaginationSize = 10;

		this.applicationModuleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.applicationModuleDC = ["id", "name", "buttons"];
	}

	private clearFiltersApplicationModule() {
		this.applicationModuleFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchApplicationModule(page: number) {
		
        this.applicationModuleDTOs = null;
		this.applicationModuleFilters.page = page;
		this.applicationModuleFilters.size = this.applicationModulePaginationSize;
		
		try {
			this.applicationModuleLength = await this.applicationModuleResourceService.countApplicationModulesUsingGET(this.applicationModuleFilters).toPromise();
			
			if(this.applicationModuleLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.applicationModuleDTOs = [];
				return;
			}
			this.applicationModuleDTOs = await this.applicationModuleResourceService.getAllApplicationModulesUsingGET(this.applicationModuleFilters).toPromise();
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
		this.applicationModulePaginationSize = pageEvent.pageSize;
		this.searchApplicationModule(pageEvent.pageIndex);
	}

	applicationModuleSearchWithFilter() {
		let searchedId = this.applicationModuleSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersApplicationModule();
			this.applicationModuleSearchFormGroup.reset();
			this.applicationModuleFilters.idEquals = searchedId;
			this.searchApplicationModule(0);
			return;
		}
		this.applicationModuleFilters.idEquals = null;

		this.applicationModuleFilters.nameContains = this.applicationModuleSearchFormGroup.controls.name.value;

		this.searchApplicationModule(0);
	}

	newApplicationModule(): void {
        this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: {} } });
    }
	
}


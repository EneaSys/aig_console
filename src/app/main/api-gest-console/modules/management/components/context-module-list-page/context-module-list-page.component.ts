import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ContextModuleDTO, ContextModuleResourceService } from 'aig-management';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContextModuleNewUpdateModalComponent } from '../context-module-new-update-modal/context-module-new-update-modal.component';

@Component({
	selector: 'aig-context-module-list-page',
	templateUrl: './context-module-list-page.component.html',
	styleUrls: ['./context-module-list-page.component.scss']
})

export class AigContextModuleListPageComponent extends GenericComponent {
	
	constructor(
		private contextModuleResourceService: ContextModuleResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	

	loadPage() {
		this.initContextModuleSearch();

		this.showAllContextModule();
	}
	
	reloadPage() {
		this.showAllContextModule();
	}

		//			---- CONTEXT MODULE TABLE AND SEARCH SECTION ----

	contextModuleSearchFormGroup: FormGroup;
	contextModulePaginationSize: number;
	contextModuleFilters: any;
	
	contextModuleLength: number;
	contextModuleDTOs: ContextModuleDTO[]; 
	contextModuleError: any;

	contextModuleDC: string[];
	

	private initContextModuleSearch() {

		this.contextModulePaginationSize = 10;

		this.contextModuleSearchFormGroup = this._formBuilder.group({
			id: [''],
			active: [''],
			applicationModule: [''],
			tenantContext: [''],
		});

		this.contextModuleDC = ["id", "active","applicationModule","tenantContext", "buttons"];
	}

	private clearFiltersContextModule() {
		this.contextModuleFilters = {
			idEquals: null,
			activeEquals: null,
			page: 0,
		}
	}

	private async searchContextModule(page: number) {

		this.contextModuleDTOs = null;
		this.contextModuleFilters.page = page;
		this.contextModuleFilters.size = this.contextModulePaginationSize;

		try {
			this.contextModuleLength = await this.contextModuleResourceService.countContextModulesUsingGET(this.contextModuleFilters).toPromise();
			
			if(this.contextModuleLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.contextModuleDTOs = [];
				return;
			}

			this.contextModuleDTOs = await this.contextModuleResourceService.getAllContextModulesUsingGET(this.contextModuleFilters).toPromise();
		} catch (e) {
			this.contextModuleError = e;
		}
	}

	showAllContextModule() {
		this.resetFiltersContextModule();
	}

	resetFiltersContextModule() {
		this.contextModuleSearchFormGroup.reset();
		this.clearFiltersContextModule();
		this.searchContextModule(0);
	}
	
	contextModulePaginationEvent(pageEvent: PageEvent) {
		this.contextModulePaginationSize = pageEvent.pageSize;
		this.searchContextModule(pageEvent.pageIndex);
	}

	contextModuleSearchWithFilter() {
		let searchedId = this.contextModuleSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersContextModule();
			this.contextModuleSearchFormGroup.reset();
			this.contextModuleFilters.idEquals = searchedId;
			this.searchContextModule(0);
			return;
		}
		this.contextModuleFilters.idEquals = null;

		if(this.contextModuleSearchFormGroup.controls.active.value){
			this.contextModuleFilters.activeEquals = this.contextModuleSearchFormGroup.controls.active.value;
		}

		this.searchContextModule(0);
	}

	newContextModule(): void {
		this.dialog.open(AigContextModuleNewUpdateModalComponent, { data: {} });
   	}

   async publish() {
		await this.contextModuleResourceService.publishUsingGET1(this.contextModuleFilters).toPromise();
	}

}
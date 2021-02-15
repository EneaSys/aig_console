import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { ContextModuleDTO, ContextModuleResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContextModuleNewUpdateModalComponent } from '../context-module-dialog/context-module-new-update-modal.component';

@Component({
    selector: 'aig-context-module-list-page',
    templateUrl: './context-module-list-page.component.html',
    styleUrls: ['./context-module-list-page.component.scss']
})

export class AigContextModuleListPageComponent extends GenericComponent {
   
  
    page: number;
    size: number;
    reloadContextModuleTable: any;

   
    constructor(
        private contextModuleResourceService: ContextModuleResourceService,
		private _formBuilder: FormBuilder,
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

   contextModuleSearchFormGroup: FormGroup;
   contextModulePagination: any;
   contextModuleFilters: any;
    
   contextModuleDTOs: ContextModuleDTO[]; 
   contextModuleDC: string[] = [ "id", "active", "module","context"];
   contextModuleError: any;
   contextModuleLength: number;

    private initContextModuleSearch() {
    this.contextModuleDC = ["id", "active", "module","context"];

    this.contextModulePagination = {
        page: 0,
        size: 2,
    }

    this.contextModuleSearchFormGroup = this._formBuilder.group({
        id: [''],
        name: [''],
        });
    }

    private clearFiltersContextModule() {
    this.contextModuleFilters = {
        id: null,
        name: null,
    }
}

    private async searchContextModule() {
        try {
            this.contextModuleLength = await this.contextModuleResourceService.countContextModulesUsingGET().toPromise();
            this.contextModuleDTOs = await this.contextModuleResourceService.getAllContextModulesUsingGET(null, null, null, null, null, null, this.contextModuleFilters.id, null, null, null, null, null, null, null, null, null, null, null, null, null, this.contextModuleFilters.name, null, null, null, null, null, null, null, this.contextModulePagination.page,this.contextModulePagination.size).toPromise();
        } catch (e) {
            this.contextModuleError = e;
        }
    }

    showAllContextModule() {
        this.clearFiltersContextModule();
        this.searchContextModule();
    }

	contextModulePaginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadContextModuleTable();
	}
   
    contextModuleSearchWithFilter() {
		this.contextModuleFilters.id = this.contextModuleSearchFormGroup.controls.id.value;
		this.contextModuleFilters.name = this.contextModuleSearchFormGroup.controls.name.value;

		this.searchContextModule();
    }

    async loadComponent() {
        this.contextModuleDTOs = await this.contextModuleResourceService.getAllContextModulesUsingGET().toPromise();
    }

    newAction(){
        this.dialog.open(AigContextModuleNewUpdateModalComponent, { data: { contextModule: {} } });
    }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ContextModuleDTO, ContextModuleResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-context-module-list-page',
    templateUrl: './context-module-list-page.component.html',
    styleUrls: ['./context-module-list-page.component.scss']
})

export class AigContextModuleListPageComponent extends GenericComponent {
    contextModuleSearchFormGroup: FormGroup;
    page: number;
    size: number;
    length: number;
 

 
    constructor(
        private contextModuleResourceService: ContextModuleResourceService,
		private dialog: MatDialog,
		private _formBuilder: FormBuilder,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    
   contextModuleDTOs: ContextModuleDTO[]; 
   contextModuleDC: string[] = [ "id", "active", "module","context"];
   contextModuleError: any;

   id: number;
   contextId: number;

	loadPage() {
		this.reloadPage();

		this.contextModuleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
    }
    
    reloadPage() {
		this.reloadContextModuleTable();
	}


    paginationEvent(pageEvent: PageEvent) {
        this.page = pageEvent.pageIndex;
        this.size = pageEvent.pageSize;
        
        this.reloadPage();
    }

    async reloadContextModuleTable() {
		try {
			this.length = await this.contextModuleResourceService.countContextModulesUsingGET().toPromise();
			this.contextModuleDTOs = await this.contextModuleResourceService.getAllContextModulesUsingGET(null,null,null,null,this.contextId,null,null,null,null,null,null,null,this.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,this.size).toPromise();
		} catch (e) {
			this.contextModuleError = e;
		}
	}

	contextModulePaginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadContextModuleTable();
	}

	tenantContextSearch() {
		this.id = this.contextModuleSearchFormGroup.controls.id.value;
		this.contextId = this.contextModuleSearchFormGroup.controls.name.value;

		this.reloadContextModuleTable();
	}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { ApplicationModuleDTO, ApplicationModuleResourceService, TenantContextDTO, TenantContextResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
	selector: 'aig-application-module-list-page',
	templateUrl: './application-module-list-page.component.html',
	styleUrls: ['./application-module-list-page.component.scss']
})
export class AigApplicationModuleListPageComponent extends GenericComponent {
	applicationModuleSearchFormGroup: FormGroup;
	
	constructor(
		private applicationModuleResourceService: ApplicationModuleResourceService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	applicationModuleDTOs: ApplicationModuleDTO[];
	applicationModuleDC: string[] = [ "id", "name", "buttons" ];
	applicationModuleError: any;

	length: number;
	page: number;
	size: number = 10;
	id: number;
	name: string;
	
	loadPage() {
		this.reloadPage();

		this.applicationModuleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	reloadPage() {
		this.reloadApplicationModuleTable();
	}

	async reloadApplicationModuleTable() {
		try {
			this.length = await this.applicationModuleResourceService.countApplicationModulesUsingGET().toPromise();
			this.applicationModuleDTOs = await this.applicationModuleResourceService.getAllApplicationModulesUsingGET(this.id,null,null,null,null,null,null,null,this.name,).toPromise();
		} catch(e) {
			this.applicationModuleError = e;
		}
	}

	applicationModulePaginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadApplicationModuleTable();
	}

	applicationModuleSearch() {
		this.id = this.applicationModuleSearchFormGroup.controls.id.value;
		this.name = this.applicationModuleSearchFormGroup.controls.name.value;

		this.reloadApplicationModuleTable();
	}
	
	
	
}


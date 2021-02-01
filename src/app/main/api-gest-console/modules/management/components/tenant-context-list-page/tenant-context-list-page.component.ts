import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { TenantContextDTO, TenantContextResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
	selector: 'aig-tenant-context-list-page',
	templateUrl: './tenant-context-list-page.component.html',
	styleUrls: ['./tenant-context-list-page.component.scss']
})
export class AigTenantContextListPageComponent extends GenericComponent {
	constructor(
		private tenantContextResourceService: TenantContextResourceService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	
	
	


	loadPage() {
		this.initTenantContextSearch();

		this.showAllTenantContext();
	}

	reloadPage() {
		this.showAllTenantContext();
	}







	//			---- TENANT CONTEXT TABLE AND SEARCH SECTION ----

	tenantContextSearchFormGroup: FormGroup;
	tenantContextPaginationSize: number;
	tenantContextFilters: any;

	tenantContextLength: number;
	tenantContextDTOs: TenantContextDTO[];
	tenantContextError: any;

	tenantContextDC: string[];


	private initTenantContextSearch() {
		this.tenantContextPaginationSize = 2;
	
		this.tenantContextSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.tenantContextDC = ["id", "name", "contextCode", "buttons"];
	}

	private initFiltersTenantContext() {
		this.tenantContextFilters = {
			id: null,
			name: null,
		}
	}

	private async searchTenantContext(page: number) {
		this.tenantContextDTOs = null;
		try {
			this.tenantContextLength = await this.tenantContextResourceService.countTenantContextsUsingGET(null,null,null,null,null,null,this.tenantContextFilters.id,null,null,null,null,null,null,null,null,null,null,null,null,null,this.tenantContextFilters.name).toPromise(); //mettere i 
			this.tenantContextDTOs = await this.tenantContextResourceService.getAllTenantContextsUsingGET(null, null, null, null, null, null, this.tenantContextFilters.id, null, null, null, null, null, null, null, null, null, null, null, null, null, this.tenantContextFilters.name, null, null, null, null, null, null, null, null, null, null, null, page, this.tenantContextPaginationSize).toPromise();
		} catch (e) {
			this.tenantContextError = e;
		}
	}

	showAllTenantContext() {
		this.initFiltersTenantContext();
		this.searchTenantContext(0);
	}

	clearFiltersTenantContext() {
		console.log("basnana");
		this.tenantContextSearchFormGroup.reset();
		this.showAllTenantContext();
	}

	tenantContextPaginationEvent(pageEvent: PageEvent) {
		this.tenantContextPaginationSize = pageEvent.pageSize;
		
		this.searchTenantContext(pageEvent.pageIndex);
	}

	tenantContextSearchWithFilter() {
		this.tenantContextFilters.id = this.tenantContextSearchFormGroup.controls.id.value;
		this.tenantContextFilters.name = this.tenantContextSearchFormGroup.controls.name.value;

		this.searchTenantContext(0);
	}
	//			---- !TENANT CONTEXT SECTION ----


}

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
	tenantContextPagination: any;
	tenantContextFilters: any;

	tenantContextLength: number;
	tenantContextDTOs: TenantContextDTO[];
	tenantContextError: any;

	tenantContextDC: string[];


	private initTenantContextSearch() {
		this.tenantContextDC = ["id", "name", "contextCode", "buttons"];

		this.tenantContextPagination = {
			page: 0,
			size: 2,
		}

		this.tenantContextSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	private clearFiltersTenantContext() {
		this.tenantContextFilters = {
			id: null,
			name: null,
		}
	}

	private async searchTenantContext() {
		try {
			this.tenantContextLength = await this.tenantContextResourceService.countTenantContextsUsingGET().toPromise();
			this.tenantContextDTOs = await this.tenantContextResourceService.getAllTenantContextsUsingGET(null, null, null, null, null, null, this.tenantContextFilters.id, null, null, null, null, null, null, null, null, null, null, null, null, null, this.tenantContextFilters.name, null, null, null, null, null, null, null, null, null, null, null, this.tenantContextPagination.page, this.tenantContextPagination.size).toPromise();
		} catch (e) {
			this.tenantContextError = e;
		}
	}

	showAllTenantContext() {
		this.clearFiltersTenantContext();
		this.searchTenantContext();
	}

	tenantContextPaginationEvent(pageEvent: PageEvent) {
		this.tenantContextPagination.size = pageEvent.pageSize;
		this.tenantContextPagination.page = pageEvent.pageIndex;

		this.searchTenantContext();
	}

	tenantContextSearchWithFilter() {
		this.tenantContextFilters.id = this.tenantContextSearchFormGroup.controls.id.value;
		this.tenantContextFilters.name = this.tenantContextSearchFormGroup.controls.name.value;

		this.searchTenantContext();
	}
	//			---- !TENANT CONTEXT SECTION ----


}

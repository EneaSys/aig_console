import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
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
		private _snackBar: MatSnackBar,
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
		this.tenantContextPagination = {
			size: 10,
			page: 0
		}
	
		this.tenantContextSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.tenantContextDC = ["id", "name", "contextCode", "buttons"];
	}

	private clearFiltersTenantContext() {
		this.tenantContextFilters = {
			id: null,
			name: null,
		}
	}

	private async searchTenantContext(page: number) {
		this.tenantContextPagination.page = page;
		this.tenantContextDTOs = null;
		try {
			this.tenantContextLength = await this.tenantContextResourceService.countTenantContextsUsingGET(null,null,null,null,null,null,this.tenantContextFilters.id,null,null,null,null,null,null,null,null,null,null,null,null,null,this.tenantContextFilters.name).toPromise(); //mettere i 
			
			if(this.tenantContextLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tenantContextDTOs = [];
				return;
			}

			this.tenantContextDTOs = await this.tenantContextResourceService.getAllTenantContextsUsingGET(null, null, null, null, null, null, this.tenantContextFilters.id, null, null, null, null, null, null, null, null, null, null, null, null, null, this.tenantContextFilters.name, null, null, null, null, null, null, null, null, null, null, null, this.tenantContextPagination.page, this.tenantContextPagination.size).toPromise();
		} catch (e) {
			this.tenantContextError = e;
		}
	}

	showAllTenantContext() {
		this.resetFiltersTenantContext();
	}

	resetFiltersTenantContext() {
		this.tenantContextSearchFormGroup.reset();
		this.clearFiltersTenantContext();
		this.searchTenantContext(0);
	}

	tenantContextPaginationEvent(pageEvent: PageEvent) {
		this.tenantContextPagination.size = pageEvent.pageSize;
		this.searchTenantContext(pageEvent.pageIndex);
	}

	tenantContextSearchWithFilter() {
		let searchedId = this.tenantContextSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTenantContext();
			this.tenantContextSearchFormGroup.reset();
			this.tenantContextFilters.id = searchedId;
			this.searchTenantContext(0);
			return;
		}

		this.tenantContextFilters.name = this.tenantContextSearchFormGroup.controls.name.value;

		this.searchTenantContext(0);
	}


	
	//			---- !TENANT CONTEXT SECTION ----


}

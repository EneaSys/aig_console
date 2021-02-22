import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { TenantContextDTO, TenantContextResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigTenantContextNewUpdateModalComponent } from '../tenant-context-new-update-modal/tenant-context-new-update-modal.component';

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
		this.tenantContextPaginationSize = 10;
	
		this.tenantContextSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			contextCode: [''],
			nameDatabase: [''],
		});

		this.tenantContextDC = ["id", "name", "contextCode","nameDatabase", "buttons"];
	}

	private clearFiltersTenantContext() {
		this.tenantContextFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchTenantContext(page: number) {

		this.tenantContextDTOs = null;
		this.tenantContextFilters.page = page;
		this.tenantContextFilters.size = this.tenantContextPaginationSize;
				
		try {
			this.tenantContextLength = await this.tenantContextResourceService.countTenantContextsUsingGET(this.tenantContextFilters).toPromise(); 
			
			if(this.tenantContextLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tenantContextDTOs = [];
				return;
			}

			this.tenantContextDTOs = await this.tenantContextResourceService.getAllTenantContextsUsingGET(this.tenantContextFilters).toPromise();
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
		this.tenantContextPaginationSize = pageEvent.pageSize;
		this.searchTenantContext(pageEvent.pageIndex);
	}

	tenantContextSearchWithFilter() {
		let searchedId = this.tenantContextSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTenantContext();
			this.tenantContextSearchFormGroup.reset();
			this.tenantContextFilters.idEquals = searchedId;
			this.searchTenantContext(0);
			return;
		}
		this.tenantContextFilters.idEquals = null;

		this.tenantContextFilters.nameContains = this.tenantContextSearchFormGroup.controls.name.value;

		this.searchTenantContext(0);
	}

	newTenantContext(): void {
		this.dialog.open(AigTenantContextNewUpdateModalComponent, { data: { tenantContext: {} } });
   }

	
	//			---- !TENANT CONTEXT SECTION ----


}

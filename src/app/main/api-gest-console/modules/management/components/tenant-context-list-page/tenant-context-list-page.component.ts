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
	tenantContextSearchFormGroup: FormGroup;

	constructor(
		private tenantContextResourceService: TenantContextResourceService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	tenantContextDTOs: TenantContextDTO[];
	tenantContextDC: string[] = ["id", "name", "contextCode", "buttons"];
	tenantContextError: any;

	length: number;
	page: number;
	size: number = 2;
	id: number;
	name: string;

	loadPage() {
		this.reloadPage();

		this.tenantContextSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}

	reloadPage() {
		this.reloadTenantContextTable();
	}




	async reloadTenantContextTable() {
		try {
			this.length = await this.tenantContextResourceService.countTenantContextsUsingGET().toPromise();
			this.tenantContextDTOs = await this.tenantContextResourceService.getAllTenantContextsUsingGET(null, null, null, null, null, null, this.id, null, null, null, null, null, null, null, null, null, null, null, null, null, this.name, null, null, null, null, null, null, null, null, null, null, null, this.page, this.size).toPromise();
		} catch (e) {
			this.tenantContextError = e;
		}
	}

	tenantContextPaginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadTenantContextTable();
	}

	tenantContextSearch() {
		this.id = this.tenantContextSearchFormGroup.controls.id.value;
		this.name = this.tenantContextSearchFormGroup.controls.name.value;

		this.reloadTenantContextTable();
	}
}

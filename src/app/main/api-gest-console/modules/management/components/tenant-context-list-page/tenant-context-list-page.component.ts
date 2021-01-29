import { Component, OnInit } from '@angular/core';
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
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	tenantContextDTOs: TenantContextDTO[];
	tenantContextDC: string[] = [ "id", "name", "contextCode", "buttons" ];
	tenantContextError: any;

	length: number;
	page: number;
	size: number = 2;
	
	loadPage() {
		this.reloadPage();
	}

	paginationEvent(pageEvent: PageEvent) {
		this.page = pageEvent.pageIndex;
		this.size = pageEvent.pageSize;

		this.reloadPage();
	}
	
	async reloadPage() {
		try {
			this.length = await this.tenantContextResourceService.countTenantContextsUsingGET().toPromise();
			this.tenantContextDTOs = await this.tenantContextResourceService.getAllTenantContextsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,this.size).toPromise();
		} catch(e) {
			this.tenantContextError = e;
		}
	}
}

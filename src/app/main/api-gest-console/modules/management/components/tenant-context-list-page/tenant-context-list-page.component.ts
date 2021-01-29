import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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

	async loadPage() {
		try {
			this.tenantContextDTOs = await this.tenantContextResourceService.getAllTenantContextsUsingGET().toPromise();
		} catch(e) {
			this.tenantContextError = e;
		}
	}

	reloadPage() {

	}
}

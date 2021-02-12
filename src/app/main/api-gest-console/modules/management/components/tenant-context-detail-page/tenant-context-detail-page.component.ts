import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TenantContextDTO, TenantContextResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigTenantContextNewUpdateModalComponent } from '../tenant-context-new-update-dialog/tenant-context-new-update-dialog.component';

@Component({
	selector: 'aig-tenant-context-detail-page',
	templateUrl: './tenant-context-detail-page.component.html',
	styleUrls: ['./tenant-context-detail-page.component.scss']
})
export class AigTenantContextDetailPageComponent extends GenericComponent {
    constructor(
        private tenantContextResourceService: TenantContextResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

	tenantContextDTO: TenantContextDTO;

    loadPage() {
		this.tenantContextDTO = this.route.snapshot.data.tenantContext;
	}

	async reloadPage() {
		this.tenantContextDTO = await this.tenantContextResourceService.getTenantContextUsingGET(this.tenantContextDTO.id).toPromise();
	}
	
    editTenantContext(tenantContextDTO: TenantContextDTO) {
		this.dialog.open(AigTenantContextNewUpdateModalComponent, { data: { tenantContext: tenantContextDTO } });
    }
}

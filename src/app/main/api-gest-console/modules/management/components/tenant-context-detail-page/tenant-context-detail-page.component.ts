import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { TenantContextDTO, TenantContextResourceService } from 'aig-management';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigTenantContextNewUpdateModalComponent } from '../tenant-context-new-update-modal/tenant-context-new-update-modal.component';

@Component({
	selector: 'aig-tenant-context-detail-page',
	templateUrl: './tenant-context-detail-page.component.html',
	styleUrls: ['./tenant-context-detail-page.component.scss']
})
export class AigTenantContextDetailPageComponent extends GenericComponent {
    constructor(
        private tenantContextResourceService: TenantContextResourceService,
        private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
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

	async deleteTenantContext(id: number) {
		this._fuseProgressBarService.show();
	
		try {
			await this.tenantContextResourceService.deleteTenantContextUsingDELETE(id).toPromise();
	
			this._snackBar.open(`Tenant Context: '${id}' deleted.`, null, { duration: 2000, });
			
			this.router.navigate(['/m8t', 'tenant-context']);
		} catch (e) {
			this._snackBar.open(`Error during deleting tenant context: '${id}'. (${e.message})`, null, { duration: 5000, });
		}
		this._fuseProgressBarService.hide();
	}
	
    editTenantContext(tenantContextDTO: TenantContextDTO) {
		this.dialog.open(AigTenantContextNewUpdateModalComponent, { data: { tenantContext: tenantContextDTO } });
    }

}

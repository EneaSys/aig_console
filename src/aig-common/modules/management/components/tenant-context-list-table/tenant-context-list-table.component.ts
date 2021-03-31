import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { TenantContextDTO, TenantContextResourceService } from 'aig-management';
import { AigTenantContextNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/tenant-context-new-update-modal/tenant-context-new-update-modal.component';

@Component({
	selector: 'aig-tenant-context-list-table',
	templateUrl: './tenant-context-list-table.component.html',
	styleUrls: ['./tenant-context-list-table.component.scss']
})
export class AigTenantContextListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
	error: any;
	
	constructor(
        private tenantContextResourceService: TenantContextResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
		private router: Router,
	) { }

	ngOnInit(): void { }

	async deleteTenantContext(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.tenantContextResourceService.deleteTenantContextUsingDELETE(id).toPromise();
            this._snackBar.open(`Tenant Context: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Tenant Context: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTenantContext(tenantContextDTO: TenantContextDTO) {
        this.dialog.open(AigTenantContextNewUpdateModalComponent, { data: { tenantContext: tenantContextDTO } });
    }
}

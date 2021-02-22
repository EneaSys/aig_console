import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { PermissionDTO, PermissionResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPermissionNewUpdateModalComponent } from '../permission-new-update-modal/permission-new-update-modal.component';

@Component({
    selector: 'aig-permission-list-page',
    templateUrl: './permission-list-page.component.html',
    styleUrls: ['./permission-list-page.component.scss']
})
export class AigPermissionListPageComponent extends GenericComponent {
	
	constructor(
		private permissionResourceService: PermissionResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	

	loadPage() {
		this.initPermissionSearch();

		this.showAllPermission();
	}
	
	reloadPage() {
		this.showAllPermission();
	}

		//			---- PERMISSION TABLE AND SEARCH SECTION ----

	permissionSearchFormGroup: FormGroup;
	permissionPaginationSize: number;
	permissionFilters: any;
	
	permissionLength: number;
	permissionDTOs: PermissionDTO[]; 
	permissionError: any;

	permissionDC: string[];
	

	private initPermissionSearch() {

		this.permissionPaginationSize = 10;

		this.permissionSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
            permissionCode: [''],
		});

		this.permissionDC = ["id", "name","permissionCode", "buttons"];
	}

	private clearFiltersPermission() {
		this.permissionFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchPermission(page: number) {

		this.permissionDTOs = null;
		this.permissionFilters.page = page;
		this.permissionFilters.size = this.permissionPaginationSize;

		try {
			this.permissionLength = await this.permissionResourceService.countPermissionsUsingGET(this.permissionFilters).toPromise();
			
			if(this.permissionLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.permissionDTOs = [];
				return;
			}

			this.permissionDTOs = await this.permissionResourceService.getAllPermissionsUsingGET(this.permissionFilters).toPromise();
		} catch (e) {
			this.permissionError = e;
		}
	}

	showAllPermission() {
		this.resetFiltersPermission();
	}

	resetFiltersPermission() {
		this.permissionSearchFormGroup.reset();
		this.clearFiltersPermission();
		this.searchPermission(0);
	}
	
	permissionPaginationEvent(pageEvent: PageEvent) {
		this.permissionPaginationSize = pageEvent.pageSize;
		this.searchPermission(pageEvent.pageIndex);
	}

	permissionSearchWithFilter() {
		let searchedId = this.permissionSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPermission();
			this.permissionSearchFormGroup.reset();
			this.permissionFilters.idEquals = searchedId;
			this.searchPermission(0);
			return;
		}
		this.permissionFilters.idEquals = null;

		this.permissionFilters.nameContains = this.permissionSearchFormGroup.controls.name.value;

		this.searchPermission(0);
	}

	newPermission(): void {
		this.dialog.open(AigPermissionNewUpdateModalComponent, { data: { permission: {} } });
   }

}


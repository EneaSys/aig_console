import { Component } from '@angular/core';
import { PermissionResourceService, PermissionDTO } from 'api-gest';
import { AigPermissionNewDialogComponent } from '../permission-new-dialog/permission-new-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    templateUrl: './permission-list-page.component.html',
    styleUrls: ['./permission-list-page.component.scss']
})
export class AigPermissionListPageComponent extends GenericComponent {
    constructor(
        private permissionResourceService: PermissionResourceService,
        private dialog: MatDialog,
        private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
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
	permissionPagination: any;
	permissionFilters: any;

	permissionLength: number;
	permissionDTOs: PermissionDTO[];
	permissionError: any;

	permissionDC: string[];

    private initPermissionSearch() {
		this.permissionPagination = {
			size: 10,
			page: 0
		}
	
		this.permissionSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.permissionDC = ['id', 'name', 'permissionCode', 'moduleName',"buttons"];
	}

    private clearFiltersPermission() {
		this.permissionFilters = {
			id: null,
			name: null,
		}
	}

    private async searchPermission(page: number) {
		this.permissionPagination.page = page;
		this.permissionDTOs = null;
		try {
			this.permissionLength = await this.permissionResourceService.countPermissionsUsingGET(this.permissionFilters.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.permissionFilters.name).toPromise(); //mettere i 
			
			if(this.permissionLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.permissionDTOs = [];
				return;
			}

			this.permissionDTOs = await this.permissionResourceService.getAllPermissionsUsingGET(this.permissionFilters.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.permissionFilters.name,null,null,null,null,null,this.permissionPagination.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.permissionPagination.size).toPromise();
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
		this.permissionPagination.size = pageEvent.pageSize;
		this.searchPermission(pageEvent.pageIndex);
	}

	permissionSearchWithFilter() {
		let searchedId = this.permissionSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPermission();
			this.permissionSearchFormGroup.reset();
			this.permissionFilters.id = searchedId;
			this.searchPermission(0);
			return;
		}
		this.permissionFilters.id = null;

		this.permissionFilters.name = this.permissionSearchFormGroup.controls.name.value;

		this.searchPermission(0);
	}

	newPermission(): void {
		this.dialog.open(AigPermissionNewDialogComponent, { data: { producer: {} } });
   }
	
	//			---- !PERMISSION SECTION ----

	
}
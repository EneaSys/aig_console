import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { AigManagementAutocompleteFilterService } from 'aig-common/modules/management/services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from 'aig-common/modules/management/services/form/autocomplete-function.service';
import { ApplicationModuleDTO, PermissionDTO, PermissionResourceService } from 'aig-management';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
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
		public managementFilterService: AigManagementAutocompleteFilterService,
		public managementAutocompleteService: AigManagementAutocompleteFunctionService,
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
	
	filteredApplicationModule: Observable<ApplicationModuleDTO[]>;

	private initPermissionSearch() {

		this.permissionPaginationSize = 100;

		this.permissionSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
            permissionCode: [''],
			applicationModule: [''],
		});

		this.filteredApplicationModule = this.managementFilterService.applicationModuleFilter(this.permissionSearchFormGroup.controls['applicationModule'].valueChanges);

		this.permissionDC = ["id", "name","permissionCode","moduleName","buttons"];
	}

	private clearFiltersPermission() {
		this.permissionFilters = {
			idEquals: null,
			nameContains: null,
			permissionCodeContains: null,
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
		let searchedId = this.permissionSearchFormGroup.value.id;

		if(searchedId != null) {
			this.clearFiltersPermission();
			this.permissionSearchFormGroup.reset();
			this.permissionFilters.permissionIDEquals = searchedId;
			this.searchPermission(0);
			return;
		}
		this.permissionFilters.permissionIDEquals = null;

		if(this.permissionSearchFormGroup.value.name){
			this.permissionFilters.permissionNameContains = this.permissionSearchFormGroup.value.name;
		}

		if(this.permissionSearchFormGroup.value.applicationModule){
			this.permissionFilters.applicationModuleIDEquals = this.permissionSearchFormGroup.value.applicationModule.id;
		}

		if(this.permissionSearchFormGroup.value.permissionCode){
			this.permissionFilters.permissionCodeContains = this.permissionSearchFormGroup.value.permissionCode;
		}

		this.searchPermission(0);
	}

	newPermission(): void {
		this.dialog.open(AigPermissionNewUpdateModalComponent, { data: {} });
   	}

	async publish() {
		await this.permissionResourceService.publishPermissionUsingGET(this.permissionFilters).toPromise();
	}

}

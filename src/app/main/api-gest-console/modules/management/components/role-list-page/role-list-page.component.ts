import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { EventService } from "aig-common/event-manager/event.service";
import { AigManagementAutocompleteFilterService } from "aig-common/modules/management/services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "aig-common/modules/management/services/form/autocomplete-function.service";
import { ApplicationModuleDTO, RoleDTO, RoleResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigRoleNewUpdateModalComponent } from "../role-new-update-modal/role-new-update-modal.component";

@Component({
    selector: 'aig-role-list-page',
    templateUrl: './role-list-page.component.html',
    styleUrls: ['./role-list-page.component.scss']
})
export class AigRoleListPageComponent extends GenericComponent {
    constructor(
        private roleResourceService: RoleResourceService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,        
		public managementFilterService: AigManagementAutocompleteFilterService,
		public managementAutocompleteService: AigManagementAutocompleteFunctionService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    
	loadPage() {
		this.initRoleSearch();

		this.showAllRole();
	}

	reloadPage() {
		this.showAllRole();
	}

    //			---- TABLE AND SEARCH SECTION ----

    roleSearchFormGroup: FormGroup;
    rolePaginationSize: number;
    roleFilters: any;

	roleLength: number;
	roleDTOs: RoleDTO[];
	roleError: any;

	roleDC: string[];

	filteredApplicationModule: Observable<ApplicationModuleDTO[]>;

    private initRoleSearch() {
		
		this.rolePaginationSize = 100;
		
		this.roleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
            roleCode: [''],
			applicationModule: [''],
		});

		this.filteredApplicationModule = this.managementFilterService.applicationModuleFilter(this.roleSearchFormGroup.controls['applicationModule'].valueChanges);

        this.roleDC = ["id", "name", 'roleCode','moduleName','permissions','buttons'];
	}

    private clearFiltersRole() {
		this.roleFilters = {
			idEquals: null,
			nameContains: null,
			roleCodeContains: null,
			page: 0,
		}
	}

    private async searchRole(page: number) {

		this.roleDTOs = null;
		this.roleFilters.page = page;
		this.roleFilters.size = this.rolePaginationSize;

		try {
			this.roleLength = await this.roleResourceService.countRolesUsingGET(this.roleFilters).toPromise();
			
			if(this.roleLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.roleDTOs = [];
				return;
			}

			this.roleDTOs = await this.roleResourceService.getAllRolesUsingGET(this.roleFilters).toPromise();
		} catch (e) {
			this.roleError = e;
		}
	}

	showAllRole() {
		this.resetFiltersRole();
	}

	resetFiltersRole() {
		this.roleSearchFormGroup.reset();
		this.clearFiltersRole();
		this.searchRole(0);
	}
	
	rolePaginationEvent(pageEvent: PageEvent) {
		this.rolePaginationSize = pageEvent.pageSize;
		this.searchRole(pageEvent.pageIndex);
	}

	roleSearchWithFilter() {
		let searchedId = this.roleSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersRole();
			this.roleSearchFormGroup.reset();
			this.roleFilters.roleIDEquals = searchedId;
			this.searchRole(0);
			return;
		}
		this.roleFilters.roleIDEquals = null;

		if(this.roleSearchFormGroup.value.name){
			this.roleFilters.roleNameContains = this.roleSearchFormGroup.controls.name.value;
		}

		if(this.roleSearchFormGroup.value.roleCode){
			this.roleFilters.roleCodeContains = this.roleSearchFormGroup.controls.roleCode.value;
		}

		if(this.roleSearchFormGroup.value.applicationModule){
			this.roleFilters.applicationModuleIDEquals = this.roleSearchFormGroup.value.applicationModule.id;
		}
		this.roleFilters.idEquals = null;

		this.searchRole(0);
	}

	newRole(): void {
		this.dialog.open(AigRoleNewUpdateModalComponent, { data: {} });
   	}
	
	async publish() {
		await this.roleResourceService.publishRoleUsingGET(this.roleFilters).toPromise();
	}
}


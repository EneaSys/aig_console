import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { EventService } from "aig-common/event-manager/event.service";
import { RoleDTO, RoleResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
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

    private initRoleSearch() {
		
		this.rolePaginationSize = 100;
		
		this.roleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
            roleCode: [''],
		});

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
			this.roleFilters.idEquals = searchedId;
			this.searchRole(0);
			return;
		}

		if(this.roleSearchFormGroup.controls.name.value){
			this.roleFilters.nameContains = this.roleSearchFormGroup.controls.name.value;
		}

		if(this.roleSearchFormGroup.controls.roleCode.value){
			this.roleFilters.roleCodeContains = this.roleSearchFormGroup.controls.roleCode.value;
		}

		this.roleFilters.idEquals = null;

		this.searchRole(0);
	}

	newRole(): void {
		this.dialog.open(AigRoleNewUpdateModalComponent, { data: {} });
   	}
	
	async publish() {
		await this.roleResourceService.publishUsingGET9(this.roleFilters).toPromise();
	}
}


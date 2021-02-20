import { Component, OnInit } from '@angular/core';
import { RoleResourceService, RoleDTO } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AigRoleNewDialogComponent } from '../role-new-dialog/role-new-dialog.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

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
        private eventService: EventService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    
	loadPage() {
		this.roleSearch();

		this.showAllrole();
	}

	reloadPage() {
		this.showAllrole();
	}

    //			---- TABLE AND SEARCH SECTION ----

    roleSearchFormGroup: FormGroup;
    rolePaginationSize: number;
    roleFilters: any;

	roleLength: number;
	roleDTOs: RoleDTO[];
	roleError: any;

	roleDC: string[];

    private roleSearch() {
		this.roleDC = ["id", "name", 'roleCode','permission', 'buttons'];

		this.rolePaginationSize = 10;
		

		this.roleSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});
	}
    roleSystemDisplayedColumns: string[] = ['id', 'name', 'roleCode', 'buttons'];
    roleSystemDataSource: Observable<RoleDTO[]>;

    loadComponent(): void {
        this.roleSystemDataSource = this.roleResourceService.getAllRolesUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 100, null);
    }

    newRole(): void {
        this.dialog.open(AigRoleNewDialogComponent);
    }
}


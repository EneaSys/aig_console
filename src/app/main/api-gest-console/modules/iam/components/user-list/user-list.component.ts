import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ContextUserDTO, ContextUserResourceService } from 'aig-entity-manager';
import { AigContextUserNewUpdateDialogComponent } from '../context-user-new-update-dialog/context-user-new-update-dialog.component';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class AigUserListComponent extends GenericComponent {
    constructor(
        private contextUserResourceService: ContextUserResourceService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initUserSearch();

        this.showAllUser();
    }

    reloadPage() {
        this.showAllUser();
    }

    //			---- USER TABLE AND SEARCH SECTION ----

    userSearchFormGroup: FormGroup;
	userPaginationSize: number;
	userFilters: any;

	userLength: number;
	userDTOs: ContextUserDTO[];
	userError: any;

	userDC: string[];

    private initUserSearch() {
		this.userDC = ['usercode', 'email', 'status', 'type', 'buttons'];

		this.userPaginationSize = 20;
		

		this.userSearchFormGroup = this._formBuilder.group({
			id: [''],
			userCode: [''],
		});
	}
    
    private clearFiltersUser() {
		this.userFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

    private async searchUser(page: number) {
		this.userDTOs = null;

		this.userFilters.page = page;
		this.userFilters.size = this.userPaginationSize;

		try {                                                                       
			this.userLength = await this.contextUserResourceService.countContextUsersUsingGET(this.userFilters).toPromise();
			
			if(this.userLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.userDTOs = [];
				return;
			}

			this.userDTOs = await this.contextUserResourceService.getAllContextUsersUsingGET(this.userFilters).toPromise();
		} catch (e) {
			this.userError = e;
		}
	}

    showAllUser() {
        this.resetFiltersUser();
    }

    resetFiltersUser() {
		this.userSearchFormGroup.reset();
		this.clearFiltersUser();
		this.searchUser(0);

	}

    userPaginationEvent(pageEvent: PageEvent) {
		this.userPaginationSize = pageEvent.pageSize;
		this.searchUser(pageEvent.pageIndex);
	}

    userSearchWithFilter() {
		let searchedId = this.userSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersUser();
			this.userSearchFormGroup.reset();
			this.userFilters.idEquals = searchedId;
			this.searchUser(0);
			return;
		}
		this.userFilters.idEquals = null;

		this.userFilters.nameContains = this.userSearchFormGroup.controls.name.value;

		this.searchUser(0);
	}

    newUser() {
        this.dialog.open(AigContextUserNewUpdateDialogComponent, { data: {} });
    }



}


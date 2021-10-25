import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ContextUserDTO, ContextUserResourceService } from 'aig-management';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContextUserNewUpdateModalComponent } from '../context-user-new-update-modal/context-user-new-update-modal.component';

@Component({
    selector: 'aig-context-user-list-page',
    templateUrl: './context-user-list-page.component.html',
    styleUrls: ['./context-user-list-page.component.scss']
})
export class AigContextUserListPageComponent extends GenericComponent {
	
	constructor(
		private contextUserResourceService: ContextUserResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	

	loadPage() {
		this.initContextUserSearch();

		this.showAllContextUser();
	}
	
	reloadPage() {
		this.showAllContextUser();
	}

		//			---- CONTEXT USER TABLE AND SEARCH SECTION ----

	contextUserSearchFormGroup: FormGroup;
	contextUserPaginationSize: number;
	contextUserFilters: any;
	
	contextUserLength: number;
	contextUserDTOs: ContextUserDTO[]; 
	contextUserError: any;

	contextUserDC: string[];
	

	private initContextUserSearch() {

		this.contextUserPaginationSize = 10;

		this.contextUserSearchFormGroup = this._formBuilder.group({
			id: [''],
			userCode: [''],
		});

		this.contextUserDC = ["id", "userCode", "buttons"];
	}

	private clearFiltersContextUser() {
		this.contextUserFilters = {
			idEquals: null,
			userCodeContains: null,
			page: 0,
		}
	}

	private async searchContextUser(page: number) {

		this.contextUserDTOs = null;
		this.contextUserFilters.page = page;
		this.contextUserFilters.size = this.contextUserPaginationSize;

		try {
			this.contextUserLength = await this.contextUserResourceService.countContextUsersUsingGET(this.contextUserFilters).toPromise();
			
			if(this.contextUserLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.contextUserDTOs = [];
				return;
			}

			this.contextUserDTOs = await this.contextUserResourceService.getAllContextUsersUsingGET(this.contextUserFilters).toPromise();
		} catch (e) {
			this.contextUserError = e;
		}
	}

	showAllContextUser() {
		this.resetFiltersContextUser();
	}

	resetFiltersContextUser() {
		this.contextUserSearchFormGroup.reset();
		this.clearFiltersContextUser();
		this.searchContextUser(0);
	}
	
	contextUserPaginationEvent(pageEvent: PageEvent) {
		this.contextUserPaginationSize = pageEvent.pageSize;
		this.searchContextUser(pageEvent.pageIndex);
	}

	contextUserSearchWithFilter() {
		let searchedId = this.contextUserSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersContextUser();
			this.contextUserSearchFormGroup.reset();
			this.contextUserFilters.idEquals = searchedId;
			this.searchContextUser(0);
			return;
		}
		this.contextUserFilters.idEquals = null;

		if(this.contextUserSearchFormGroup.controls.userCode.value){
			this.contextUserFilters.userCodeContains = this.contextUserSearchFormGroup.controls.userCode.value;
		}
		
		this.searchContextUser(0);
	}

	newContextUser(): void {
		this.dialog.open(AigContextUserNewUpdateModalComponent, { data: {} });
    }

	async publish() {
		await this.contextUserResourceService.publishUsingGET1(this.contextUserFilters).toPromise();
	}

}
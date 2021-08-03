import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { EntityReferenceDTO, LicenzeDTO, LicenzeResourceService, UserLicenzeDTO, UserLicenzeResourceService,  } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigEntityReferenceNewUpdateModalComponent } from "../entity-reference-new-update-modal/entity-reference-new-update-modal.component";
import { AigLicenceNewUpdateDialogComponent } from "../licence-new-update-dialog/licence-new-update-dialog.component";
import { AigUserLicenceNewUpdateDialogComponent } from "../user-licence-new-update-dialog/user-licence-new-update-dialog.component";

@Component({
	selector: 'aig-user-licence-list-page',
	templateUrl: './user-licence-list-page.component.html',
	styleUrls: ['./user-licence-list-page.component.scss']
})
export class AigUserLicenceListPageComponent extends GenericComponent {
	constructor(
		private userLicenceResourceService: UserLicenzeResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initUserLicenceSearch();

		this.showAllUserLicence();
	}

	reloadPage() {
		this.showAllUserLicence();
	}


	//			---- user Licence TABLE AND SEARCH SECTION ----

	userLicenceSearchFormGroup: FormGroup;
	userLicencePaginationSize: number;
	userLicenceFilters: any;

	userLicenceLength: number;
	userLicenceDTOs: UserLicenzeDTO[];
	userLicenceError: any;

	userLicenceDC: string[];


	private initUserLicenceSearch() {
		this.userLicencePaginationSize = 10;
	
		this.userLicenceSearchFormGroup = this._formBuilder.group({
			id: [''],
			active: [''],
		});

		this.userLicenceDC = ["id", "licenzeName","active","buttons"];
	}

	private clearFiltersUserLicence() {
		this.userLicenceFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchUserLicence(page: number) {

		this.userLicenceDTOs = null;
		this.userLicenceFilters.page = page;
		this.userLicenceFilters.size = this.userLicencePaginationSize;
		
		try {
			this.userLicenceLength = await this.userLicenceResourceService.countUserLicenzesUsingGET(this.userLicenceFilters).toPromise();  
			
			if(this.userLicenceLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.userLicenceDTOs = [];
				return;
			}
			this.userLicenceDTOs = await this.userLicenceResourceService.getAllUserLicenzesUsingGET(this.userLicenceFilters).toPromise();
		} catch (e) {
			this.userLicenceError = e;
		}
	}

	showAllUserLicence() {
		this.resetFiltersUserLicence();
	}

	resetFiltersUserLicence() {
		this.userLicenceSearchFormGroup.reset();
		this.clearFiltersUserLicence();
		this.searchUserLicence(0);
	}

	userLicencePaginationEvent(pageEvent: PageEvent) {
		this.userLicencePaginationSize = pageEvent.pageSize;
		this.searchUserLicence(pageEvent.pageIndex);
	}

	userLicenceSearchWithFilter() {
		let searchedId = this.userLicenceSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersUserLicence();
			this.userLicenceSearchFormGroup.reset();
			this.userLicenceFilters.idEquals = searchedId;
			this.searchUserLicence(0);
			return;
		}
		this.userLicenceFilters.idEquals = null;

		this.userLicenceFilters.licence = this.userLicenceSearchFormGroup.controls.name.value;

		this.searchUserLicence(0);
	}

	newUserLicence(): void {
		this.dialog.open(AigUserLicenceNewUpdateDialogComponent, { data: {} });
   }

}

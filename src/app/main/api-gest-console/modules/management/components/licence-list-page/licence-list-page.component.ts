import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigManagementAutocompleteFilterService } from "aig-common/modules/management/services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "aig-common/modules/management/services/form/autocomplete-function.service";
import { ApplicationModuleDTO, EntityReferenceDTO, LicenzeDTO, LicenzeResourceService,  } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigEntityReferenceNewUpdateModalComponent } from "../entity-reference-new-update-modal/entity-reference-new-update-modal.component";
import { AigLicenceNewUpdateDialogComponent } from "../licence-new-update-dialog/licence-new-update-dialog.component";

@Component({
	selector: 'aig-licence-list-page',
	templateUrl: './licence-list-page.component.html',
	styleUrls: ['./licence-list-page.component.scss']
})
export class AigLicenceListPageComponent extends GenericComponent {
	constructor(
		private licenceResourceService: LicenzeResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		public managementFilterService: AigManagementAutocompleteFilterService,
		public managementAutocompleteService: AigManagementAutocompleteFunctionService,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initLicenceSearch();

		this.showAllLicence();
	}

	reloadPage() {
		this.showAllLicence();
	}


	//			---- Licence TABLE AND SEARCH SECTION ----

	licenceSearchFormGroup: FormGroup;
	licencePaginationSize: number;
	licenceFilters: any;

	licenceLength: number;
	licenceDTOs: LicenzeDTO[];
	licenceError: any;

	licenceDC: string[];
	filteredApplicationModule: Observable<ApplicationModuleDTO[]>;


	private initLicenceSearch() {
		this.licencePaginationSize = 10;
	
		this.licenceSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			applicationModule: [''],
		
		});
		this.filteredApplicationModule = this.managementFilterService.applicationModuleFilter(this.licenceSearchFormGroup.controls['applicationModule'].valueChanges);

		this.licenceDC = ["id", "name","applicationModule", "buttons"];
	}

	private clearFiltersLicence() {
		this.licenceFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchLicence(page: number) {

		this.licenceDTOs = null;
		this.licenceFilters.page = page;
		this.licenceFilters.size = this.licencePaginationSize;
		
		try {
			this.licenceLength = await this.licenceResourceService.countLicenzesUsingGET(this.licenceFilters).toPromise();  
			
			if(this.licenceLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.licenceDTOs = [];
				return;
			}
			this.licenceDTOs = await this.licenceResourceService.getAllLicenzesUsingGET(this.licenceFilters).toPromise();
		} catch (e) {
			this.licenceError = e;
		}
	}

	showAllLicence() {
		this.resetFiltersLicence();
	}

	resetFiltersLicence() {
		this.licenceSearchFormGroup.reset();
		this.clearFiltersLicence();
		this.searchLicence(0);
	}

	licencePaginationEvent(pageEvent: PageEvent) {
		this.licencePaginationSize = pageEvent.pageSize;
		this.searchLicence(pageEvent.pageIndex);
	}

	licenceSearchWithFilter() {
		let searchedId = this.licenceSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersLicence();
			this.licenceSearchFormGroup.reset();
			this.licenceFilters.idEquals = searchedId;
			this.searchLicence(0);
			return;
		}
		this.licenceFilters.idEquals = null;

		this.licenceFilters.nameContains = this.licenceSearchFormGroup.value.name;

	
		this.licenceFilters.applicationModuleIDEquals = this.licenceSearchFormGroup.value.applicationModule.id;
		

		this.searchLicence(0);
	}

	newLicence(): void {
		this.dialog.open(AigLicenceNewUpdateDialogComponent, { data: {} });
   	}

	async publish() {
		await this.licenceResourceService.publishUsingGET4(this.licenceFilters).toPromise();
	}

}

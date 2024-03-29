import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigManagementAutocompleteFilterService } from "aig-common/modules/management/services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "aig-common/modules/management/services/form/autocomplete-function.service";
import { ApplicationModuleDTO, PersonalizationDTO, PersonalizationResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigPersonalizationNewUpdateModalComponent } from "../personalization-new-update-modal/personalization-new-update-modal.component";

@Component({
    selector: 'aig-personalization-list-page',
    templateUrl: './personalization-list-page.component.html',
    styleUrls: ['./personalization-list-page.component.scss']
})
export class AigPersonalizationListPageComponent extends GenericComponent {
	
	constructor(
		private personalizationResourceService: PersonalizationResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        private dialog: MatDialog,
		public managementFilterService: AigManagementAutocompleteFilterService,
		public managementAutocompleteService: AigManagementAutocompleteFunctionService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	

	loadPage() {
		this.initPersonalizationSearch();

		this.showAllPersonalization();
	}
	
	reloadPage() {
		this.showAllPersonalization();
	}

		//			---- PERsonalization TABLE AND SEARCH SECTION ----

	personalizationSearchFormGroup: FormGroup;
	personalizationPaginationSize: number;
	personalizationFilters: any;
	
	personalizationLength: number;
	personalizationDTOs: PersonalizationDTO[]; 
	personalizationError: any;

	personalizationDC: string[];
	filteredApplicationModule: Observable<ApplicationModuleDTO[]>;
	

	private initPersonalizationSearch() {

		this.personalizationPaginationSize = 10;

		this.personalizationSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			applicationModule: [''],
		});
		this.filteredApplicationModule = this.managementFilterService.applicationModuleFilter(this.personalizationSearchFormGroup.controls['applicationModule'].valueChanges);

		this.personalizationDC = ["id", "name","applicationModule","buttons"];
	}

	private clearFiltersPersonalization() {
		this.personalizationFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchPersonalization(page: number) {

		this.personalizationDTOs = null;
		this.personalizationFilters.page = page;
		this.personalizationFilters.size = this.personalizationPaginationSize;

		try {
			this.personalizationLength = await this.personalizationResourceService.countPersonalizationsUsingGET(this.personalizationFilters).toPromise();
			
			if(this.personalizationLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.personalizationDTOs = [];
				return;
			}

			this.personalizationDTOs = await this.personalizationResourceService.getAllPersonalizationsUsingGET(this.personalizationFilters).toPromise();
		} catch (e) {
			this.personalizationError = e;
		}
	}

	showAllPersonalization() {
		this.resetFiltersPersonalization();
	}

	resetFiltersPersonalization() {
		this.personalizationSearchFormGroup.reset();
		this.clearFiltersPersonalization();
		this.searchPersonalization(0);
	}
	
	personalizationPaginationEvent(pageEvent: PageEvent) {
		this.personalizationPaginationSize = pageEvent.pageSize;
		this.searchPersonalization(pageEvent.pageIndex);
	}

	personalizationSearchWithFilter() {
		let searchedId = this.personalizationSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPersonalization();
			this.personalizationSearchFormGroup.reset();
			this.personalizationFilters.idEquals = searchedId;
			this.searchPersonalization(0);
			return;
		}
		this.personalizationFilters.idEquals = null;

		this.personalizationFilters.nameContains = this.personalizationSearchFormGroup.controls.name.value;
	
		this.personalizationFilters.applicationModuleIDEquals = this.personalizationSearchFormGroup.value.applicationModule.id;
		

		this.searchPersonalization(0);
	}

	newPersonalization(): void {
		this.dialog.open(AigPersonalizationNewUpdateModalComponent, { data: {} });
   	}
	
	async publish() {
		await this.personalizationResourceService.publishUsingGET6(this.personalizationFilters).toPromise();
	}
}
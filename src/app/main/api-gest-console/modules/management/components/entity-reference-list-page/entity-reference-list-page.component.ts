import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigManagementAutocompleteFilterService } from "aig-common/modules/management/services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "aig-common/modules/management/services/form/autocomplete-function.service";
import { ApplicationModuleDTO, EntityReferenceDTO, EntityReferenceResourceService } from "aig-management";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigEntityReferenceNewUpdateModalComponent } from "../entity-reference-new-update-modal/entity-reference-new-update-modal.component";

@Component({
	selector: 'aig-entity-reference-list-page',
	templateUrl: './entity-reference-list-page.component.html',
	styleUrls: ['./entity-reference-list-page.component.scss']
})
export class AigEntityReferenceListPageComponent extends GenericComponent {
	constructor(
		private entityReferenceResourceService: EntityReferenceResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		public managementFilterService: AigManagementAutocompleteFilterService,
		public managementAutocompleteService: AigManagementAutocompleteFunctionService,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initEntityReferenceSearch();

		this.showAllEntityReference();
	}

	reloadPage() {
		this.showAllEntityReference();
	}


	//			---- ENTITY REFERENCE TABLE AND SEARCH SECTION ----

	entityReferenceSearchFormGroup: FormGroup;
	entityReferencePaginationSize: number;
	entityReferenceFilters: any;

	entityReferenceLength: number;
	entityReferenceDTOs: EntityReferenceDTO[];
	entityReferenceError: any;

	entityReferenceDC: string[];

	filteredApplicationModule: Observable<ApplicationModuleDTO[]>;


	private initEntityReferenceSearch() {
		this.entityReferencePaginationSize = 10;
	
		this.entityReferenceSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			applicationModule: [''],
		});

		this.filteredApplicationModule = this.managementFilterService.applicationModuleFilter(this.entityReferenceSearchFormGroup.controls['applicationModule'].valueChanges);

		this.entityReferenceDC = ["id", "name", "buttons"];
	}

	private clearFiltersEntityReference() {
		this.entityReferenceFilters = {
			idEquals: null,
			nameContains: null,
			page: 0,
		}
	}

	private async searchEntityReference(page: number) {

		this.entityReferenceDTOs = null;
		this.entityReferenceFilters.page = page;
		this.entityReferenceFilters.size = this.entityReferencePaginationSize;
		
		try {
			this.entityReferenceLength = await this.entityReferenceResourceService.countEntityReferencesUsingGET(this.entityReferenceFilters).toPromise();  
			
			if(this.entityReferenceLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.entityReferenceDTOs = [];
				return;
			}
			this.entityReferenceDTOs = await this.entityReferenceResourceService.getAllEntityReferencesUsingGET(this.entityReferenceFilters).toPromise();
		} catch (e) {
			this.entityReferenceError = e;
		}
	}

	showAllEntityReference() {
		this.resetFiltersEntityReference();
	}

	resetFiltersEntityReference() {
		this.entityReferenceSearchFormGroup.reset();
		this.clearFiltersEntityReference();
		this.searchEntityReference(0);
	}

	entityReferencePaginationEvent(pageEvent: PageEvent) {
		this.entityReferencePaginationSize = pageEvent.pageSize;
		this.searchEntityReference(pageEvent.pageIndex);
	}

	entityReferenceSearchWithFilter() {
		let searchedId = this.entityReferenceSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersEntityReference();
			this.entityReferenceSearchFormGroup.reset();
			this.entityReferenceFilters.idEquals = searchedId;
			this.searchEntityReference(0);
			return;
		}
		this.entityReferenceFilters.idEquals = null;

		this.entityReferenceFilters.nameContains = this.entityReferenceSearchFormGroup.controls.name.value;

		
		this.entityReferenceFilters.applicationModuleIDEquals = this.entityReferenceSearchFormGroup.value.applicationModule.id;
		

		this.searchEntityReference(0);
	}

	newEntityReference(): void {
		this.dialog.open(AigEntityReferenceNewUpdateModalComponent, { data: {} });
   	}

	async publish() {
		await this.entityReferenceResourceService.publishUsingGET2(this.entityReferenceFilters).toPromise();
	}

}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { AigManagementAutocompleteFilterService } from 'aig-common/modules/management/services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from 'aig-common/modules/management/services/form/autocomplete-function.service';
import { ApplicationModuleDTO, ContextUserDTO, ObjectReferenceDTO, ObjectReferenceResourceService } from 'aig-management';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { Observable } from 'rxjs';
import { AigContextUserNewUpdateModalComponent } from '../context-user-new-update-modal/context-user-new-update-modal.component';
import { AigObjectReferenceNewUpdateDialogComponent } from '../object-reference-new-update-dialog/object-reference-new-update-dialog.component';

@Component({
    selector: 'aig-object-reference-list-page',
    templateUrl: './object-reference-list-page.component.html',
    styleUrls: ['./object-reference-list-page.component.scss']
})
export class AigObjectReferenceListPageComponent extends GenericComponent {
	
	constructor(
		private objectReferenceResourceService: ObjectReferenceResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        private dialog: MatDialog,
		public managementFilterService: AigManagementAutocompleteFilterService,
		public managementAutocompleteService: AigManagementAutocompleteFunctionService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	

	loadPage() {
		this.initObjectReferenceSearch();

		this.showAllObjectReference();
	}
	
	reloadPage() {
		this.showAllObjectReference();
	}

		//			---- CONTEXT USER TABLE AND SEARCH SECTION ----

    objectReferenceSearchFormGroup: FormGroup;
	objectReferencePaginationSize: number;
	objectReferenceFilters: any;
	
	objectReferenceLength: number;
	objectReferenceDTOs: ObjectReferenceDTO[]; 
	objectReferenceError: any;

	objectReferenceDC: string[];
	filteredApplicationModule: Observable<ApplicationModuleDTO[]>;
	

	private initObjectReferenceSearch() {

		this.objectReferencePaginationSize = 10;

		this.objectReferenceSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			isTypezed: [''],
			haveStatus: [''],
			haveGroup: [''],
			apllicationModule: [''],
			entityId: [''],
			entityName: [''],
		});
		this.filteredApplicationModule = this.managementFilterService.applicationModuleFilter(this.objectReferenceSearchFormGroup.controls['applicationModule'].valueChanges);

		this.objectReferenceDC = ["name","isTypezed","haveStatus","haveGroup", "buttons"];
	}

	private clearFiltersObjectReference() {
		this.objectReferenceFilters = {
			idEquals: null,
			page: 0,
		}
	}

	private async searchObjectReference(page: number) {

		this.objectReferenceDTOs = null;
		this.objectReferenceFilters.page = page;
		this.objectReferenceFilters.size = this.objectReferencePaginationSize;

		try {
			this.objectReferenceLength = await this.objectReferenceResourceService.countObjectReferencesUsingGET(this.objectReferenceFilters).toPromise();
			
			if(this.objectReferenceLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.objectReferenceDTOs = [];
				return;
			}

			this.objectReferenceDTOs = await this.objectReferenceResourceService.getAllObjectReferencesUsingGET(this.objectReferenceFilters).toPromise();
		} catch (e) {
			this.objectReferenceError = e;
		}
	}

	showAllObjectReference() {
		this.resetFiltersObjectReference();
	}

	resetFiltersObjectReference() {
		this.objectReferenceSearchFormGroup.reset();
		this.clearFiltersObjectReference();
		this.searchObjectReference(0);
	}
	
	objectReferencePaginationEvent(pageEvent: PageEvent) {
		this.objectReferencePaginationSize = pageEvent.pageSize;
		this.searchObjectReference(pageEvent.pageIndex);
	}

	objectReferenceSearchWithFilter() {
		let searchedId = this.objectReferenceSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersObjectReference();
			this.objectReferenceSearchFormGroup.reset();
			this.objectReferenceFilters.idEquals = searchedId;
			this.searchObjectReference(0);
			return;
		}
		this.objectReferenceFilters.idEquals = null;
		
		this.objectReferenceFilters.applicationModuleIDEquals = this.objectReferenceSearchFormGroup.value.applicationModule.id;
		

		
		this.searchObjectReference(0);
	}

	newObjectReference(): void {
		this.dialog.open(AigObjectReferenceNewUpdateDialogComponent, { data: {} });
    }

	async publish() {
		await this.objectReferenceResourceService.publishUsingGET5(this.objectReferenceFilters).toPromise();
	}

}
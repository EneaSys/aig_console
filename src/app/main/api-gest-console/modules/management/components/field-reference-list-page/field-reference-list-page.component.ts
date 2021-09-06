import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ContextUserDTO, FieldReferenceDTO, FieldReferenceResourceService, ObjectReferenceDTO, ObjectReferenceResourceService } from 'aig-management';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContextUserNewUpdateModalComponent } from '../context-user-new-update-modal/context-user-new-update-modal.component';
import { AigFieldReferenceNewUpdateDialogComponent } from '../field-reference-new-update-dialog/field-reference-new-update-dialog.component';
import { AigObjectReferenceNewUpdateDialogComponent } from '../object-reference-new-update-dialog/object-reference-new-update-dialog.component';

@Component({
    selector: 'aig-field-reference-list-page',
    templateUrl: './field-reference-list-page.component.html',
    styleUrls: ['./field-reference-list-page.component.scss']
})
export class AigFieldReferenceListPageComponent extends GenericComponent {
	
	constructor(
		private fieldReferenceResourceService: FieldReferenceResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	

	loadPage() {
		this.initFieldReferenceSearch();

		this.showAllFieldReference();
	}
	
	reloadPage() {
		this.showAllFieldReference();
	}

		//			---- CONTEXT USER TABLE AND SEARCH SECTION ----

    fieldReferenceSearchFormGroup: FormGroup;
	fieldReferencePaginationSize: number;
	fieldReferenceFilters: any;
	
	fieldReferenceLength: number;
	fieldReferenceDTOs: FieldReferenceDTO[]; 
	fieldReferenceError: any;

	fieldReferenceDC: string[];
	

	private initFieldReferenceSearch() {

		this.fieldReferencePaginationSize = 10;

		this.fieldReferenceSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
	
		});

		this.fieldReferenceDC = ["name","type","isRequired","isUnique","minLength","maxLength","patternValue","minBytesValue","maxBytesValue", "buttons"];
	}

	private clearFiltersFieldReference() {
		this.fieldReferenceFilters = {
			idEquals: null,
			page: 0,
		}
	}

	private async searchFieldReference(page: number) {

		this.fieldReferenceDTOs = null;
		this.fieldReferenceFilters.page = page;
		this.fieldReferenceFilters.size = this.fieldReferencePaginationSize;

		try {
			this.fieldReferenceLength = await this.fieldReferenceResourceService.countFieldReferencesUsingGET(this.fieldReferenceFilters).toPromise();
			
			if(this.fieldReferenceLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.fieldReferenceDTOs = [];
				return;
			}

			this.fieldReferenceDTOs = await this.fieldReferenceResourceService.getAllFieldReferencesUsingGET(this.fieldReferenceFilters).toPromise();
		} catch (e) {
			this.fieldReferenceError = e;
		}
	}

	showAllFieldReference() {
		this.resetFiltersFieldReference();
	}

	resetFiltersFieldReference() {
		this.fieldReferenceSearchFormGroup.reset();
		this.clearFiltersFieldReference();
		this.searchFieldReference(0);
	}
	
	fieldReferencePaginationEvent(pageEvent: PageEvent) {
		this.fieldReferencePaginationSize = pageEvent.pageSize;
		this.searchFieldReference(pageEvent.pageIndex);
	}

	fieldReferenceSearchWithFilter() {
		let searchedId = this.fieldReferenceSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersFieldReference();
			this.fieldReferenceSearchFormGroup.reset();
			this.fieldReferenceFilters.idEquals = searchedId;
			this.searchFieldReference(0);
			return;
		}
		this.fieldReferenceFilters.idEquals = null;

		
		this.searchFieldReference(0);
	}

	newFieldReference(): void {
		this.dialog.open(AigFieldReferenceNewUpdateDialogComponent, { data: {} });
    }

	async publish() {
		await this.fieldReferenceResourceService.publishUsingGET4(this.fieldReferenceFilters).toPromise;
	}
}
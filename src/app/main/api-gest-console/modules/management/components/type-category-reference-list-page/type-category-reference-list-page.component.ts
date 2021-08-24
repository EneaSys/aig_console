import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ContextUserDTO, ObjectReferenceDTO, ObjectReferenceResourceService, TypeCategoryReferenceDTO, TypeCategoryReferenceResourceService } from 'aig-management';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContextUserNewUpdateModalComponent } from '../context-user-new-update-modal/context-user-new-update-modal.component';
import { AigObjectReferenceNewUpdateDialogComponent } from '../object-reference-new-update-dialog/object-reference-new-update-dialog.component';
import { AigTypeCategoryReferenceNewUpdateDialogComponent } from '../type-category-reference-new-update-dialog/type-category-reference-new-update-dialog.component';

@Component({
    selector: 'aig-type-category-reference-list-page',
    templateUrl: './type-category-reference-list-page.component.html',
    styleUrls: ['./type-category-reference-list-page.component.scss']
})
export class AigTypeCategoryReferenceListPageComponent extends GenericComponent {
	
	constructor(
		private typeCategoryReferenceResourceService: TypeCategoryReferenceResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	

	loadPage() {
		this.initTypeCategoryReferenceSearch();

		this.showAllTypeCategoryReference();
	}
	
	reloadPage() {
		this.showAllTypeCategoryReference();
	}

		//			---- TypeCategoryReference TABLE AND SEARCH SECTION ----

    typeCategoryReferenceSearchFormGroup: FormGroup;
	typeCategoryReferencePaginationSize: number;
	typeCategoryReferenceFilters: any;
	
	typeCategoryReferenceLength: number;
	typeCategoryReferenceDTOs: TypeCategoryReferenceDTO[]; 
	typeCategoryReferenceError: any;

	typeCategoryReferenceDC: string[];
	

	private initTypeCategoryReferenceSearch() {

		this.typeCategoryReferencePaginationSize = 10;

		this.typeCategoryReferenceSearchFormGroup = this._formBuilder.group({
			id: [''],
			
		});

		this.typeCategoryReferenceDC = ["name","code", "buttons"];
	}

	private clearFiltersTypeCategoryReference() {
		this.typeCategoryReferenceFilters = {
			idEquals: null,
			page: 0,
		}
	}

	private async searchTypeCategoryReference(page: number) {

		this.typeCategoryReferenceDTOs = null;
		this.typeCategoryReferenceFilters.page = page;
		this.typeCategoryReferenceFilters.size = this.typeCategoryReferencePaginationSize;

		try {
			this.typeCategoryReferenceLength = await this.typeCategoryReferenceResourceService.countTypeCategoryReferencesUsingGET(this.typeCategoryReferenceFilters).toPromise();
			
			if(this.typeCategoryReferenceLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.typeCategoryReferenceDTOs = [];
				return;
			}

			this.typeCategoryReferenceDTOs = await this.typeCategoryReferenceResourceService.getAllTypeCategoryReferencesUsingGET(this.typeCategoryReferenceFilters).toPromise();
		} catch (e) {
			this.typeCategoryReferenceError = e;
		}
	}

	showAllTypeCategoryReference() {
		this.resetFiltersTypeCategoryReference();
	}

	resetFiltersTypeCategoryReference() {
		this.typeCategoryReferenceSearchFormGroup.reset();
		this.clearFiltersTypeCategoryReference();
		this.searchTypeCategoryReference(0);
	}
	
	typeCategoryReferencePaginationEvent(pageEvent: PageEvent) {
		this.typeCategoryReferencePaginationSize = pageEvent.pageSize;
		this.searchTypeCategoryReference(pageEvent.pageIndex);
	}

	typeCategoryReferenceSearchWithFilter() {
		let searchedId = this.typeCategoryReferenceSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTypeCategoryReference();
			this.typeCategoryReferenceSearchFormGroup.reset();
			this.typeCategoryReferenceFilters.idEquals = searchedId;
			this.searchTypeCategoryReference(0);
			return;
		}
		this.typeCategoryReferenceFilters.idEquals = null;

		
		this.searchTypeCategoryReference(0);
	}

	newTypeCategoryReference(): void {
		this.dialog.open(AigTypeCategoryReferenceNewUpdateDialogComponent, { data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/

}
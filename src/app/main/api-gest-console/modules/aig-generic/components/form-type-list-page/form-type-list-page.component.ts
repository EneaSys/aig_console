import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooTypeResourceService, EopooTypeDTO, FormTypeResourceService, FormTypeDTO } from 'aig-generic';
import { AigEopooTypeNewUpdateModalComponent } from '../eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigFormTypeNewUpdateDialogComponent } from '../form-type-new-update-dialog/form-type-new-update-dialog.component';

@Component({
    templateUrl: './form-type-list-page.component.html',
    styleUrls: ['./form-type-list-page.component.scss']
})
export class AigFormTypeListPageComponent extends GenericComponent {
    constructor(
        private formTypeResourceService: FormTypeResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initFormTypeSearch();

        this.showAllFormType();
    }

    reloadPage() {
        this.showAllFormType();
    }

    //			---- Form TYPE TABLE AND SEARCH SECTION ----

    formTypeDTOs: FormTypeDTO[];
    formTypeDC: string[];
    formTypeError: any;

    formTypeSearchFormGroup: FormGroup;
    formTypeFilters: any;

    formTypePaginationSize: number;
    formTypeLength: number;

    private initFormTypeSearch() {
        this.formTypePaginationSize = 10;

        this.formTypeSearchFormGroup = this._formBuilder.group({
            
            name: [''],
        });

        this.formTypeDC = ["name", "buttons"];
    }

    private clearFiltersFormType() {
        this.formTypeFilters = {
            nameContains: null,
            page: 0,
        }
    }

    private async searchFormType(page: number) {
		this.formTypeDTOs = null;

		this.formTypeFilters.page = page;
		this.formTypeFilters.size = this.formTypePaginationSize;

		try {
			this.formTypeLength = await this.formTypeResourceService.countFormTypesUsingGET(this.formTypeFilters).toPromise();

			if(this.formTypeLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.formTypeDTOs = [];
				return;
			}

			this.formTypeDTOs = await this.formTypeResourceService.getAllFormTypesUsingGET(this.formTypeFilters).toPromise();
		} catch (e) {
			this.formTypeError = e;
		}
    }

    showAllFormType() {
		this.resetFiltersFormType()
    }

    resetFiltersFormType() {
		this.formTypeSearchFormGroup.reset();
		this.clearFiltersFormType();
		this.searchFormType(0);
    }

    formTypePaginationEvent(pageEvent: PageEvent) {
		this.formTypePaginationSize = pageEvent.pageSize;
		this.searchFormType(pageEvent.pageIndex);
	}

    formTypeSearchWithFilter() {
		let searchedId = this.formTypeSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersFormType();
			this.formTypeSearchFormGroup.reset();
			this.formTypeFilters.idEquals = searchedId;
			this.searchFormType(0);
			return;
		}

		this.formTypeFilters.idEquals = null;

		this.formTypeFilters.nameContains = this.formTypeSearchFormGroup.controls.name.value;

		this.searchFormType(0);
	}

    newFormType() {
        this.dialog.open(AigFormTypeNewUpdateDialogComponent, { data: { } });
    }

    //			---- !EOPOO TYPE TABLE AND SEARCH SECTION ----
}
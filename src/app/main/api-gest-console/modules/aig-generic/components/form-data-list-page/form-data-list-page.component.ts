import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooTypeResourceService, EopooTypeDTO, FormTypeResourceService, FormTypeDTO, FormDataResourceService, FormDataDTO } from 'aig-generic';
import { AigEopooTypeNewUpdateModalComponent } from '../eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigFormTypeNewUpdateDialogComponent } from '../form-type-new-update-dialog/form-type-new-update-dialog.component';
import { AigFormDataNewUpdateDialogComponent } from '../form-data-new-update-dialog/form-data-new-update-dialog.component';

@Component({
    templateUrl: './form-data-list-page.component.html',
    styleUrls: ['./form-data-list-page.component.scss']
})
export class AigFormDataListPageComponent extends GenericComponent {
    constructor(
        private formDataResourceService: FormDataResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initFormDataSearch();

        this.showAllFormData();
    }

    reloadPage() {
        this.showAllFormData();
    }

    //			---- Form Data TABLE AND SEARCH SECTION ----

    formDataDTOs: FormDataDTO[];
    formDataDC: string[];
    formDataError: any;

    formDataSearchFormGroup: FormGroup;
    formDataFilters: any;

    formDataPaginationSize: number;
    formDataLength: number;

    private initFormDataSearch() {
        this.formDataPaginationSize = 10;

        this.formDataSearchFormGroup = this._formBuilder.group({
			id: [''],
			s2: [''],
			s3: [''],
            n1: [''],
        });

        this.formDataDC = ["id", "s1", "s2", "s3", "s9", "s10", "n3", "d1", "buttons"];
    }

    private clearFiltersFormData() {
		this.formDataSearchFormGroup.reset();
        this.formDataFilters = {
			idEquals: null,
            nameContains: null,
            page: 0,
        }
    }

    private async searchFormData(page: number) {
		this.formDataDTOs = null;

		this.formDataFilters.page = page;
		this.formDataFilters.size = this.formDataPaginationSize;

		try {
			this.formDataLength = await this.formDataResourceService.countFormDataUsingGET(this.formDataFilters).toPromise();

			if(this.formDataLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.formDataDTOs = [];
				return;
			}

			this.formDataDTOs = await this.formDataResourceService.getAllFormDataUsingGET(this.formDataFilters).toPromise();
		} catch (e) {
			this.formDataError = e;
		}
    }

    showAllFormData() {
		this.resetFiltersFormData()
    }

    resetFiltersFormData() {
		this.formDataSearchFormGroup.reset();
		this.clearFiltersFormData();
		this.searchFormData(0);
    }

    formDataPaginationEvent(pageEvent: PageEvent) {
		this.formDataPaginationSize = pageEvent.pageSize;
		this.searchFormData(pageEvent.pageIndex);
	}

    formDataSearchWithFilter() {
		let searchedId = this.formDataSearchFormGroup.value.id;
		if(searchedId != null) {
			this.clearFiltersFormData();
			this.formDataFilters.formDataIDEquals = searchedId;
			this.searchFormData(0);
			return;
		}

		let filters: any = {};
		filters = this.formDataSearchFormGroup.value;

		if(filters.s2) {
			this.formDataFilters.s2Contains = filters.s2;
		}
		if(filters.s3) {
			this.formDataFilters.s3Contains = filters.s3;
		}

		this.searchFormData(0);
	}

    newFormData() {
        this.dialog.open(AigFormDataNewUpdateDialogComponent, { data: { } });
    }

    //			---- !EOPOO TYPE TABLE AND SEARCH SECTION ----
}
import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooTypeResourceService, EopooTypeDTO } from 'aig-generic';
import { AigEopooTypeNewUpdateModalComponent } from '../eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    templateUrl: './eopoo-type-list-page.component.html',
    styleUrls: ['./eopoo-type-list-page.component.scss']
})
export class AigEopooTypeListPageComponent extends GenericComponent {
    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initEopooTypeSearch();

        this.showAllEopooType();
    }

    reloadPage() {
        this.showAllEopooType();
    }

    //			---- EOPOO TYPE TABLE AND SEARCH SECTION ----

    eopooTypeDTOs: EopooTypeDTO[];
    eopooTypeDC: string[];
    eopooTypeError: any;

    eopooTypeSearchFormGroup: FormGroup;
    eopooTypeFilters: any;

    eopooTypePaginationSize: number;
    eopooTypeLength: number;

    private initEopooTypeSearch() {
        this.eopooTypePaginationSize = 10;

        this.eopooTypeSearchFormGroup = this._formBuilder.group({
            id: [''],
            name: [''],
        });

        this.eopooTypeDC = ["id", "name", "buttons"];
    }

    private clearFiltersEopooType() {
        this.eopooTypeFilters = {
            idEquals: null,
            nameContains: null,
            page: 0,
        }
    }

    private async searchEopooType(page: number) {
		this.eopooTypeDTOs = null;

		this.eopooTypeFilters.page = page;
		this.eopooTypeFilters.size = this.eopooTypePaginationSize;

		try {
			this.eopooTypeLength = await this.eopooTypeResourceService.countEopooTypesUsingGET(null, null, null, null, null, null, null, null, null, null, this.eopooTypeFilters.idEquals, null, null, null, null, null, null, null, this.eopooTypeFilters.nameContains, null, null, null, null, null, null, null).toPromise();

			if(this.eopooTypeLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.eopooTypeDTOs = [];
				return;
			}

			this.eopooTypeDTOs = await this.eopooTypeResourceService.getAllEopooTypesUsingGET(null, null, null, null, null, null, null, null, null, null, this.eopooTypeFilters.idEquals, null, null,null,null,null,null,null, this.eopooTypeFilters.nameContains, null, null, null, null, null, this.eopooTypeFilters.page, null, null,null,null).toPromise();
		} catch (e) {
			this.eopooTypeError = e;
		}
    }

    showAllEopooType() {
		this.resetFiltersEopooType()
    }

    resetFiltersEopooType() {
		this.eopooTypeSearchFormGroup.reset();
		this.clearFiltersEopooType();
		this.searchEopooType(0);
    }

    eopooTypePaginationEvent(pageEvent: PageEvent) {
		this.eopooTypePaginationSize = pageEvent.pageSize;
		this.searchEopooType(pageEvent.pageIndex);
	}

    eopooTypeSearchWithFilter() {
		let searchedId = this.eopooTypeSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersEopooType();
			this.eopooTypeSearchFormGroup.reset();
			this.eopooTypeFilters.idEquals = searchedId;
			this.searchEopooType(0);
			return;
		}

		this.eopooTypeFilters.idEquals = null;

		this.eopooTypeFilters.nameContains = this.eopooTypeSearchFormGroup.controls.name.value;

		this.searchEopooType(0);
	}

    newEopooType() {
        this.dialog.open(AigEopooTypeNewUpdateModalComponent, { data: { eopooType: {} } });
    }
    //			---- !EOPOO TYPE TABLE AND SEARCH SECTION ----
}
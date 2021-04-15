import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ReferentDTO, ReferentResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigReferentNewUpdateDialogComponent } from '../referent-new-update-dialog/referent-new-update-dialog.component';

@Component({
    selector: 'aig-referent-list-page',
    templateUrl: './referent-list-page.component.html',
    styleUrls: ['./referent-list-page.component.scss']
})
export class AigReferentListPageComponent extends GenericComponent {
    constructor(
        private referentResourceService: ReferentResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initReferentSearch();

        this.showAllReferent();
    }

    reloadPage() {
        this.showAllReferent();
    }

    //			---- REFERENT TABLE AND SEARCH SECTION ----

    referentDTOs: ReferentDTO[];
    referentDC: string[];
    referentError: any;

    referentSearchFormGroup: FormGroup;
    referentFilters: any;

    referentPaginationSize: number;
    referentLength: number;

    private initReferentSearch() {
        this.referentPaginationSize = 10;

        this.referentSearchFormGroup = this._formBuilder.group({
            id: [''],
            firstname: [''],
            lastname: [''],
            position: [''],
            eopooTaxNumber: [''],
        });

        this.referentDC = ["id", "eopooId", "eopooTaxNumber", "firstname", "lastname", "position", "buttons"];
    }

    private clearFiltersReferent() {
        this.referentFilters = {
            idEquals: null,
            page: 0,
        }
    }

    private async searchReferent(page: number) {
		this.referentDTOs = null;

		this.referentFilters.page = page;
		this.referentFilters.size = this.referentPaginationSize;

		try {
			this.referentLength = await this.referentResourceService.countReferentsUsingGET(this.referentFilters).toPromise();

			if(this.referentLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.referentDTOs = [];
				return;
			}

			this.referentDTOs = await this.referentResourceService.getAllReferentsUsingGET(this.referentFilters).toPromise();
		} catch (e) {
			this.referentError = e;
		}
    }

    showAllReferent() {
		this.resetFiltersReferent()
    }

    resetFiltersReferent() {
		this.referentSearchFormGroup.reset();
		this.clearFiltersReferent();
		this.searchReferent(0);
    }

    referentPaginationEvent(pageEvent: PageEvent) {
		this.referentPaginationSize = pageEvent.pageSize;
		this.searchReferent(pageEvent.pageIndex);
	}

    referentSearchWithFilter() {
		let searchedId = this.referentSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersReferent();
			this.referentSearchFormGroup.reset();
			this.referentFilters.idEquals = searchedId;
			this.searchReferent(0);
			return;
		}

		this.referentFilters.idEquals = null;

		this.searchReferent(0);
	}

    newReferent() {
        this.dialog.open(AigReferentNewUpdateDialogComponent, { data: { referent: {} } });
    }
    //			---- !REFERENT TABLE AND SEARCH SECTION ----
}
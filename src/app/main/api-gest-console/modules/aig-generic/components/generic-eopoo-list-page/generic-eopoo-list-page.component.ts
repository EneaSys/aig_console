import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { GenericEopooDTO } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigGenericEopooNewUpdateDialogComponent } from '../generic-eopoo-new-update-dialog/generic-eopoo-new-update-dialog.component';

@Component({
    selector: 'aig-generic-eopoo-list-page',
    templateUrl: './generic-eopoo-list-page.component.html',
    styleUrls: ['./generic-eopoo-list-page.component.scss']
})
export class AigGenericEopooListPageComponent extends GenericComponent {
    constructor(
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initGenericEopooSearch();

        this.showAllGenericEopoo();
    }

    reloadPage() {
        this.showAllGenericEopoo();
    }

    //			---- GENERIC EOPOO TABLE AND SEARCH SECTION ----

    genericEopooDTOs: GenericEopooDTO[];
    genericEopooDC: string[];
    genericEopooError: any;

    genericEopooSearchFormGroup: FormGroup;
    genericEopooFilters: any;

    genericEopooPaginationSize: number;
    genericEopooLength: number;

    private initGenericEopooSearch() {
        this.genericEopooPaginationSize = 10;

        this.genericEopooSearchFormGroup = this._formBuilder.group({
            id: [''],
            name: [''],
        });

        this.genericEopooDC = ["id", "name", "buttons"];
    }

    private clearFiltersGenericEopoo() {
        this.genericEopooFilters = {
            idEquals: null,
            nameContains: null,
            page: 0,
        }
    }

    private async searchGenericEopoo(page: number) {
		this.genericEopooDTOs = null;

		this.genericEopooFilters.page = page;
		this.genericEopooFilters.size = this.genericEopooPaginationSize;

		try {
			/*this.genericEopooLength = await this.genericEopooResourceService.countGenericEopoosUsingGET().toPromise();*/

			if(this.genericEopooLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.genericEopooDTOs = [];
				return;
			}

			/*this.genericEopooDTOs = await this.genericEopooResourceService.getAllGenericEopoosUsingGET().toPromise();*/
		} catch (e) {
			this.genericEopooError = e;
		}
    }

    showAllGenericEopoo() {
		this.resetFiltersGenericEopoo()
    }

    resetFiltersGenericEopoo() {
		this.genericEopooSearchFormGroup.reset();
		this.clearFiltersGenericEopoo();
		this.searchGenericEopoo(0);
    }

    genericEopooPaginationEvent(pageEvent: PageEvent) {
		this.genericEopooPaginationSize = pageEvent.pageSize;
		this.searchGenericEopoo(pageEvent.pageIndex);
	}

    genericEopooSearchWithFilter() {
		let searchedId = this.genericEopooSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersGenericEopoo();
			this.genericEopooSearchFormGroup.reset();
			this.genericEopooFilters.idEquals = searchedId;
			this.searchGenericEopoo(0);
			return;
		}

		this.genericEopooFilters.idEquals = null;

		this.genericEopooFilters.nameContains = this.genericEopooSearchFormGroup.controls.name.value;

		this.searchGenericEopoo(0);
	}

    newGenericEopoo() {
        this.dialog.open(AigGenericEopooNewUpdateDialogComponent, { data: { genericEopoo: {} } });
    }

   
    //			---- !GENERIC EOPOO TABLE AND SEARCH SECTION ----
}
import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooResourceService, EopooDTO, EopooTypeDTO } from 'aig-generic';
import { MatDialog } from '@angular/material/dialog';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';

@Component({
	templateUrl: './eopoo-list-page.component.html',
	styleUrls: ['./eopoo-list-page.component.scss']
})
export class AigEopooListPageComponent extends GenericComponent {
	constructor(
		private eopooResourceService: EopooResourceService,
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private genericAutocompleteService: AigGenericAutocompleteFilterService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initEopooSearch();

		this.showAllEopoo();
	}

	reloadPage() {
		this.showAllEopoo();
	}

	//			---- EOPOO TABLE AND SEARCH SECTION ----

	eopooDTOs: EopooDTO[];
	eopooDC: string[];
	eopooError: any;

	searchForm: FormGroup;
	eopooFilters: any;

	eopooPaginationSize: number;
	eopooLength: number;

	filteredEopooType: Observable<EopooTypeDTO[]>;

	private initEopooSearch() {
		this.eopooPaginationSize = 30;

		this.searchForm = this._formBuilder.group({
			id: [''],
			eopooType:[''],
			taxId: [''],
		});

		this.filteredEopooType = this.genericAutocompleteService.filterEopooType(this.searchForm.controls['eopooType'].valueChanges);

		this.eopooDC = ['id', 'eopooType', 'name', 'taxId', 'buttons'];
	}

	private clearFiltersEopoo() {
		this.eopooFilters = {
			idEquals: null,
			eopooTypeIdEquals: null,
			taxNumberContains: null,
			page: 0,
		}
	}

	private async searchEopoo(page: number) {
		this.eopooDTOs = null;

		this.eopooFilters.page = page;
		this.eopooFilters.size = this.eopooPaginationSize;

		this.filteredEopooType = this.genericAutocompleteService.filterEopooType(this.searchForm.controls['eopooType'].valueChanges);

		try {
			this.eopooLength = await this.eopooResourceService.countEopoosUsingGET(this.eopooFilters).toPromise();

			if (this.eopooLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.eopooDTOs = [];
				return;
			}

			this.eopooDTOs = await this.eopooResourceService.getAllEopoosUsingGET(this.eopooFilters).toPromise();
		} catch (e) {
			this.eopooError = e;
		}
    }

	showAllEopoo() {
		this.resetFiltersEopoo()
	}

	resetFiltersEopoo() {
		this.searchForm.reset();
		this.clearFiltersEopoo();
		this.searchEopoo(0);
	}

	eopooPaginationEvent(pageEvent: PageEvent) {
		this.eopooPaginationSize = pageEvent.pageSize;
		this.searchEopoo(pageEvent.pageIndex);
	}

	eopooSearchWithFilter() {
		let searchedId = this.searchForm.controls.id.value;

		if (searchedId != null) {
			this.clearFiltersEopoo();
			this.searchForm.reset();
			this.eopooFilters.idEquals = searchedId;
			this.searchEopoo(0);
			return;
		}

		this.eopooFilters.idEquals = null;

		this.eopooFilters.taxNumberContains = this.searchForm.controls.taxId.value;

		if (this.searchForm.controls.eopooType.value) {
			this.eopooFilters.eopooTypeIdEquals = this.searchForm.controls.eopooType.value.id;
		}

		this.searchEopoo(0);
	}

	newEopoo() {
		this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: {} } });
	}
	//			---- !EOPOO TABLE AND SEARCH SECTION ----
}
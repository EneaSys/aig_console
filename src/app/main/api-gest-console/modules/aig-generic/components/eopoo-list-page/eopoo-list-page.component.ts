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
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';

@Component({
	templateUrl: './eopoo-list-page.component.html',
	styleUrls: ['./eopoo-list-page.component.scss']
})
export class AigEopooListPageComponent extends GenericComponent {
	constructor(
		private eopooResourceService: EopooResourceService,

		private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
		public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
		
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
	
	eopooPaginationSize: number;
	eopooLength: number;





	searchForm: FormGroup;
	eopooFilters: any;

	filteredEopooType: Observable<EopooTypeDTO[]>;

	private initEopooSearch() {
		this.eopooPaginationSize = 30;

		this.searchForm = this._formBuilder.group({
			eopooIDEquals: [''],
			eopooCompleteNameContains: [''],
			eopooTaxNumberContains: [''],
			eopooTypeIDEquals: [''],
		});

		this.filteredEopooType = this.genericAutocompleteFilterService.filterEopooType(this.searchForm.controls['eopooTypeIDEquals'].valueChanges);

		this.eopooDC = ['id', 'eopooType', 'name', 'taxId', 'buttons'];
	}

	private clearFiltersEopoo() {
		this.eopooFilters = {
			page: 0,
		}
	}

	private async searchEopoo(page: number) {
		this.eopooDTOs = null;

		this.eopooFilters.page = page;
		this.eopooFilters.size = this.eopooPaginationSize;

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
		let searchedId = this.searchForm.value.eopooIDEquals;

		if (searchedId != null) {
			this.clearFiltersEopoo();
			this.searchForm.reset();
			this.eopooFilters.eopooIDEquals = searchedId;
			this.searchEopoo(0);
			return;
		}

		this.eopooFilters.eopooIDEquals = null;

		if (this.searchForm.value.eopooCompleteNameContains) {
			this.eopooFilters.eopooCompleteNameContains = this.searchForm.value.eopooCompleteNameContains;
		}

		if (this.searchForm.value.eopooTaxNumberContains) {
			this.eopooFilters.eopooTaxNumberContains = this.searchForm.value.eopooTaxNumberContains;
		}

		if (this.searchForm.value.eopooTypeIDEquals) {
			this.eopooFilters.eopooTypeIDEquals = this.searchForm.value.eopooTypeIDEquals.id;
		}

		this.searchEopoo(0);
	}




	
	newEopoo() {
		this.dialog.open(AigEopooNewModalComponent, { data: { } });
	}

	async publish() {
		await this.eopooResourceService.publishUsingGET2(this.eopooFilters).toPromise();
	}

}
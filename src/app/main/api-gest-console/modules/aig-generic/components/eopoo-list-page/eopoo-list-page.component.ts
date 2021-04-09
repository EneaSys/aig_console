import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooResourceService, EopooDTO } from 'aig-generic';
import { MatDialog } from '@angular/material/dialog';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
	templateUrl: './eopoo-list-page.component.html',
	styleUrls: ['./eopoo-list-page.component.scss']
})
export class AigEopooListPageComponent extends GenericComponent {
	constructor(
		private eopooResourceService: EopooResourceService,
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

	private initEopooSearch() {
		this.eopooPaginationSize = 30;

		this.searchForm = this._formBuilder.group({
			id: [''],
			taxId: [''],
		});

		this.eopooDC = ['id', 'type', 'name', 'taxid', 'buttons'];
	}

	private clearFiltersEopoo() {
		this.eopooFilters = {
			idEquals: null,
			taxNumber: null,
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
		let searchedId = this.searchForm.controls.id.value;

		if (searchedId != null) {
			this.clearFiltersEopoo();
			this.searchForm.reset();
			this.eopooFilters.idEquals = searchedId;
			this.searchEopoo(0);
			return;
		}

		this.eopooFilters.idEquals = null;

		this.eopooFilters.taxNumber = this.searchForm.controls.taxId.value;

		this.searchEopoo(0);
	}

	newEopoo() {
		this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: {} } });
	}
	//			---- !EOPOO TABLE AND SEARCH SECTION ----
}
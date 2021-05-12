import { Component } from "@angular/core";
import { FormBuilder, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteDisplayService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { EopooDTO } from "aig-generic";
import { DesignatedCompanyDTO, DesignatedCompanyResourceService, DossierDTO, DossierResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigDesignatedCompanyNewUpdateDialogComponent } from "../designated-company-new-update-dialog/designated-company-new-update-dialog.component";

@Component({
	templateUrl: './designated-company-list-page.component.html',
	styleUrls: ['./designated-company-list-page.component.scss']
})
export class AigDesignatedCompanyListPageComponent extends GenericComponent {
	constructor(

		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		private designatedCompanyResourceService: DesignatedCompanyResourceService,
		private genericAutocompleteService: AigGenericAutocompleteFilterService,
		public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initDesignatedCompanySearch();

		this.showAllDesignatedCompany();
	}

	reloadPage() {
		this.showAllDesignatedCompany();
	}


	//			---- TABLE AND SEARCH SECTION ----

	designatedCompanyDTOs: DesignatedCompanyDTO[];
	designatedCompanyDC: string[];
	designatedCompanyError: any;

	designatedCompanySearchFormGroup: FormGroup;
	designatedCompanyFilters: any;

	designatedCompanyPaginationSize: number;
	designatedCompanyLength: number;

	filteredEopoo: Observable<EopooDTO[]>;

	private initDesignatedCompanySearch() {
		this.designatedCompanyPaginationSize = 10;

		this.designatedCompanySearchFormGroup = this._formBuilder.group({
			id: [''],
			note: [''],
			partecipation: [''],
			partecipationId:[''],
			companyEopoo: [''],
		});

		this.filteredEopoo = this.genericAutocompleteService.filterEopoo(this.designatedCompanySearchFormGroup.controls['companyEopoo'].valueChanges);

		this.designatedCompanyDC = ["id","companyEopoo","partecipation","note", "buttons"];
	}

	private clearFiltersDesignatedCompany() {
		this.designatedCompanyFilters = {
			idEquals: null,
			/*companyEopooTaxNumberEquals: null,*/
		}
	}

	private async searchDesignatedCompany(page: number) {
		this.designatedCompanyDTOs = null;

		this.designatedCompanyFilters.page = page;
		this.designatedCompanyFilters.size = this.designatedCompanyPaginationSize;

		this.filteredEopoo = this.genericAutocompleteService.filterEopoo(this.designatedCompanySearchFormGroup.controls['companyEopoo'].valueChanges);

		try {
			this.designatedCompanyLength = await this.designatedCompanyResourceService.countDesignatedCompaniesUsingGET(this.designatedCompanyFilters).toPromise();

			if (this.designatedCompanyLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.designatedCompanyDTOs = [];
				return;
			}

			this.designatedCompanyDTOs = await this.designatedCompanyResourceService.getAllDesignatedCompaniesUsingGET(this.designatedCompanyFilters).toPromise();
		} catch (e) {
			console.log(e);
			this.designatedCompanyError = e;
		}
	}

	showAllDesignatedCompany() {
		this.resetFiltersDesignatedCompany();
	}

	resetFiltersDesignatedCompany() {
		this.designatedCompanySearchFormGroup.reset();
		this.clearFiltersDesignatedCompany();
		this.searchDesignatedCompany(0);
	}

	designatedCompanyPaginationEvent(pageEvent: PageEvent) {
		this.designatedCompanyPaginationSize = pageEvent.pageSize;
		this.searchDesignatedCompany(pageEvent.pageIndex);
	}

	designatedCompanySearchWithFilter() {
		let searchedId = this.designatedCompanySearchFormGroup.controls.id.value;

		if (searchedId != null) {
			this.clearFiltersDesignatedCompany();
			this.designatedCompanySearchFormGroup.reset();
			this.designatedCompanyFilters.idEquals = searchedId;
			this.searchDesignatedCompany(0);
			return;
		}

		this.designatedCompanyFilters.idEquals = null;

		/*if (this.designatedCompanySearchFormGroup.controls.companyEopoo.value) {
			this.designatedCompanyFilters.companyEopooTaxNumberEquals = this.designatedCompanySearchFormGroup.controls.companyEopoo.value.taxNumber;
		}*/

		/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

		this.searchDesignatedCompany(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newDesignatedCompany(): void {
		this.dialog.open(AigDesignatedCompanyNewUpdateDialogComponent, { data: { designatedCompany: {} } });
	}

}
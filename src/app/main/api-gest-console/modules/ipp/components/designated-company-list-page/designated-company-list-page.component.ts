import { Component } from "@angular/core";
import { FormBuilder, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { DesignatedCompanyDTO, DesignatedCompanyResourceService, DossierDTO, DossierResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigDesignatedCompanyNewUpdateDialogComponent } from "../designated-company-new-update-dialog/designated-company-new-update-dialog.component";
import { AigDossierNewUpdateDialogComponent } from "../dossier-new-update-dialog/dossier-new-update-dialog.component";

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

	designatedCompanySearchFormGroup: FormGroup;
	designatedCompanyPaginationSize: number;
	designatedCompanyFilters: any;

	designatedCompanyLength: number;
	designatedCompanyDTOs: DesignatedCompanyDTO[];
	designatedCompanyError: any;

	designatedCompanyDC: string[];


	private initDesignatedCompanySearch() {
		this.designatedCompanyDC = ["id","note", "companyEopooCode", "partecipationId", "partecipationProposerEopooCode", "note", "buttons"];

		this.designatedCompanyPaginationSize = 10;


		this.designatedCompanySearchFormGroup = this._formBuilder.group({
			id: [''],
			note: [''],
			partecipationId: [''],
			companyEopooCode: [''],
			partecipationProposerEopooCode: ['']
		});
	}

	private clearFiltersDesignatedCompany() {
		this.designatedCompanyFilters = {
			idEquals: null,
			designatedCompanyCodeContains: null,
		}
	}

	private async searchDesignatedCompany(page: number) {
		this.designatedCompanyDTOs = null;

		this.designatedCompanyFilters.page = page;
		this.designatedCompanyFilters.size = this.designatedCompanyPaginationSize;

		try {
			this.designatedCompanyLength = await this.designatedCompanyResourceService.countDesignatedCompaniesUsingGET({}).toPromise();

			if (this.designatedCompanyLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.designatedCompanyDTOs = [];
				return;
			}

			this.designatedCompanyDTOs = await this.designatedCompanyResourceService.getAllDesignatedCompaniesUsingGET({}).toPromise();
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

		/*this.dossierFilters.nameContains = this.dossierSearchFormGroup.controls.name.value;*/

		this.searchDesignatedCompany(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newDesignatedCompany(): void {
		this.dialog.open(AigDesignatedCompanyNewUpdateDialogComponent, { data: { designatedCompany: {} } });
	}

}
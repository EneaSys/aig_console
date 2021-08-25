import { Component } from "@angular/core";
import { FormBuilder, FormGroup, RequiredValidator, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { DossierDTO, DossierResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigDossierNewUpdateDialogComponent } from "../dossier-new-update-dialog/dossier-new-update-dialog.component";

@Component({
	templateUrl: './dossier-list-page.component.html',
	styleUrls: ['./dossier-list-page.component.scss']
})
export class AigDossierListPageComponent extends GenericComponent {
	constructor(

		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
		private dossierResourceService: DossierResourceService,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initDossierSearch();

		this.showAllDossier();
	}

	reloadPage() {
		this.showAllDossier();
	}


	//			---- TABLE AND SEARCH SECTION ----

	dossierDTOs: DossierDTO[];
	dossierDC: string[];
	dossierError: any;

	dossierSearchFormGroup: FormGroup;
	dossierFilters: any;

	dossierPaginationSize: number;
	dossierLength: number;

	private initDossierSearch() {
		this.dossierPaginationSize = 10;

		this.dossierSearchFormGroup = this._formBuilder.group({
			id: [''],
			dossierDescription: [''],
			dossierCode: [''],
			partecipation: ['', Validators.required],
			preparation: [''],
			procurement: [''],
			procurementLot: ['']
		});

		this.dossierDC = ["id", "dossierDescription", "dossierCode", "partecipation", "preparation", "procurement", "procurementLot", "buttons"];
	}

	private clearFiltersDossier() {
		this.dossierFilters = {
			idEquals: null,
			dossierCodeContains: null,
			dossierDescriptionContains: null,
		}
	}

	private async searchDossier(page: number) {
		this.dossierDTOs = null;

		this.dossierFilters.page = page;
		this.dossierFilters.size = this.dossierPaginationSize;

		try {
			this.dossierLength = await this.dossierResourceService.countDossiersUsingGET(this.dossierFilters).toPromise();

			if (this.dossierLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.dossierDTOs = [];
				return;
			}

			this.dossierDTOs = await this.dossierResourceService.getAllDossiersUsingGET(this.dossierFilters).toPromise();
		} catch (e) {
			console.log(e);
			this.dossierError = e;
		}
	}

	showAllDossier() {
		this.resetFiltersDossier();

	}

	resetFiltersDossier() {
		this.dossierSearchFormGroup.reset();
		this.clearFiltersDossier();
		this.searchDossier(0);
	}

	dossierPaginationEvent(pageEvent: PageEvent) {
		this.dossierPaginationSize = pageEvent.pageSize;
		this.searchDossier(pageEvent.pageIndex);
	}

	dossierSearchWithFilter() {
		let searchedId = this.dossierSearchFormGroup.controls.id.value;
		if (searchedId != null) {
			this.clearFiltersDossier();
			this.dossierSearchFormGroup.reset();
			this.dossierFilters.idEquals = searchedId;
			this.searchDossier(0);
			return;
		}

		this.dossierFilters.idEquals = null;
		this.dossierFilters.dossierCodeContains = this.dossierSearchFormGroup.controls.dossierCode.value;
		this.dossierFilters.dossierDescriptionContains = this.dossierSearchFormGroup.controls.description.value;

		this.searchDossier(0);
	}

	//			---- !TABLE AND SEARCH SECTION ----

	newDossier(): void {
		this.dialog.open(AigDossierNewUpdateDialogComponent, { data: {} });
	}

	
	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/

}
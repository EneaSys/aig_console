import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteDisplayService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { AigIppAutocompleteDisplayService } from "aig-common/modules/ipp/service/autocomplete-display.service";
import { AigIppAutocompleteService } from "aig-common/modules/ipp/service/autocomplete-filter.service";
import { AigStandardAutocompleteFilterService } from "aig-common/modules/standard/services/autocomplete-filter.service";
import { AigStandardAutocompleteDisplayService } from "aig-common/modules/standard/services/autocomplete-function.service";
import { EopooDTO, IlPpPartecipationTypeDTO, IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotCategoryDTO, IlPpProcurementLotTypeDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO, PartecipationDTO, PartecipationResourceService, PartecipationStatusDTO, PreparationModalityDTO, PreparationModalityResourceService, ProcurementLotDTO } from "aig-italianlegislation";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigIppGenericComponent } from "../ipp-generic-component";
import { AigPartecipationModalityNewUpdateDialogComponent } from "../partecipation-modality-new-update-dialog/partecipation-modality-new-update-dialog.component";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";
import { AigPreparationModalityNewUpdateDialogComponent } from "../preparation-modality-new-update-dialog/preparation-modality-new-update-dialog.component";

@Component({
    templateUrl: './preparation-modality-list-page.component.html',
    styleUrls: ['./preparation-modality-list-page.component.scss']
})
export class AigPreparationModalityListPageComponent extends AigIppGenericComponent {
    constructor(
		public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        public genericAutocompleteFilterService:  AigGenericAutocompleteFilterService,
        public standardAutocompleteFilterService:  AigStandardAutocompleteFilterService,
        public standardAutocompleteDisplayService:  AigStandardAutocompleteDisplayService,
		public ippAutocompleteDisplayService:  AigIppAutocompleteDisplayService,
		public ippAutocompleteFilterService:  AigIppAutocompleteService,
       
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        private preparationModalityResourceService: PreparationModalityResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	


    loadPage() {
		this.initPreparationModalitySearch();

		this.showAllPreparationModality();
	}

	reloadPage() {
		this.showAllPreparationModality();
	}


//			---- TABLE AND SEARCH SECTION ----

    preparationModalitySearchFormGroup: FormGroup;
	preparationModalityPaginationSize: number;
	preparationModalityFilters: any;

	preparationModalityLength: number;
	preparationModalityDTOs: PreparationModalityDTO[];
	preparationModalityError: any;

	preparationModalityDC: string[];

		
	private initPreparationModalitySearch() {
		this.preparationModalityPaginationSize = 10;

		this.preparationModalitySearchFormGroup = this._formBuilder.group({
			id: [''],
			description: [''],
		});


		this.preparationModalityDC = ["description","buttons"];
	}

	private clearFiltersPreparationModality() {
		this.preparationModalityFilters = {
			idEquals: null,
		}
	}

	private async searchPreparationModality(page: number) {
		this.preparationModalityDTOs = null;

		this.preparationModalityFilters.page = page;
		this.preparationModalityFilters.size = this.preparationModalityPaginationSize;

		
		try {
			this.preparationModalityLength = await this.preparationModalityResourceService.countPreparationModalitiesUsingGET(this.preparationModalityFilters).toPromise();  

				if(this.preparationModalityLength == 0) {
					this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
					this.preparationModalityDTOs = [];
					return;
				}

				this.preparationModalityDTOs =  await this.preparationModalityResourceService.getAllPreparationModalitiesUsingGET(this.preparationModalityFilters).toPromise();
			} catch (e) {
				this.preparationModalityError = e;
			}
		}	

	showAllPreparationModality() {
		this.resetFiltersPreparationModality();
	}

	resetFiltersPreparationModality() {
		this.preparationModalitySearchFormGroup.reset();
			this.clearFiltersPreparationModality();
			this.searchPreparationModality(0);
	}

	preparationModalityPaginationEvent(pageEvent: PageEvent) {
		this.preparationModalityPaginationSize = pageEvent.pageSize;
		this.searchPreparationModality(pageEvent.pageIndex);
	}

	preparationModalitySearchWithFilter() {
		let searchedId = this.preparationModalitySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPreparationModality();
			this.preparationModalitySearchFormGroup.reset();
			this.preparationModalityFilters.idEquals = searchedId;
			this.searchPreparationModality(0);
			return;
		} else {

			this.preparationModalityFilters.idEquals = null;

			this.searchPreparationModality(0);
		}
	}

		

	newPreparationModality(): void {
        this.dialog.open(AigPreparationModalityNewUpdateDialogComponent, { data: { } });
    }

	
	/*async publish() {
		await this.preparationModalityResourceService.publishUsingGET(this.preparationModalityFilters).toPromise();
	}*/

}
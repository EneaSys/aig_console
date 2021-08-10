import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteDisplayService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { AigIppAutocompleteDisplayService } from "aig-common/modules/ipp/service/autocomplete-display.service";
import { AigIppAutocompleteService } from "aig-common/modules/ipp/service/autocomplete-filter.service";
import { AigStandardAutocompleteFilterService } from "aig-common/modules/standard/services/autocomplete-filter.service";
import { AigStandardAutocompleteDisplayService } from "aig-common/modules/standard/services/autocomplete-function.service";
import { EopooDTO, IlPpPartecipationTypeDTO, IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotCategoryDTO, IlPpProcurementLotTypeDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO, PartecipationDTO, PartecipationResourceService, PartecipationStatusDTO, ProcurementLotDTO } from "aig-italianlegislation";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigIppGenericComponent } from "../ipp-generic-component";
import { AigPartecipationModalityNewUpdateDialogComponent } from "../partecipation-modality-new-update-dialog/partecipation-modality-new-update-dialog.component";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";

@Component({
    templateUrl: './partecipation-modality-list-page.component.html',
    styleUrls: ['./partecipation-modality-list-page.component.scss']
})
export class AigPartecipationModalityListPageComponent extends AigIppGenericComponent {
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
        //*private partecipationModalityResourceService: PartecipationModalityResourceService,*/
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
	


    loadPage() {
		this.initPartecipationModalitySearch();

		this.showAllPartecipationModality();
	}

	reloadPage() {
		this.showAllPartecipationModality();
	}


//			---- TABLE AND SEARCH SECTION ----

	partecipationModalitySearchFormGroup: FormGroup;
	partecipationModalityPaginationSize: number;
	partecipationModalityFilters: any;

	partecipationModalityLength: number;
	//partecipationModalityDTOs: PartecipationModalityDTO[];//
	partecipationModalityError: any;

	partecipationModalityDC: string[];

		
	private initPartecipationModalitySearch() {
		this.partecipationModalityPaginationSize = 10;

		this.partecipationModalitySearchFormGroup = this._formBuilder.group({
		});


		this.partecipationModalityDC = ["buttons"];
	}

	private clearFiltersPartecipationModality() {
		this.partecipationModalityFilters = {
		}
	}

	private async searchPartecipationModality(page: number) {
		//this.partecipationModalityDTOs = null;

		this.partecipationModalityFilters.page = page;
		this.partecipationModalityFilters.size = this.partecipationModalityPaginationSize;

		
		try {
			//this.partecipationModalityLength = await this.partecipationModalityResourceService.countPartecipationsModalityUsingGET(this.partecipationModalityFilters).toPromise();  

				if(this.partecipationModalityLength == 0) {
					this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
					//this.partecipationModalityDTOs = [];
					return;
				}

				//this.partecipationModalityDTOs =  await this.partecipationModalityResourceService.getAllPartecipationsModalityUsingGET(this.partecipationModalityFilters).toPromise();
			} catch (e) {
				this.partecipationModalityError = e;
			}
		}	

	showAllPartecipationModality() {
		this.resetFiltersPartecipationModality();
	}

	resetFiltersPartecipationModality() {
		this.partecipationModalitySearchFormGroup.reset();
			this.clearFiltersPartecipationModality();
			this.searchPartecipationModality(0);
	}

	partecipationModalityPaginationEvent(pageEvent: PageEvent) {
		this.partecipationModalityPaginationSize = pageEvent.pageSize;
		this.searchPartecipationModality(pageEvent.pageIndex);
	}

	partecipationModalitySearchWithFilter() {
		let searchedId = this.partecipationModalitySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPartecipationModality();
			this.partecipationModalitySearchFormGroup.reset();
			this.partecipationModalityFilters.idEquals = searchedId;
			this.searchPartecipationModality(0);
			return;
		} else {

			this.partecipationModalityFilters.idEquals = null;

			this.searchPartecipationModality(0);
		}
	}

		

	newPartecipationModality(): void {
        this.dialog.open(AigPartecipationModalityNewUpdateDialogComponent, { data: { } });
    }

}
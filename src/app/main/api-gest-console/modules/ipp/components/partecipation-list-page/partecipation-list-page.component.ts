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
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";

@Component({
    templateUrl: './partecipation-list-page.component.html',
    styleUrls: ['./partecipation-list-page.component.scss']
})
export class AigPartecipationListPageComponent extends AigIppGenericComponent {
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
        private partecipationResourceService: PartecipationResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	filteredEopoo: Observable<EopooDTO[]>;
	filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;
    filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
    filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    filteredAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;
    filteredIppLotCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredIppLotType: Observable<IlPpProcurementLotTypeDTO[]>;
	filteredPartecipationStatus: Observable<PartecipationStatusDTO[]>;
	filteredPartecipationType: Observable<IlPpPartecipationTypeDTO[]>;

	


    loadPage() {
		this.initPartecipationSearch();

		this.showAllPartecipation();
	}

	reloadPage() {
		this.showAllPartecipation();
	}


//			---- TABLE AND SEARCH SECTION ----

	partecipationSearchFormGroup: FormGroup;
	partecipationPaginationSize: number;
	partecipationFilters: any;

	partecipationLength: number;
	partecipationDTOs: PartecipationDTO[];
	partecipationError: any;

	partecipationDC: string[];

		
	private initPartecipationSearch() {
		this.partecipationPaginationSize = 10;

		this.partecipationSearchFormGroup = this._formBuilder.group({
			id: [''],
			partecipationType: [''],
			procurementLotCig: [''],
			procurementLotDescription: [''],
			procurementLotOfferExpiryDate: [''],
			proposerEopoo: [''],
			ippModality: [''],
            ippProcedure: [''],
            ippSector: [''],
            awardCriterion: [''],
            category: [''],
            type: [''],
			siteInspection: [false],
			partecipationStatus: [''],
			contractorEopoo:[''],

		});


		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['contractorEopoo'].valueChanges);
		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['proposerEopoo'].valueChanges);
		this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.partecipationSearchFormGroup.controls['ippModality'].valueChanges);
        this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.partecipationSearchFormGroup.controls['ippProcedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.partecipationSearchFormGroup.controls['ippSector'].valueChanges);
        this.filteredAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.partecipationSearchFormGroup.controls['awardCriterion'].valueChanges);
        this.filteredIppLotCategory = this.standardAutocompleteFilterService.filterIppLotCategory(this.partecipationSearchFormGroup.controls['category'].valueChanges);
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.partecipationSearchFormGroup.controls['type'].valueChanges);
		this.filteredPartecipationStatus = this.ippAutocompleteFilterService.filterPartecipationStatus(this.partecipationSearchFormGroup.controls['partecipationStatus'].valueChanges);
		this.filteredPartecipationType = this.ippAutocompleteFilterService.filterPartecipationStatus(this.partecipationSearchFormGroup.controls['partecipationType'].valueChanges);
		

		this.partecipationDC = ["id","contractorEopoo","procurementLotDescription","procurementLotCig","proposerEopoo","expiryDate","baseAmount","ippLotCategory","status","buttons"];
	}

	private clearFiltersPartecipation() {
		this.partecipationFilters = {
			idEquals: null,
			contractorEopooCodeContains: null,
			procurementLotCigCodeContains: null,
			procurementLotOfferExpiryDateCodeEquals: null,
			siteInspectionIDEquals: null,
			ippModalityCodeEquals: null,
            ippProcedureCodeEquals: null,
            ippSectorCodeEquals: null,
            awardCriterionCodeEquals: null,
            categoryCodeEquals: null,
            typeCodeEquals: null,
			statusIdEquals: null,
			partecipationTypeCodeEquals: null,
		}
	}

	private async searchPartecipation(page: number) {
		this.partecipationDTOs = null;

		this.partecipationFilters.page = page;
		this.partecipationFilters.size = this.partecipationPaginationSize;

		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['contractorEopoo'].valueChanges);
		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['proposerEopoo'].valueChanges);
		this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.partecipationSearchFormGroup.controls['ippModality'].valueChanges);
        this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.partecipationSearchFormGroup.controls['ippProcedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.partecipationSearchFormGroup.controls['ippSector'].valueChanges);
        this.filteredAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.partecipationSearchFormGroup.controls['awardCriterion'].valueChanges);
        this.filteredIppLotCategory = this.standardAutocompleteFilterService.filterIppLotCategory(this.partecipationSearchFormGroup.controls['category'].valueChanges);
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.partecipationSearchFormGroup.controls['type'].valueChanges);
		this.filteredPartecipationStatus = this.ippAutocompleteFilterService.filterPartecipationStatus(this.partecipationSearchFormGroup.controls['partecipationStatus'].valueChanges);
		this.filteredPartecipationType = this.standardAutocompleteFilterService.filterIlPpPartecipationType(this.partecipationSearchFormGroup.controls['partecipationType'].valueChanges);
		

		
		try {
			this.partecipationLength = await this.partecipationResourceService.countPartecipationsUsingGET(this.partecipationFilters).toPromise();  

				if(this.partecipationLength == 0) {
					this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
					this.partecipationDTOs = [];
					return;
				}

				this.partecipationDTOs =  await this.partecipationResourceService.getAllPartecipationsUsingGET(this.partecipationFilters).toPromise();
			} catch (e) {
				this.partecipationError = e;
			}
		}	

	showAllPartecipation() {
		this.resetFiltersPartecipation();
	}

	resetFiltersPartecipation() {
		this.partecipationSearchFormGroup.reset();
			this.clearFiltersPartecipation();
			this.searchPartecipation(0);
	}

	partecipationPaginationEvent(pageEvent: PageEvent) {
		this.partecipationPaginationSize = pageEvent.pageSize;
		this.searchPartecipation(pageEvent.pageIndex);
	}

	partecipationSearchWithFilter() {
		let searchedId = this.partecipationSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPartecipation();
			this.partecipationSearchFormGroup.reset();
			this.partecipationFilters.idEquals = searchedId;
			this.searchPartecipation(0);
			return;
		} else {

			if (this.partecipationSearchFormGroup.controls.contractorEopoo.value ) {
				this.partecipationFilters.procurementContractorEopooCodeEquals = this.partecipationSearchFormGroup.controls.contractorEopoo.value.id;
			}

			if (this.partecipationSearchFormGroup.controls.proposerEopoo.value ) {
				this.partecipationFilters.proposerEopooCodeEquals = this.partecipationSearchFormGroup.controls.proposerEopoo.value.id;
			}
			if (this.partecipationSearchFormGroup.controls.procurementLotCig.value ) {
				this.partecipationFilters.procurementLotCigCodeContains = this.partecipationSearchFormGroup.controls.procurementLotCig.value;
			}
			if (this.partecipationSearchFormGroup.controls.procurementLotDescription.value ) {
				this.partecipationFilters.procurementLotDescriptionCodeContains = this.partecipationSearchFormGroup.controls.procurementLotDescription.value;
			}

			if (this.partecipationSearchFormGroup.controls.procurementLotOfferExpiryDate.value ) {
				this.partecipationFilters.procurementLotOfferExpiryDateCodeEquals = this.partecipationSearchFormGroup.controls.procurementLotOfferExpiryDate.value;
			}
			if (this.partecipationSearchFormGroup.controls.siteInspection.value != null ) {
				this.partecipationFilters.siteInspectionEquals = this.partecipationSearchFormGroup.controls.siteInspection.value;
			}

			if (this.partecipationSearchFormGroup.controls.ippModality.value ) {
				this.partecipationFilters.ippModalityCodeEquals = this.partecipationSearchFormGroup.controls.ippModality.value.code;
			}
	
			if (this.partecipationSearchFormGroup.controls.ippProcedure.value) {
				this.partecipationFilters.ippProcedureCodeEquals = this.partecipationSearchFormGroup.controls.ippProcedure.value.code;
			}
	
			if (this.partecipationSearchFormGroup.controls.ippSector.value ) {
				this.partecipationFilters.ippSectorCodeEquals = this.partecipationSearchFormGroup.controls.ippSector.value.code;
			}
			if (this.partecipationSearchFormGroup.controls.awardCriterion.value ) {
				this.partecipationFilters.awardCriterionCodeEquals = this.partecipationSearchFormGroup.controls.awardCriterion.value.code;
			}
	
			if (this.partecipationSearchFormGroup.controls.category.value ) {
				this.partecipationFilters.categoryCodeEquals = this.partecipationSearchFormGroup.controls.category.value.code;
			}

			if (this.partecipationSearchFormGroup.controls.partecipationStatus.value ) {
				this.partecipationFilters.statusIdEquals = this.partecipationSearchFormGroup.controls.partecipationStatus.value.id;
			}

			if (this.partecipationSearchFormGroup.controls.partecipationType.value ) {
				this.partecipationFilters.partecipationTypeCodeEquals = this.partecipationSearchFormGroup.controls.partecipationType.value.code;
			}
	

			this.partecipationFilters.idEquals = null;

			this.searchPartecipation(0);
		}
	}

		

	newPartecipation(): void {
        this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { partecipation: {} } });
    }

}
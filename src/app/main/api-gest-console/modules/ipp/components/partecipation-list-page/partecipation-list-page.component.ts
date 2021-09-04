import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteDisplayService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { AigIppAutocompleteDisplayService } from "aig-common/modules/ipp/service/autocomplete-display.service";
import { AigIppAutocompleteService } from "aig-common/modules/ipp/service/autocomplete-filter.service";
import { AigStandardAutocompleteFilterService } from "aig-common/modules/standard/services/autocomplete-filter.service";
import { AigStandardAutocompleteDisplayService } from "aig-common/modules/standard/services/autocomplete-function.service";
import { EopooDTO, PartecipationDTO, PartecipationResourceService, PartecipationStatusDTO} from "aig-italianlegislation";
import { IlPpPartecipationTypeDTO, IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotCategoryDTO, IlPpProcurementLotTypeDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO } from "aig-standard";
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
		public gcs: AigGenericComponentService,
    ) { super(gcs) }

	

	


    loadPage() {
		this.initPartecipationSearch();

		this.resetFiltersPartecipation();
	}

	reloadPage() {
		this.partecipationSearchWithFilter();
	}

	


	
//			---- SEARCH SECTION ----

	partecipationSearchFormGroup: FormGroup;
	partecipationFilters: any;


	filteredContractorEopoo: Observable<EopooDTO[]>;
	filteredProposerEopoo: Observable<EopooDTO[]>;
	filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;
    filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
    filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    filteredAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;
    filteredIppLotCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredIppLotType: Observable<IlPpProcurementLotTypeDTO[]>;
	filteredPartecipationStatus: Observable<PartecipationStatusDTO[]>;
	filteredPartecipationType: Observable<IlPpPartecipationTypeDTO[]>;

	private initPartecipationSearch() {
		this.partecipationSearchFormGroup = this._formBuilder.group({
			id: [''],
			procurementLotCigEquals: [''],
			contractorEopoo:[''],
			procurementLotDescriptionContains:[''],
			procurementLotOfferExpiryDateStart:[''],
			procurementLotOfferExpiryDateEnd: [''],
			partecipationType: [''],
			proposerEopoo: [''],
			ippModality: [''],
            ippProcedure: [''],
            ippSector: [''],
            awardCriterion: [''],
            category: [''],
            type: [''],
			siteInspection: [false],
			partecipationStatus: [''],
		});


		this.filteredContractorEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['contractorEopoo'].valueChanges);
		this.filteredProposerEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['proposerEopoo'].valueChanges);
		this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.partecipationSearchFormGroup.controls['ippModality'].valueChanges);
        this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.partecipationSearchFormGroup.controls['ippProcedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.partecipationSearchFormGroup.controls['ippSector'].valueChanges);
        this.filteredAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.partecipationSearchFormGroup.controls['awardCriterion'].valueChanges);
        this.filteredIppLotCategory = this.standardAutocompleteFilterService.filterIppLotCategory(this.partecipationSearchFormGroup.controls['category'].valueChanges);
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.partecipationSearchFormGroup.controls['type'].valueChanges);
		this.filteredPartecipationStatus = this.ippAutocompleteFilterService.filterPartecipationStatus(this.partecipationSearchFormGroup.controls['partecipationStatus'].valueChanges);
		this.filteredPartecipationType = this.standardAutocompleteFilterService.filterIlPpPartecipationType(this.partecipationSearchFormGroup.controls['partecipationType'].valueChanges);
		

	}

	resetFiltersPartecipation() {
		this.partecipationSearchFormGroup.reset();
		this.partecipationSearchWithFilter();
	}

	partecipationSearchWithFilter() {
		let filters: any = {};
		
		let searchedId = this.partecipationSearchFormGroup.value.procurementLotCigEquals;
		if (searchedId != null) {
			this.partecipationSearchFormGroup.reset();
			filters.procurementLotCigEquals = searchedId;
		} else {
			filters = this.partecipationSearchFormGroup.value;

			if(filters.contractorEopoo) {
				filters.contractorCodeEquals = filters.contractorEopoo.id;
			}
			if(filters.ilPpProcurementModality) {
				filters.procurementModalityCodeEquals = filters.ilPpProcurementModality.code;
			}
			if(filters.procurementLotOfferExpiryDateStart) {
				filters.procurementModalityCodeEquals = filters.ilPpProcurementModality.code;
			}
			
		}
		this.partecipationFilters = filters;
	}



	
	
	//			---- PROCUREMENT LOT TABLE SECTION ----


	newTableColumns: string[] = ['_ck','procurement.contractorEopoo','candidacy', 'procurementLot.description', 'procurementLot.cig', 'proposerEopoo','procurementLot.offerExpiryDate','procurementLot.baseAmount','categories','status', ];
	newTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "primary",
			class: "",
			command: (e: any) => {
				this.gcs.router.navigateByUrl("/ipp/partecipation/detail/" + e.id);
			}
		},{
			label: "Edit",
			hideLabel: true,
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "ml-4",
			command: (e: any) => {
				this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: {partecipation: e } });
			}
		},{
			label: "Delete",
			hideLabel: true,
			icon: "pi pi-trash",
			severity: "danger",
			class: "ml-4",
			command: async (e: any) => {
				this.gcs.fuseProgressBarService.show();
				try {
					await this.partecipationResourceService.deletePartecipationUsingDELETE(e.id).toPromise();
					this._snackBar.open(`partecipation: '${e.id}' deleted.`, null, { duration: 2000, });

					this.gcs.eventService.reloadCurrentPage();
				} catch (e) {
					this._snackBar.open(`Error during deleting partecipation: '${e.id}'. (${e.message})`, null, { duration: 5000, });
				}
				this.gcs.fuseProgressBarService.hide();
			}
		},
	]


	//			---- PROCUREMENT LOT OTHER FN SECTION ----

	

	newPartecipation(): void {
        this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: {  } });
    }

	
	async publish() {
		await this.partecipationResourceService.publishUsingGET3(this.partecipationFilters).toPromise();
	}

}
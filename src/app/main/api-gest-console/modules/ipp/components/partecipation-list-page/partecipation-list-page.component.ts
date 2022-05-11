import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, PageEvent } from "@angular/material";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteDisplayService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { AigIppAutocompleteDisplayService } from "aig-common/modules/ipp/service/autocomplete-display.service";
import { AigIppAutocompleteService } from "aig-common/modules/ipp/service/autocomplete-filter.service";
import { AigStandardAutocompleteFilterService } from "aig-common/modules/standard/services/autocomplete-filter.service";
import { AigStandardAutocompleteDisplayService } from "aig-common/modules/standard/services/autocomplete-function.service";
import { EopooResourceService } from "aig-generic";
import { EopooDTO, PartecipationDTO, PartecipationResourceService, PartecipationStatusDTO} from "aig-italianlegislation";
import { IlPpPartecipationTypeDTO, IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotCategoryDTO, IlPpProcurementLotTypeDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO } from "aig-standard";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { Observable } from "rxjs";
import { AigIppGenericComponent } from "../ipp-generic-component";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";

@Component({
	selector:'aig-partecipation-list-page',
    templateUrl: './partecipation-list-page.component.html',
    styleUrls: ['./partecipation-list-page.component.scss']
})
export class AigPartecipationListPageComponent extends AigIppGenericComponent {

	@Input()
	staticEopoo: EopooDTO = null;

	@Input() hideEdit: boolean = false;

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
		private eopooResourceService: EopooResourceService,
		public gcs: AigGenericComponentService,
    ) { super(gcs) }



	

	


    loadPage() {
		this.initPartecipationSearch();

		this.prepareTableButtons();

		this.partecipationSearchWithFilter();
	}

	async reloadPage() {
		this.partecipationSearchWithFilter();
	}

	


	
//			---- SEARCH SECTION ----

	partecipationSearchFormGroup: FormGroup;
	partecipationFilters: any;


	filteredContractorEopoo: Observable<EopooDTO[]>;
	filteredProposerEopoo: Observable<EopooDTO[]>;
    filteredAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;
    filteredIppLotCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredIppLotType: Observable<IlPpProcurementLotTypeDTO[]>;
	filteredPartecipationStatus: Observable<PartecipationStatusDTO[]>;
	filteredPartecipationType: Observable<IlPpPartecipationTypeDTO[]>;

	private initPartecipationSearch() {
		this.partecipationSearchFormGroup = this._formBuilder.group({
			id: [null],
			procurementLotCigEquals: [null],
			contractorEopoo: [null],
			procurementLotDescriptionContains: [null],
			procurementLotOfferExpiryDateStart: [null],
			procurementLotOfferExpiryDateEnd: [null],
			procurementLotCategories: [null],
			partecipationStatus: [null],
			proposerEopoo: [null],
            awardCriterion: [null],
            procurementLotType: [null],
			partecipationType: [null],
		});


		this.filteredContractorEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['contractorEopoo'].valueChanges);
        this.filteredIppLotCategory = this.standardAutocompleteFilterService.loadIppLotCategory({});
		this.filteredPartecipationStatus = this.ippAutocompleteFilterService.filterPartecipationStatus(this.partecipationSearchFormGroup.controls['partecipationStatus'].valueChanges);
		this.filteredProposerEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationSearchFormGroup.controls['proposerEopoo'].valueChanges);
        this.filteredAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.partecipationSearchFormGroup.controls['awardCriterion'].valueChanges);
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.partecipationSearchFormGroup.controls['procurementLotType'].valueChanges);

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
				filters.contractorEopoo = null;
			}
			if(filters.procurementLotOfferExpiryDateStart) {
				filters.procurementLotOfferExpiryDateGreaterThanOrEqual = filters.procurementLotOfferExpiryDateStart;
			}
			if(filters.procurementLotOfferExpiryDateEnd) {
				filters.procurementLotOfferExpiryDateLessThanOrEqual = filters.procurementLotOfferExpiryDateEnd;
			}
			if(filters.partecipationStatus) {
				filters.partecipationStatusIDEquals = filters.partecipationStatus.id;
				filters.partecipationStatus = null;
			}
			if(filters.proposerEopoo) {
				filters.proposerCodeEquals = filters.proposerEopoo.id;
			}
			if(filters.awardCriterion) {
				filters.procurementLotAwardCriterionCodeEquals = filters.awardCriterion.code;
				filters.awardCriterion = null;
			}
			if(filters.procurementLotType) {
				filters.procurementLotTypeCodeEquals = filters.procurementLotType.code;
				filters.procurementLotType = null;
			}
			if(filters.procurementLotCategories) {
				console.log(filters.procurementLotCategories);
			}
		}
		
		// Static filters
		if(this.staticEopoo) {
			filters.proposerCodeEquals = this.staticEopoo.id;
		}

		this.partecipationFilters = filters;
	}



	
	
	//			---- PROCUREMENT LOT TABLE SECTION ----


	newTableColumns: string[] = ['_ck','id','procurement.contractorEopoo','candidacy', 'procurementLot.description', 'categories', 'procurementLot.cig', 'proposerEopoo','procurementLot.offerExpiryDate','procurementLot.baseAmount','status'];
	newTableButtons: any[] = [];

	prepareTableButtons() {
		this.newTableButtons.push({
		
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "primary",
			class: "",
			command: (e: any) => {
				this.gcs.router.navigateByUrl("/ipp/partecipation/detail/" + e.id);
			}
		});

		if(!this.hideEdit) {
			this.newTableButtons.push({
				label: "Edit",
				hideLabel: true,
				icon: "pi pi-pencil",
				severity: "secondary",
				class: "ml-4",
				command: (e: any) => {
					this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: {partecipation: e } });
				}
			});
			this.newTableButtons.push({
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
			});
	
		}
	}


	//			---- PROCUREMENT LOT OTHER FN SECTION ----

	

	newPartecipation(): void {
        this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: {  } });
    }

	
	async publish() {
		await this.partecipationResourceService.publishUsingGET3(this.partecipationFilters).toPromise();
	}

}
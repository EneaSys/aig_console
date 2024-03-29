import { Component, Input } from '@angular/core';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italianlegislation';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AigProcurementLotNewUpdateDialogComponent } from '../procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component';
import { AigIppGenericComponent } from '../ipp-generic-component';
import { Observable } from 'rxjs';
import { EopooDTO } from 'aig-generic';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';
import { IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotCategoryDTO, IlPpProcurementLotTypeDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO } from 'aig-standard';
import { AigPartecipationNewUpdateDialogComponent } from '../partecipation-new-update-dialog/partecipation-new-update-dialog.component';
import { AigProcurementComplexNewDialogComponent } from '../procurement-complex-new-dialog/procurement-complex-new-dialog.component';

@Component({
	selector: 'aig-procurement-lot-list-page',
    templateUrl: './procurement-lot-list-page.component.html',
    styleUrls: ['./procurement-lot-list-page.component.scss']
})
export class AigProcurementLotListPageComponent extends AigIppGenericComponent {
	
	@Input() staticEopoo: EopooDTO = null;
	@Input() partecipationFn: any;
	@Input() hideEdit: boolean = false;

    constructor(
        public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        public genericAutocompleteFilterService:  AigGenericAutocompleteFilterService,
        public standardAutocompleteFilterService:  AigStandardAutocompleteFilterService,
        public standardAutocompleteDisplayService:  AigStandardAutocompleteDisplayService,

        private procurementLotResourceService: ProcurementLotResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        public gcs: AigGenericComponentService,
    ) {
        super(gcs)
    }




    loadPage() {
        this.initProcurementLotSearch();

		this.prepareTableButtons();

        this.procurementLotSearchWithFilter();
    }

    reloadPage() {
        this.procurementLotSearchWithFilter();
    }






	//			---- PROCUREMENT LOT SEARCH SECTION ----

    procurementLotSearchFormGroup: FormGroup;
    procurementLotFilters: any;
    
    filteredContractorEopoo: Observable<EopooDTO[]>;
    
	filteredIppCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredIppAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;
    filteredIppType: Observable<IlPpProcurementLotTypeDTO[]>;
	filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;
	filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
	filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    
    private initProcurementLotSearch() {
        this.procurementLotSearchFormGroup = this._formBuilder.group({
			id: [null],

			procurementLotCigEquals: [null],
			contractorEopoo: [null],
			procurementLotDescriptionContains: [null],
			procurementLotOfferExpiryDateStart: [new Date()],
			procurementLotOfferExpiryDateEnd: [null],
			procurementLotCategories: [null],

            ippCategory: [null],
			ippAwardCriterion: [null],
            ippType: [null],
			ippModality: [''],
			ippProcedure: [''],
			ippSector: [''],
        });
    
        this.filteredContractorEopoo = this.genericAutocompleteFilterService.filterEopoo(this.procurementLotSearchFormGroup.controls['contractorEopoo'].valueChanges);

        this.filteredIppCategory = this.standardAutocompleteFilterService.loadIppLotCategory({});
        this.filteredIppAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.procurementLotSearchFormGroup.controls['ippAwardCriterion'].valueChanges);
        this.filteredIppType = this.standardAutocompleteFilterService.filterIppLotType(this.procurementLotSearchFormGroup.controls['ippType'].valueChanges);
		this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementLotSearchFormGroup.controls['ippModality'].valueChanges);
		this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.procurementLotSearchFormGroup.controls['ippProcedure'].valueChanges);
		this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.procurementLotSearchFormGroup.controls['ippSector'].valueChanges);
    }


	resetFiltersProcurementLot() {
        this.procurementLotSearchFormGroup.reset();
		this.procurementLotSearchFormGroup.controls.procurementLotOfferExpiryDateStart.setValue(new Date());
		this.procurementLotSearchWithFilter();
    }

    procurementLotSearchWithFilter() {
		let filters: any = {};
		
		let searchedId = this.procurementLotSearchFormGroup.value.procurementLotCigEquals;
		if (searchedId != null) {
			this.procurementLotSearchFormGroup.reset();
			filters.procurementLotCigEquals = searchedId;
		} else {
			filters = this.procurementLotSearchFormGroup.value;

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

			if(filters.ippAwardCriterion) {
				filters.procurementLotAwardCriterionCodeEquals = filters.ippAwardCriterion.code;
				filters.ippAwardCriterion = null;
			}
			if(filters.ippType) {
				filters.procurementLotTypeCodeEquals = filters.ippType.code;
				filters.ippType = null;
			}
			if(filters.ippCategory) {
				console.log(filters.ippCategory);
			}
			if (filters.ippModality) {
				filters.procurementModalityCodeEquals = filters.ippModality.code;
				filters.ippModality = null;
			}
			if (filters.ippProcedure) {
				filters.procurementProcedureCodeEquals = filters.ippProcedure.code;
				filters.ippProcedure = null;
			}
			if (filters.ippSector) {
				filters.procurementSectorCodeEquals = filters.ippSector.code;
				filters.ippSector = null;
			}
		}

		if(this.staticEopoo) {
			filters.proposerCodeEquals = this.staticEopoo.id;
		}
		filters.sort = ['procurementLotOfferExpiryDate,asc'];

		this.procurementLotFilters = filters;
	}







	//			---- PROCUREMENT LOT TABLE SECTION ----




	newTableColumns: string[] = ['id', 'procurement.contractorEopoo', 'cig', 'candidacy', 'description', 'categories', 'baseAmount', 'offerExpiryDate'];
	newTableButtons: any[] = [];

	prepareTableButtons() {
		this.newTableButtons.push({
			label: "Partecipa",
			severity: "secondary",
			class: "ml-8",
			command: (e: any) => {
				if(this.partecipationFn) {
					this.partecipationFn(e);
				} else {
					this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { procurementLot: e, proposerEopoo: this.staticEopoo } });
				}
			}
		});
		this.newTableButtons.push({
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "primary",
			class: "mt-4",
			command: (e: any) => {
				this.gcs.router.navigateByUrl("/ipp/procurement-lot/detail/" + e.id);
			},
		});

		if(!this.hideEdit) {
			this.newTableButtons.push({
				label: "Edit",
				hideLabel: true,
				icon: "pi pi-pencil",
				severity: "secondary",
				class: "mt-4 ml-4",
				command: (e: any) => {
					this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: e } });
				}
			});

			this.newTableButtons.push({
				label: "Delete",
				hideLabel: true,
				icon: "pi pi-trash",
				severity: "danger",
				class: "mt-4  ml-4",
				command: async (e: any) => {
					this.gcs.fuseProgressBarService.show();
					try {
						await this.procurementLotResourceService.deleteProcurementLotUsingDELETE(e.id).toPromise();
						this._snackBar.open(`Procurement Lot: '${e.id}' deleted.`, null, { duration: 2000, });
						this.gcs.eventService.reloadCurrentPage();
					} catch (e) {
						this._snackBar.open(`Error during deleting procurement lot: '${e.id}'. (${e.message})`, null, { duration: 5000, });
					}
					this.gcs.fuseProgressBarService.hide();
				}
			});
		}
	}








//			---- PROCUREMENT LOT OTHER FN SECTION ----


    newProcurementLot(): void {
		this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: {} });
	}

	newProcurementComplex(): void {
		this.dialog.open(AigProcurementComplexNewDialogComponent, { data: {} });
	}


	async publish() {
		await this.procurementLotResourceService.publishUsingGET6(this.procurementLotFilters).toPromise();
	}


    
}














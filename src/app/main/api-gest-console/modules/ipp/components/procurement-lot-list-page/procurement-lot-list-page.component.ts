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

@Component({
    templateUrl: './procurement-lot-list-page.component.html',
    styleUrls: ['./procurement-lot-list-page.component.scss']
})
export class AigProcurementLotListPageComponent extends AigIppGenericComponent {
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


    filteredEopoo: Observable<EopooDTO[]>;
    filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;
    filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
    filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    filteredAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;
    filteredIppLotCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredIppLotType: Observable<IlPpProcurementLotTypeDTO[]>;


    loadPage() {
        this.initProcurementLotSearch();

        this.showAllProcurementLot();
    }

    reloadPage() {
        this.showAllProcurementLot();
    }






	newTableColumns: string[] = ['_ck', 'cig', 'description', 'type', 'categories', 'baseAmount', 'offerExpiryDate'];
	newTableButtons: any[] = [
		{
			name: "Partecipa",
			severity: "secondary",
			class: "",
			fn: (e: any) => {
				this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { procurementLot: e } });
			}
		},{
			name: "Dettagli",
			severity: "primary",
			class: "mt-4",
			fn: (e: any) => {
				this.gcs.router.navigateByUrl("/ipp/procurement-lot/detail/" + e.id);
			}
		},{
			name: "Edit",
			severity: "secondary",
			class: "mt-4 ml-4",
			fn: (e: any) => {
				this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: e } });
			}
		},{
			name: "Delete",
			severity: "danger",
			class: "mt-4",
			fn: async (e: any) => {
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
		},
	]





	//			---- PROCUREMENT LOT TABLE AND SEARCH SECTION ----

    procurementLotSearchFormGroup: FormGroup;
    procurementLotFilters: any;
    

    
    private initProcurementLotSearch() {
        this.procurementLotSearchFormGroup = this._formBuilder.group({
            id: [''],
            cig: [''],
            description: [''],
            offerExpiryDate: [''],
            contractorEopoo: [''],
            ippModality: [''],
            ippProcedure: [''],
            ippSector: [''],
            awardCriterion: [''],
            category: [''],
            type: [''],
        });
    
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.procurementLotSearchFormGroup.controls['contractorEopoo'].valueChanges);
        this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementLotSearchFormGroup.controls['ippModality'].valueChanges);
        this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.procurementLotSearchFormGroup.controls['ippProcedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.procurementLotSearchFormGroup.controls['ippSector'].valueChanges);
        this.filteredAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.procurementLotSearchFormGroup.controls['awardCriterion'].valueChanges);
        this.filteredIppLotCategory = this.standardAutocompleteFilterService.filterIppLotCategory(this.procurementLotSearchFormGroup.controls['category'].valueChanges);
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.procurementLotSearchFormGroup.controls['type'].valueChanges);
    }


    private clearFiltersProcurementLot() {
        this.procurementLotFilters = {
            procurementLotIDEqual: null,
            cigEquals: null,
            descriptionContains: null,
            offerExpiryDateEquals: null,
            contractorEopooCodeEquals: null,
            ippModalityCodeEquals: null,
            ippProcedureCodeEquals: null,
            ippSectorCodeEquals: null,
            awardCriterionCodeEquals: null,
            categoryCodeEquals: null,
            typeCodeEquals: null,
        }
    }
	
	resetFiltersProcurementLot() {
        this.procurementLotSearchFormGroup.reset();
        this.clearFiltersProcurementLot();
    }

    showAllProcurementLot() {
        this.resetFiltersProcurementLot();
    }

    procurementLotSearchWithFilter() {
		let procurementLotFilters: any = {};

		let searchedId = this.procurementLotSearchFormGroup.controls.id.value;
		if (searchedId != null) {
			this.clearFiltersProcurementLot();
			this.procurementLotSearchFormGroup.reset();
			procurementLotFilters.procurementLotIDEquals = searchedId;
		} else {
			if (this.procurementLotSearchFormGroup.controls.cig.value) {
				procurementLotFilters.cigEquals = this.procurementLotSearchFormGroup.controls.cig.value;
			}
			if (this.procurementLotSearchFormGroup.controls.description.value) {
				procurementLotFilters.descriptionContains = this.procurementLotSearchFormGroup.controls.description.value;
			}
			if (this.procurementLotSearchFormGroup.controls.offerExpiryDate.value ) {
				procurementLotFilters.offerExpiryDateEquals = this.procurementLotSearchFormGroup.controls.offerExpiryDate.value;
			}

			if (this.procurementLotSearchFormGroup.controls.contractorEopoo.value ) {
				procurementLotFilters.procurementContractorEopooCodeEquals = this.procurementLotSearchFormGroup.controls.contractorEopoo.value.id;
			}

			if (this.procurementLotSearchFormGroup.controls.ippModality.value ) {
				procurementLotFilters.ippModalityCodeEquals = this.procurementLotSearchFormGroup.controls.ippModality.value;
			}

			if (this.procurementLotSearchFormGroup.controls.ippProcedure.value) {
				procurementLotFilters.ippProcedureCodeEquals = this.procurementLotSearchFormGroup.controls.ippProcedure.value;
			}

			if (this.procurementLotSearchFormGroup.controls.ippSector.value ) {
				procurementLotFilters.ippSectorCodeEquals = this.procurementLotSearchFormGroup.controls.ippSector.value;
			}
			if (this.procurementLotSearchFormGroup.controls.awardCriterion.value ) {
				procurementLotFilters.awardCriterionCodeEquals = this.procurementLotSearchFormGroup.controls.awardCriterion.value;
			}

			if (this.procurementLotSearchFormGroup.controls.category.value ) {
				procurementLotFilters.categoryCodeEquals = this.procurementLotSearchFormGroup.controls.category.value.code;
			}


			if (this.procurementLotSearchFormGroup.controls.type.value ) {
				procurementLotFilters.typeCodeEquals = this.procurementLotSearchFormGroup.controls.type.value.code;
			}

			this.procurementLotFilters = procurementLotFilters;
		}
	}

    newProcurementLot(): void {
		this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: {} });
	}

	async publish() {
		await this.procurementLotResourceService.publishUsingGET5(this.procurementLotFilters).toPromise;
	}


    
}














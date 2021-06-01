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
        aigGenericComponentService: AigGenericComponentService,
    ) {
        super(aigGenericComponentService)
    }


    procurementLotSearchFormGroup: FormGroup;


    filteredEopoo: Observable<EopooDTO[]>;
    filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;
    filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
    filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    filteredAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;
    filteredIppLotCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredIppLotType: Observable<IlPpProcurementLotTypeDTO[]>;


    searchFilters: any;
    
    procurementLotDC: string[] = ['id', 'cig', 'description', 'type', 'category', 'amount', 'offerExpiryDate', 'buttons'];

    loadPage() {
        this.initProcurementLotSearch();

        this.search();
    }

    reloadPage() {
        this.search();
    }


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

    private clearFilters() {
        this.procurementLotSearchFormGroup.reset();
        this.searchFilters = {}
    }






    showAll() {
        this.clearFilters();
        this.search();
    }








    private search() {
        let searchFilters: any = {};

        let searchedId = this.procurementLotSearchFormGroup.controls.id.value;
        if (searchedId != null) {
            this.clearFilters();
            searchFilters.procurementLotIDEquals = searchedId;
        } else {



            if (this.procurementLotSearchFormGroup.controls.cig.value) {
                searchFilters.cigEquals = this.procurementLotSearchFormGroup.controls.cig.value;
            }
            if (this.procurementLotSearchFormGroup.controls.description.value) {
                searchFilters.descriptionContains = this.procurementLotSearchFormGroup.controls.description.value;
            }
            if (this.procurementLotSearchFormGroup.controls.offerExpiryDate.value ) {
                searchFilters.offerExpiryDateEquals = this.procurementLotSearchFormGroup.controls.offerExpiryDate.value;
            }
    
            if (this.procurementLotSearchFormGroup.controls.contractorEopoo.value ) {
                searchFilters.procurementContractorEopooCodeEquals = this.procurementLotSearchFormGroup.controls.contractorEopoo.value.id;
            }
    
            if (this.procurementLotSearchFormGroup.controls.ippModality.value ) {
                searchFilters.ippModalityCodeEquals = this.procurementLotSearchFormGroup.controls.ippModality.value.code;
            }
    
            if (this.procurementLotSearchFormGroup.controls.ippProcedure.value) {
                searchFilters.ippProcedureCodeEquals = this.procurementLotSearchFormGroup.controls.ippProcedure.value.code;
            }
    
            if (this.procurementLotSearchFormGroup.controls.ippSector.value ) {
                searchFilters.ippSectorCodeEquals = this.procurementLotSearchFormGroup.controls.ippSector.value.code;
            }
            if (this.procurementLotSearchFormGroup.controls.awardCriterion.value ) {
                searchFilters.awardCriterionCodeEquals = this.procurementLotSearchFormGroup.controls.awardCriterion.value.code;
            }
    
            if (this.procurementLotSearchFormGroup.controls.category.value ) {
                searchFilters.categoryCodeEquals = this.procurementLotSearchFormGroup.controls.category.value.code;
            }
    
            if (this.procurementLotSearchFormGroup.controls.type.value ) {
                searchFilters.typeCodeEquals = this.procurementLotSearchFormGroup.controls.type.value.code;
            }
        }

        this.searchFilters = searchFilters;
    }























    newProcurementLot(): void {
        this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: {} } });
    }
    
}














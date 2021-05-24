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
import { IlPpProcurementLotAwardCriterionDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO } from 'aig-standard';

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


    filteredEopoo: Observable<EopooDTO[]>;
    filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;
    filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
    filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    filteredAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;


    loadPage() {
        this.initProcurementLotSearch();

        this.showAllProcurementLot();
    }

    reloadPage() {
        this.showAllProcurementLot();
      }




    
     //			---- PROCUREMENT LOT TABLE AND SEARCH SECTION ----

    procurementLotSearchFormGroup: FormGroup;
    procurementLotPaginationSize: number;
    procurementLotFilters: any;
    

    procurementLotLength: number;
    procurementLotDTOs: ProcurementLotDTO[];
    @Input()
    procurementLotDC: string[] = ['id', 'cig', 'description', 'type', 'category', 'amount', 'offerExpiryDate', 'buttons'];
    procurementLotError: any;

   


    private initProcurementLotSearch() {
        this.procurementLotPaginationSize = 10
    
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
        });
    

  

        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.procurementLotSearchFormGroup.controls['contractorEopoo'].valueChanges);
        this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementLotSearchFormGroup.controls['ippModality'].valueChanges);
        this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.procurementLotSearchFormGroup.controls['ippProcedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.procurementLotSearchFormGroup.controls['ippSector'].valueChanges);
        this.filteredAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.procurementLotSearchFormGroup.controls['awardCriterion'].valueChanges);
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

            page: 0,
        }
    }

    private async searchProcurementLot(page: number) {
        this.procurementLotFilters.page = page;
        this.procurementLotFilters.size = this.procurementLotPaginationSize;
        this.procurementLotDTOs = null;
    
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.procurementLotSearchFormGroup.controls['contractorEopoo'].valueChanges);
        this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementLotSearchFormGroup.controls['ippModality'].valueChanges);
        this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.procurementLotSearchFormGroup.controls['ippProcedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.procurementLotSearchFormGroup.controls['ippSector'].valueChanges);
        this.filteredAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.procurementLotSearchFormGroup.controls['awardCriterion'].valueChanges);


        try {
            this.procurementLotLength = await this.procurementLotResourceService.countProcurementLotsUsingGET(this.procurementLotFilters).toPromise();
            if (this.procurementLotLength == 0) {
                this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
                this.procurementLotDTOs = [];
                return;
            }
            this.procurementLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(this.procurementLotFilters).toPromise();
        } catch (e) { 
            this.procurementLotError = e;
        }
    }

    showAllProcurementLot() {
        this.resetFiltersProcurementLot();
    }
        
        
    resetFiltersProcurementLot() {
        this.procurementLotSearchFormGroup.reset();
        this.clearFiltersProcurementLot();
        this.searchProcurementLot(0);
    }

    procurementLotPaginationEvent(pageEvent: PageEvent) {
        this.procurementLotPaginationSize = pageEvent.pageSize;
        this.searchProcurementLot(pageEvent.pageIndex);
       
    }

    procurementLotSearchWithFilter() {
    let searchedId = this.procurementLotSearchFormGroup.controls.id.value;

    if (searchedId != null) {
      this.clearFiltersProcurementLot();
      this.procurementLotSearchFormGroup.reset();
      this.procurementLotFilters.procurementLotIDEquals = searchedId;
      this.searchProcurementLot(0);
      return;
    } else {

        if (this.procurementLotSearchFormGroup.controls.cig.value) {
            this.procurementLotFilters.cigEquals = this.procurementLotSearchFormGroup.controls.cig.value;
        }
        if (this.procurementLotSearchFormGroup.controls.description.value) {
            this.procurementLotFilters.descriptionContains = this.procurementLotSearchFormGroup.controls.description.value;
        }
        if (this.procurementLotSearchFormGroup.controls.offerExpiryDate.value ) {
            this.procurementLotFilters.offerExpiryDateEquals = this.procurementLotSearchFormGroup.controls.offerExpiryDate.value;
        }

        if (this.procurementLotSearchFormGroup.controls.contractorEopoo.value ) {
            this.procurementLotFilters.procurementContractorEopooCodeEquals = this.procurementLotSearchFormGroup.controls.contractorEopoo.value.id;
        }

        if (this.procurementLotSearchFormGroup.controls.ippModality.value ) {
            this.procurementLotFilters.ippModalityCodeEquals = this.procurementLotSearchFormGroup.controls.ippModality.value;
        }

        if (this.procurementLotSearchFormGroup.controls.ippProcedure.value) {
            this.procurementLotFilters.ippProcedureCodeEquals = this.procurementLotSearchFormGroup.controls.ippProcedure.value;
        }

        if (this.procurementLotSearchFormGroup.controls.ippSector.value ) {
            this.procurementLotFilters.ippSectorCodeEquals = this.procurementLotSearchFormGroup.controls.ippSector.value;
        }
        if (this.procurementLotSearchFormGroup.controls.awardCriterion.value ) {
            this.procurementLotFilters.awardCriterionCodeEquals = this.procurementLotSearchFormGroup.controls.awardCriterion.value;
        }
        this.searchProcurementLot(0);
    }
}

    newProcurementLot(): void {
        this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: {} } });
    }
    
}














import { Component, OnInit } from '@angular/core';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italian-public-procurement';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { PageEvent } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './ipp-lot-list-page.component.html',
    styleUrls: ['./ipp-lot-list-page.component.scss']
})
export class AigIppLotListPageComponent extends GenericComponent {
    constructor(
        private procurementLotResourceService: ProcurementLotResourceService,
        private _formBuilder: FormBuilder,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    loadComponent() {
        this.loadForm();
        this.cleanFiltersAndLoadIppLot();
    }





    

    formatFilterAmountMin(event: any) {
        this.ippLotFilters.amountMin = event.value;
    }

    formatFilterAmountMax(event: any) {
        this.ippLotFilters.amountMax = event.value;
    }

    formatFilterSlider(value: number) {
        if (value >= 1000 && value < 1000000) {
            return Math.round(value / 1000) + 'k';
        }
        if (value == 1000001) {
            return 'max';
        }
        if (value >= 1000000) {
            return Math.round(value / 1000000) + 'm';
        }    
        return value;
    }










    // Filters
    ippLotSearchForm: FormGroup;


    loadForm() {
        this.ippLotSearchForm = this._formBuilder.group({
            cig: [''],
            description: [''],
            date: [''],
        });
    }



    ippLotSearch() {
        if (this.ippLotSearchForm.value.cig) {
            this.cleanFiltersIppLot();
            this.setFilterIppLot('cig', this.ippLotSearchForm.value.cig);
        } else {
            if (this.ippLotSearchForm.value.description != "") {
                this.ippLotFilters.description = this.ippLotSearchForm.value.description;
            }
            if (this.ippLotSearchForm.value.date != "") {
                this.ippLotFilters.date = this.ippLotSearchForm.value.date;
            }
            this.reloadFilter();
        }
    }


    // IPP LOT
    ippLotDisplayedColumns: string[] = ['cig', 'description', 'amount', 'type', 'category', 'offerExpiryDate'];
    ippLotDTOs: ProcurementLotDTO[];
    ippLotError: any;

    ippLotPageable = {
        page: 0,
        size: 30,
    }
    ippLotIndex: number;
    ippLotLength: number;

    ippLotFilters: any;

    cleanFiltersAndLoadIppLot() {
        this.cleanFiltersIppLot();
        this.reloadFilter();
    }

    private cleanFiltersIppLot() {
        this.ippLotSearchForm.reset();

        this.ippLotIndex = 0;

        this.ippLotFilters = {
            cig: null,
            description: null,
            amountMin: null,
            amountMax: null,
            ippLotTypeCode: null,
            ippLotCategoryCode: null,
        }
    }

    setFilterIppLot(filterKey: string, value: any) {
        this.ippLotFilters[filterKey] = value;
        this.reloadFilter();
    }

    private async reloadFilter() {
        this.loadIppLots(0);
        try {
            this.ippLotLength = await this.procurementLotResourceService.countProcurementLotsUsingGET(null, null, this.ippLotFilters.amountMin, null, null, this.ippLotFilters.amountMax, null, null, null, null, this.ippLotFilters.cig, null, null, null, null, null, null, null, null, null, this.ippLotFilters.description, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotFilters.ippLotCategoryCode, null, null, null, null, null, this.ippLotFilters.ippLotTypeCode, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).toPromise();
        } catch (e) { }
    }

    ippLotPaginatorEvent(event: PageEvent) {
        this.ippLotPageable.size = event.pageSize;
        this.loadIppLots(event.pageIndex);
    }

    private async loadIppLots(page) {
        this.ippLotDTOs = null;

        this.ippLotIndex = page
        this.ippLotPageable.page = page;
        try {
            this.ippLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(null, null, this.ippLotFilters.amountMin, null, null, this.ippLotFilters.amountMax, null, null, null, null, this.ippLotFilters.cig, null, null, null, null, null, null, null, null, null, this.ippLotFilters.description, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotFilters.ippLotCategoryCode, null, null, null, null, null, this.ippLotFilters.ippLotTypeCode, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotPageable.page, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, this.ippLotPageable.size, null).toPromise();
        } catch (e) {
            this.ippLotError = e;
        }
    }
}

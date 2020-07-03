import { Component, OnInit } from '@angular/core';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italian-public-procurement';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { PageEvent } from '@angular/material';

@Component({
    templateUrl: './ipp-lot-list-page.component.html',
    styleUrls: ['./ipp-lot-list-page.component.scss']
})
export class AigIppLotListPageComponent extends GenericComponent {
    constructor(
        private procurementLotResourceService: ProcurementLotResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    
    loadComponent() {
        this.cleanFilterIppLot();
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

    ippLotFilter: any;

    cleanFilterIppLot() {
        this.ippLotIndex = 0;

        this.ippLotFilter = {
            seller: null,
        }

        this.reloadFilter();
    }

    setFilterIppLot(filterKey: string, value: any) {
        this.ippLotFilter[filterKey] = value;
        this.reloadFilter();
    }

    private async reloadFilter() {
        this.loadIppLots(0);
        try {
            this.ippLotLength = await this.procurementLotResourceService.countProcurementLotsUsingGET().toPromise();
        } catch(e) { }
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
            this.ippLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.ippLotPageable.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.ippLotPageable.size,null).toPromise();
        } catch(e) {
            this.ippLotError = e;
        }
    }
}

import { Component, Input, OnInit } from '@angular/core';

import { GleButtonFunctions } from '@aig-ng/tools/enum/button-functions';
import { GleListDisplayModality } from '@aig-ng/tools/enum/list-display-modality';

import { GleCommonService } from '@aig-ng/tools/services/common.service';

import { IppGenericComponent } from '../../ipp-generic-component';
import { ProcurementLotResourceService } from 'aig-italianlegislation';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'gle-ipp-procurement-lot-list-loader',
    templateUrl: './procurement-lot-list-loader.component.html',
    styleUrls: ['./procurement-lot-list-loader.component.scss']
})
export class GleIppProcurementLotListLoaderComponent extends IppGenericComponent implements OnInit {
    @Input()
    filters: any;
    
    @Input()
    view: GleListDisplayModality;
    @Input()
    dc: string[];

    @Input()
    buttons: GleButtonFunctions[];
    @Input()
    customFunction: any[];
    
    constructor(
        private resourceService: ProcurementLotResourceService,
        gcs: GleCommonService
    ) { super(gcs); }

    loading: boolean;
    ds: any[];
    
    pageable: any = {
        page: 0,
        size: 10
    }

    pagination: any = {
        totalRecords: 0,
        first: 0,
        last: 0    
    }

    selectedElements: any[] = [];

    ngOnInit(): void {
        
    }

    async loadData() {
        this.filters = {
            page: this.pageable.page,
            size: this.pageable.size
        };
        
        this.ds = await this.resourceService.getAllProcurementLotsUsingGET(this.filters).toPromise();
        this.pagination.totalRecords = this.ds.length + 45;
    }

    async lazyLoad(event: LazyLoadEvent) {
        this.loading = true;

        this.pageable.page = event.first / event.rows;
        this.pageable.size = event.rows;
        
        await this.loadData();

        this.pagination.first = event.first + 1;
        this.pagination.last = event.first + event.rows;
        if(this.pagination.last > this.pagination.totalRecords) {
            this.pagination.last = this.pagination.totalRecords;
        }

        this.loading = false;
    }
}

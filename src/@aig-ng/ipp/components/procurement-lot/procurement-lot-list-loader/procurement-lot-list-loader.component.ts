import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

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
    filters: any = {};
    
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

    isLoaded: boolean = false;

    loading: boolean = true;
    ds: any[];
    totalRecords: number = 0;

    selectedElements: any[] = [];

    private pageable: any = {};

    private sort: string[] = [];

    ngOnInit(): void {
        
    }

    async changePagination(event: any) {
        this.pageable = event;
        
        await this.loadData();
        this.isLoaded = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if(!this.isLoaded) {
            return;
        }
        this.loadData();
    }

    lazyLoad(event: LazyLoadEvent) {
		if(!this.isLoaded) {
            return;
        }

        this.sort = [];
        if(event.sortField !== undefined) {
            let sortable: string = event.sortField + ',';
            sortable += (event.sortOrder > 0) ? 'asc' : 'desc';
            this.sort.push(sortable);
        }

        if(this.sort.length > 0) {
            this.loadData();
        }
    }


    async loadData() {
        this.loading = true;

        let filters = this.filters;
        filters.page = this.pageable.page;
        filters.size = this.pageable.size;
        filters.sort = this.sort;
        
        this.ds = await this.resourceService.getAllProcurementLotsUsingGET(filters).toPromise();
        
        this.totalRecords = await this.resourceService.countProcurementLotsUsingGET(filters).toPromise();

        this.loading = false;
    }
}

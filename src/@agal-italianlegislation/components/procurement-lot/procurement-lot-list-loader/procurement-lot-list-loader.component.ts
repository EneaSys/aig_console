import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { AgalGenericComponent } from '@agal-core/components/main-generic-component';
import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalListDisplayModality } from '@agal-core/enum/list-display-modality';

import { ProcurementLotResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'agal-procurement-lot-list-loader',
    templateUrl: './procurement-lot-list-loader.component.html',
    styleUrls: ['./procurement-lot-list-loader.component.scss']
})
export class AgalProcurementLotListLoaderComponent extends AgalGenericComponent implements OnInit {
	_filters: any = {};

	@Input()
	set filters(filters: any) {
		this._filters = filters;
		this.loadData();
	}
    
    @Input()
    view: AgalListDisplayModality;
    @Input()
    dcs: string[];
    @Input()
    buttons: any[];

    constructor(
        private resourceService: ProcurementLotResourceService,
        agcs: AgalCommonService
    ) { super(agcs); }

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

		console.log("LazyLoadEvent", event);


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

        let filters = this._filters;
        filters.page = this.pageable.page;
        filters.size = this.pageable.size;
        filters.sort = this.sort;
        
        this.ds = await this.resourceService.getAllProcurementLotsUsingGET(filters).toPromise();
        
        this.totalRecords = await this.resourceService.countProcurementLotsUsingGET(filters).toPromise();

        this.loading = false;
    }
}

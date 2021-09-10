import { AgalListDisplayModality } from "@agal-core/enum/list-display-modality";
import { Input, SimpleChanges } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { AgalCommonService } from "../services/common.service";
import { AgalGenericComponent } from "./main-generic-component";

export class AgalGenericTable extends AgalGenericComponent {
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
        agcs: AgalCommonService
	) { super(agcs); }

	loading: boolean = false;

	ds: any[];
	totalRecords: number = 0;

	selectedElements: any[] = [];

	private pageable: any = {};
	private sort: string[] = [];


	async changePagination(event: any) {
		this.pageable = event;
		
		await this.loadData();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.loadData();
	}

    lazyLoad(event: LazyLoadEvent) {
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
		if(this.loading) {
			return;
		}
		this.loading = true;
		{
			let filters = this._filters;
			filters.page = this.pageable.page;
			filters.size = this.pageable.size;
			filters.sort = this.sort;
			
			await this.callApi(filters);
		}
        this.loading = false;
    }

	protected async callApi(filters: any) { }
}
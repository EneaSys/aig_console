import { Component } from '@angular/core';

import { AgalCommonService } from '@agal-core/services/common.service';

import { ProcurementResourceService } from 'aig-italianlegislation';
import { AgalGenericTable } from '@agal-core/components/main-generic-table';

@Component({
    selector: 'agal-procurement-list-loader',
    templateUrl: './procurement-list-loader.component.html',
    styleUrls: ['./procurement-list-loader.component.scss']
})
export class AgalProcurementListLoaderComponent extends AgalGenericTable {
	constructor(
                private resourceService: ProcurementResourceService,
                agcs: AgalCommonService
	) { super(agcs); }

	protected async callApi(filters: any) {
                this.ds = await this.resourceService.getAllProcurementsUsingGET(filters).toPromise();
        
                this.totalRecords = await this.resourceService.countProcurementsUsingGET(filters).toPromise();
	}
}
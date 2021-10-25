import { Component } from '@angular/core';

import { AgalCommonService } from '@agal-core/services/common.service';

import { ProcurementLotResourceService } from 'aig-italianlegislation';
import { AgalGenericTable } from '@agal-core/components/main-generic-table';

@Component({
	selector: 'agal-procurement-lot-list-loader',
	templateUrl: './procurement-lot-list-loader.component.html',
	styleUrls: ['./procurement-lot-list-loader.component.scss']
})
export class AgalProcurementLotListLoaderComponent extends AgalGenericTable {
	constructor(
		private resourceService: ProcurementLotResourceService,
		agcs: AgalCommonService
	) { super(agcs); }

	protected async callApi(filters: any) {
		this.ds = await this.resourceService.getAllProcurementLotsUsingGET(filters).toPromise();

		this.totalRecords = await this.resourceService.countProcurementLotsUsingGET(filters).toPromise();
	}
}

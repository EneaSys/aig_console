import { Component } from '@angular/core';

import { AgalCommonService } from '@agal-core/services/common.service';

import { PartecipationResourceService } from 'aig-italianlegislation';
import { AgalGenericTable } from '@agal-core/components/main-generic-table';

@Component({
    selector: 'agal-partecipation-list-loader',
    templateUrl: './partecipation-list-loader.component.html',
    styleUrls: ['./partecipation-list-loader.component.scss']
})
export class AgalPartecipationListLoaderComponent extends AgalGenericTable {
	constructor(
        private resourceService: PartecipationResourceService,
        agcs: AgalCommonService
	) { super(agcs); }

	protected async callApi(filters: any) {
		this.ds = await this.resourceService.getAllPartecipationsUsingGET(filters).toPromise();
			
		this.totalRecords = await this.resourceService.countPartecipationsUsingGET(filters).toPromise();
	}
}

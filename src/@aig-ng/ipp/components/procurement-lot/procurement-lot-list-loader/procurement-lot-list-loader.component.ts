import { Component, Input, OnInit } from '@angular/core';

import { GleButtonFunctions } from '@aig-ng/tools/enum/button-functions';
import { GleListDisplayModality } from '@aig-ng/tools/enum/list-display-modality';

import { GleCommonService } from '@aig-ng/tools/services/common.service';

import { IppGenericComponent } from '../../ipp-generic-component';
import { ProcurementLotResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'gle-ipp-procurement-lot-list-loader',
    templateUrl: './procurement-lot-list-loader.component.html',
    styleUrls: ['./procurement-lot-list-loader.component.scss']
})
export class GleIppProcurementLotListLoaderComponent extends IppGenericComponent implements OnInit {
    @Input()
    loading: boolean;
    @Input()
    ds: any[];
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

    ngOnInit(): void {
        if(this.loading == null) {
            this.loadData();
        }
    }

    async loadData() {
        this.loading = true;
        this.filters = {};
        this.ds = await this.resourceService.getAllProcurementLotsUsingGET(this.filters).toPromise();
        this.loading = false;
    }
}

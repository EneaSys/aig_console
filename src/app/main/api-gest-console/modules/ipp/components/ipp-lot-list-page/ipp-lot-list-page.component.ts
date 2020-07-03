import { Component, OnInit } from '@angular/core';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italian-public-procurement';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';

@Component({
    templateUrl: './ipp-lot-list-page.component.html',
    styleUrls: ['./ipp-lot-list-page.component.scss']
})
export class AigIppLotListPageComponent extends GenericComponent {
    constructor(
        private procurementLotResourceService: ProcurementLotResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    procurementLotDisplayedColumns: string[] = ['cig', 'description', 'amount', 'buttons'];
    procurementLotDTOs: ProcurementLotDTO[];

    buyerFilter: any = {};

    async loadComponent() {
        this.procurementLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,200,null).toPromise();
    }
}

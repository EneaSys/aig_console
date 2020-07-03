import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ProcurementResourceService, ProcurementDTO } from 'aig-italian-public-procurement';

@Component({
    templateUrl: './ipp-list-page.component.html',
    styleUrls: ['./ipp-list-page.component.scss']
})
export class AigIppListPageComponent extends GenericComponent {
    constructor(
        private procurementResourceService: ProcurementResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['code', 'description', 'amount', 'SA', 'procedure', 'modality', 'buttons'];
    procurementDTOs: ProcurementDTO[];

    async loadComponent() {
        //togliere i parametri
        this.procurementDTOs = await this.procurementResourceService.getAllProcurementsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 300, null, null, null, null, null, null, null, null, null).toPromise();
    }

    newProcurement(){
        //this.dialog.open(AigIppLotTypeNewUpdateModalComponent, {data: { ippLotType: {} } });
    }
}
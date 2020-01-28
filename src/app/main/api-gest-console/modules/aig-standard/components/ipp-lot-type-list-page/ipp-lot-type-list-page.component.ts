import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementLotTypeDTO, ItalianPublicProcurementLotTypeResourceService } from 'aig-standard';

@Component({
    templateUrl: './ipp-lot-type-list-page.component.html',
    styleUrls: ['./ipp-lot-type-list-page.component.scss']
})
export class AigIppLotTypeListPageComponent extends GenericComponent {
    constructor(
        private ippLotTypeResourceService: ItalianPublicProcurementLotTypeResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    ippLotTypeDTOs: ItalianPublicProcurementLotTypeDTO[];

    async loadComponent() {
       this.ippLotTypeDTOs = await this.ippLotTypeResourceService.getAllItalianPublicProcurementLotTypesUsingGET().toPromise();
    }
}
import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementSectorResourceService, ItalianPublicProcurementSectorDTO } from 'aig-standard';

@Component({
    templateUrl: './ipp-sector-list-page.component.html',
    styleUrls: ['./ipp-sector-list-page.component.scss']
})
export class AigIppSectorListPageComponent extends GenericComponent {
    constructor(
        private ippSectorResourceService: ItalianPublicProcurementSectorResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    ippSectorDTOs: ItalianPublicProcurementSectorDTO[];

    async loadComponent() {
        this.ippSectorDTOs = await this.ippSectorResourceService.getAllItalianPublicProcurementSectorsUsingGET().toPromise();
    }
}
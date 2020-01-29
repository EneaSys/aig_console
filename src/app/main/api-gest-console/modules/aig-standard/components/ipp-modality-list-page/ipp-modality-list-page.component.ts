import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO } from 'aig-standard';

@Component({
    templateUrl: './ipp-modality-list-page.component.html',
    styleUrls: ['./ipp-modality-list-page.component.scss']
})
export class AigIppModalityListPageComponent extends GenericComponent {
    constructor(
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    ippModalityDTOs: ItalianPublicProcurementModalityDTO[];

    async loadComponent() {
        this.ippModalityDTOs = await this.ippModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET().toPromise();
    }
}
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO  } from 'aig-standard';

@Component({
    templateUrl: './ipp-modality-detail-page.component.html',
    styleUrls: ['./ipp-modality-detail-page.component.scss']
})
export class AigIppModalityDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    ippModalityDTO: ItalianPublicProcurementModalityDTO;
    
    loadComponent(): void {
        this.ippModalityDTO = this.route.snapshot.data.ippModality;
    }

}

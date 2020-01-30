import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementLotTypeDTO } from 'aig-standard';

@Component({
    templateUrl: './ipp-lot-type-detail-page.component.html',
    styleUrls: ['./ipp-lot-type-detail-page.component.scss']
})
export class AigIppLotTypeDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    lotTypeDTO: ItalianPublicProcurementLotTypeDTO;
    
    loadComponent(): void {
        this.lotTypeDTO = this.route.snapshot.data.lotType;
    }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementSectorDTO } from 'aig-standard';

@Component({
    templateUrl: './ipp-sector-detail-page.component.html',
    styleUrls: ['./ipp-sector-detail-page.component.scss']
})
export class AigIppSectorDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    sectorDTO: ItalianPublicProcurementSectorDTO;
    
    loadComponent(): void {
        this.sectorDTO = this.route.snapshot.data.sector;
    }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementProcedureDTO } from 'aig-standard';

@Component({
    templateUrl: './ipp-procedure-detail-page.component.html',
    styleUrls: ['./ipp-procedure-detail-page.component.scss']
})
export class AigIppProcedureDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    procedureDTO: ItalianPublicProcurementProcedureDTO;
    
    loadComponent(): void {
        this.procedureDTO = this.route.snapshot.data.procedure;
    }

}

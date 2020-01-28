import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementProcedureDTO } from 'aig-standard';

@Component({
    templateUrl: './ipp-procedure-list-page.component.html',
    styleUrls: ['./ipp-procedure-list-page.component.scss']
})
export class AigIppProcedureListPageComponent extends GenericComponent {
    constructor(
        private ippProcedureResourceService: ItalianPublicProcurementProcedureResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    ippProcedureDTOs: ItalianPublicProcurementProcedureDTO[];

    async loadComponent() {
        this.ippProcedureDTOs = await this.ippProcedureResourceService.getAllItalianPublicProcurementProceduresUsingGET().toPromise();
    }
}
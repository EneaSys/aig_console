import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementProcedureDTO } from 'aig-standard';
import { AigIppProcedureNewUpdateModalComponent } from '../ipp-procedure-new-update-modal/ipp-procedure-new-update-modal.component';

@Component({
    templateUrl: './ipp-procedure-detail-page.component.html',
    styleUrls: ['./ipp-procedure-detail-page.component.scss']
})
export class AigIppProcedureDetailPageComponent extends GenericComponent {
    constructor(
        private ippProcedureResourceService: ItalianPublicProcurementProcedureResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippProcedure: ItalianPublicProcurementProcedureDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            console.log(this.ippProcedure)
            this.ippProcedure = this.route.snapshot.data.ippProcedure;
        } else {
            this.ippProcedure = await this.ippProcedureResourceService.getItalianPublicProcurementProcedureUsingGET(this.ippProcedure.id).toPromise();
        }
    }
    

    editIppProcedureDTO(ippProcedure: ItalianPublicProcurementProcedureDTO) {
        this.dialog.open(AigIppProcedureNewUpdateModalComponent, { data: { ippProcedure: ippProcedure } });
    }

}

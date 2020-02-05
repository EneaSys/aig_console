import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementProcedureDTO } from 'aig-standard';
import { AigIppProcedureDialogComponent } from '../ipp-procedure-dialog-page/ipp-procedure-dialog-page.component';

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

    ippProcedureDTO: ItalianPublicProcurementProcedureDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippProcedureDTO = this.route.snapshot.data.ippProcedure;
        } else {
            this.ippProcedureDTO = await this.ippProcedureResourceService.getItalianPublicProcurementProcedureUsingGET(this.ippProcedureDTO.id).toPromise();
        }
    }
    

    editIppProcedureDTO(ippProcedureDTO: ItalianPublicProcurementProcedureDTO) {
        this.dialog.open(AigIppProcedureDialogComponent, { data: { ippProcedure: ippProcedureDTO } });
    }

}

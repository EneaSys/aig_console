import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO  } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigCpvNewUpdateDialogComponent } from '../cpv-new-update-dialog/cpv-new-update-dialog.component';

@Component({
    templateUrl: './ipp-modality-detail-page.component.html',
    styleUrls: ['./ipp-modality-detail-page.component.scss']
})
export class AigIppModalityDetailPageComponent extends GenericComponent {
    constructor(
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
        private route: ActivatedRoute,
        private dialog : MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippModalityDTO: ItalianPublicProcurementModalityDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippModalityDTO = this.route.snapshot.data.ippModality;
        } else {
            this.ippModalityDTO = await this.ippModalityResourceService.getItalianPublicProcurementModalityUsingGET(this.ippModalityDTO.id).toPromise();
        }
    }

    editIppModality(ippModalityDTO: ItalianPublicProcurementModalityDTO) {
        this.dialog.open(AigCpvNewUpdateDialogComponent, { data: { ippModality: ippModalityDTO } });
    }

}

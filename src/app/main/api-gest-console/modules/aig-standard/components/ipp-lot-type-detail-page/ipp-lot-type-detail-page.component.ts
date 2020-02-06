import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ItalianPublicProcurementLotTypeDTO, ItalianPublicProcurementLotTypeResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigIppLotTypeNewUpdateModalComponent } from '../ipp-lot-type-new-update-modal/ipp-lot-type-new-update-modal.component';

@Component({
    templateUrl: './ipp-lot-type-detail-page.component.html',
    styleUrls: ['./ipp-lot-type-detail-page.component.scss']
})
export class AigIppLotTypeDetailPageComponent extends GenericComponent {
    constructor(
        private ippLotTypeResourceService: ItalianPublicProcurementLotTypeResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippLotTypeDTO: ItalianPublicProcurementLotTypeDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippLotTypeDTO = this.route.snapshot.data.lotType;
        } else {
            this.ippLotTypeDTO = await this.ippLotTypeResourceService.getItalianPublicProcurementLotTypeUsingGET(this.ippLotTypeDTO.id).toPromise();
        }
    }

    editIppLotType(ippLotTypeDTO: ItalianPublicProcurementLotTypeDTO) {
        this.dialog.open(AigIppLotTypeNewUpdateModalComponent, { data: { lotType: ippLotTypeDTO } });
    }

}

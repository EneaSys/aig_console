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

    ippLotType: ItalianPublicProcurementLotTypeDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippLotType = this.route.snapshot.data.ippLotType;
        } else {
            this.ippLotType = await this.ippLotTypeResourceService.getItalianPublicProcurementLotTypeUsingGET(this.ippLotType.id).toPromise();
        }
    }

    editIppLotType(ippLotType: ItalianPublicProcurementLotTypeDTO) {
        this.dialog.open(AigIppLotTypeNewUpdateModalComponent, { data: { ippLotType: ippLotType } });
    }

}

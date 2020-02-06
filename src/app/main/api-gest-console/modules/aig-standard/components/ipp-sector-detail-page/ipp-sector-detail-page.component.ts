import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ItalianPublicProcurementSectorResourceService, ItalianPublicProcurementSectorDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigIppSectorNewUpdateModalComponent } from '../ipp-sector-new-update-modal/ipp-sector-new-update-modal.component';

@Component({
    templateUrl: './ipp-sector-detail-page.component.html',
    styleUrls: ['./ipp-sector-detail-page.component.scss']
})
export class AigIppSectorDetailPageComponent extends GenericComponent {
    constructor(
        private ippSectorResourceService: ItalianPublicProcurementSectorResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippSector: ItalianPublicProcurementSectorDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippSector = this.route.snapshot.data.ippSector;
        } else {
            this.ippSector = await this.ippSectorResourceService.getItalianPublicProcurementSectorUsingGET(this.ippSector.id).toPromise();
        }
    }

    editIppSector(ippSector: ItalianPublicProcurementSectorDTO) {
        this.dialog.open(AigIppSectorNewUpdateModalComponent, { data: { ippSector: ippSector } });
    }

}

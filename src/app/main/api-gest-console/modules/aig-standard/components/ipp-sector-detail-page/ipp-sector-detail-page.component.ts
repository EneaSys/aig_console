import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ItalianPublicProcurementSectorResourceService, ItalianPublicProcurementSectorDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigIppSectorDialogComponent } from '../ipp-sector-dialog-page/ipp-sector-dialog-page.component';

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

    ippSectorDTO: ItalianPublicProcurementSectorDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.ippSectorDTO = this.route.snapshot.data.ippSector;
        } else {
            this.ippSectorDTO = await this.ippSectorResourceService.getItalianPublicProcurementSectorUsingGET(this.ippSectorDTO.id).toPromise();
        }
    }

    editIppSector(ippSectorDTO: ItalianPublicProcurementSectorDTO) {
        this.dialog.open(AigIppSectorDialogComponent, { data: { ippSector: ippSectorDTO } });
    }

}

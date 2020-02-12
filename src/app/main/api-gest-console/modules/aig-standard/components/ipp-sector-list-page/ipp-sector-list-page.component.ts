import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementSectorResourceService, ItalianPublicProcurementSectorDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppSectorNewUpdateModalComponent } from '../ipp-sector-new-update-modal/ipp-sector-new-update-modal.component';

@Component({
    templateUrl: './ipp-sector-list-page.component.html',
    styleUrls: ['./ipp-sector-list-page.component.scss']
})
export class AigIppSectorListPageComponent extends GenericComponent {
    constructor(
        private ippSectorResourceService: ItalianPublicProcurementSectorResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
    displayedColumns: string[] = ['id', 'code', 'name', 'wikiCode', 'buttons'];
    ippSectorDTOs: ItalianPublicProcurementSectorDTO[];

    async loadComponent() {
        this.ippSectorDTOs = await this.ippSectorResourceService.getAllItalianPublicProcurementSectorsUsingGET().toPromise();
    }

    newIppSector(){
        this.dialog.open(AigIppSectorNewUpdateModalComponent, {data: { ippSector: {} } });
    }
}
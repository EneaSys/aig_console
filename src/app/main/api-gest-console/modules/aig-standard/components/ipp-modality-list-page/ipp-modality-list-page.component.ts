import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppModalityDetailPageComponent } from 'aig-common/modules/standard/components/ipp-modality/ipp-modality-detail-page/ipp-modality-detail-page.component';
import { AigIppModalityDialogComponent } from 'aig-common/modules/standard/components/ipp-modality/ipp-modality-dialog-page/ipp-modality-dialog-page.component';

@Component({
    templateUrl: './ipp-modality-list-page.component.html',
    styleUrls: ['./ipp-modality-list-page.component.scss']
})
export class AigIppModalityListPageComponent extends GenericComponent {
    constructor(
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
        private dialog : MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'code', 'name', 'buttons'];
    ippModalityDTOs: ItalianPublicProcurementModalityDTO[];

    async loadComponent() {
        this.ippModalityDTOs = await this.ippModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET().toPromise();
    }

    newIppModality(){
        this.dialog.open(AigIppModalityDialogComponent);
    }
}
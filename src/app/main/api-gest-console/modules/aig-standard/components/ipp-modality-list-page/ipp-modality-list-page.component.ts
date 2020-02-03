import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppModalityDialogComponent } from '../ipp-modality-dialog-page/ipp-modality-dialog-page.component';

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

    displayedColumns: string[] = ['id', 'code', 'name', 'wikiCode', 'buttons'];
    ippModalityDTOs: ItalianPublicProcurementModalityDTO[];

    async loadComponent() {
        this.ippModalityDTOs = await this.ippModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET().toPromise();
    }

    newIppModality(){
        this.dialog.open(AigIppModalityDialogComponent);
    }
}
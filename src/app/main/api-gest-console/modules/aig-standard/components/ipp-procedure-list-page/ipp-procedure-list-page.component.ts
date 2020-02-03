import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementProcedureDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppProcedureDialogComponent } from '../ipp-procedure-dialog-page/ipp-procedure-dialog-page.component';

@Component({
    templateUrl: './ipp-procedure-list-page.component.html',
    styleUrls: ['./ipp-procedure-list-page.component.scss']
})
export class AigIppProcedureListPageComponent extends GenericComponent {
    constructor(
        private ippProcedureResourceService: ItalianPublicProcurementProcedureResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'code', 'name', 'wikiCode', 'buttons'];
    ippProcedureDTOs: ItalianPublicProcurementProcedureDTO[];

    async loadComponent() {
        this.ippProcedureDTOs = await this.ippProcedureResourceService.getAllItalianPublicProcurementProceduresUsingGET().toPromise();
    }

    newIppProcedure(){
        this.dialog.open(AigIppProcedureDialogComponent);
    }
}
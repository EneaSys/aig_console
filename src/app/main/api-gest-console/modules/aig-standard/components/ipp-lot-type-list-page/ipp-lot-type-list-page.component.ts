import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementLotTypeDTO, ItalianPublicProcurementLotTypeResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppLotTypeDialogComponent } from '../ipp-lot-type-dialog-page/ipp-lot-type-dialog-page.component';

@Component({
    templateUrl: './ipp-lot-type-list-page.component.html',
    styleUrls: ['./ipp-lot-type-list-page.component.scss']
})
export class AigIppLotTypeListPageComponent extends GenericComponent {
    constructor(
        private ippLotTypeResourceService: ItalianPublicProcurementLotTypeResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
    
    displayedColumns: string[] = ['id', 'code', 'name', 'wikiCode' ,'buttons'];
    ippLotTypeDTOs: ItalianPublicProcurementLotTypeDTO[];

    async loadComponent() {
       this.ippLotTypeDTOs = await this.ippLotTypeResourceService.getAllItalianPublicProcurementLotTypesUsingGET().toPromise();
    }

    newIppLotType(){
        this.dialog.open(AigIppLotTypeDialogComponent);
    }
}
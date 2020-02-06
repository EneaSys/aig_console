import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigLotCategoryNewUpdateModalComponent } from '../ipp-lot-category-new-update-modal/lot-category-new-update-modal.component';

@Component({
    templateUrl: './ipp-lot-category-list-page.component.html',
    styleUrls: ['./ipp-lot-category-list-page.component.scss']
})
export class AigIppLotCategoryListPageComponent extends GenericComponent {
    constructor(
        private ippLotCategoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }
    
    displayedColumns: string[] = ['id', 'code', 'name', 'wikiCode' ,'buttons'];
    ippLotCategoryDTOs: ItalianPublicProcurementLotCategoryDTO[];

    async loadComponent() {
        this.ippLotCategoryDTOs = await this.ippLotCategoryResourceService.getAllItalianPublicProcurementLotCategoriesUsingGET().toPromise();
    }

    newIppLotCategory(){
        this.dialog.open(AigLotCategoryNewUpdateModalComponent, {data: { ippLotCategory: {} } });
    }
}

import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';

@Component({
    templateUrl: './ipp-lot-category-list-page.component.html',
    styleUrls: ['./ipp-lot-category-list-page.component.scss']
})
export class AigIppLotCategoryListPageComponent extends GenericComponent {
    constructor(
        private ippLotCategoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    ippLotCategoryDTOs: ItalianPublicProcurementLotCategoryDTO[];

    async loadComponent() {
        this.ippLotCategoryDTOs = await this.ippLotCategoryResourceService.getAllItalianPublicProcurementLotCategoriesUsingGET().toPromise();
    }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigLotCategoryDialogComponent } from '../ipp-lot-category-dialog-page/lot-category-dialog-page.component';

@Component({
    templateUrl: './lot-category-detail-page.component.html',
    styleUrls: ['./lot-category-detail-page.component.scss']
})
export class AigLotCategoryDetailPageComponent extends GenericComponent {
    constructor(
        private ippLotCategoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    ippLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO;
    
    async loadComponent() {
        this.ippLotCategoryDTO = this.route.snapshot.data.category;
        if(this.firstLoad) {
            this.ippLotCategoryDTO = this.route.snapshot.data.cpv;
        } else {
            this.ippLotCategoryDTO = await this.ippLotCategoryResourceService.getItalianPublicProcurementLotCategoryUsingGET(this.ippLotCategoryDTO.id).toPromise();
        }
    }

    editIppLotCategory(ippLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO) {
        this.dialog.open(AigLotCategoryDialogComponent, { data: { ippLotCategory: ippLotCategoryDTO } });
    }

}

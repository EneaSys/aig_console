import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementLotCategoryDTO } from 'aig-standard';

@Component({
    templateUrl: './lot-category-detail-page.component.html',
    styleUrls: ['./lot-category-detail-page.component.scss']
})
export class AigLotCategoryDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    categoryDTO: ItalianPublicProcurementLotCategoryDTO;
    
    loadComponent(): void {
        this.categoryDTO = this.route.snapshot.data.category;
    }

}

import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './ipp-lot-category-list-page.component.html',
    styleUrls: ['./ipp-lot-category-list-page.component.scss']
})
export class AigIppLotCategoryListPageComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadComponent() {
        
    }
}

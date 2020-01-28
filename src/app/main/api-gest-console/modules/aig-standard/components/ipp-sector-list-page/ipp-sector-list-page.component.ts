import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './ipp-sector-list-page.component.html',
    styleUrls: ['./ipp-sector-list-page.component.scss']
})
export class AigIppSectorListPageComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadComponent() {
        
    }
}
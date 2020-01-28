import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './ipp-modality-list-page.component.html',
    styleUrls: ['./ipp-modality-list-page.component.scss']
})
export class AigIppModalityListPageComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadComponent() {
        
    }
}
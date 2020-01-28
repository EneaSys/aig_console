import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './social-action-list-page.component.html',
    styleUrls: ['./social-action-list-page.component.scss']
})
export class AigSocialActionListPageComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadComponent() {
        
    }
}
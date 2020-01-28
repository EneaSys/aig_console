import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';

@Component({
    templateUrl: './social-action-list-page.component.html',
    styleUrls: ['./social-action-list-page.component.scss']
})
export class AigSocialActionListPageComponent extends GenericComponent {
    constructor(
        private socialActionResourceService: SocialActionResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    socialActionDTOs: SocialActionDTO[];

    async loadComponent() {
        this.socialActionDTOs = await this.socialActionResourceService.getAllSocialActionsUsingGET().toPromise();
    }
}
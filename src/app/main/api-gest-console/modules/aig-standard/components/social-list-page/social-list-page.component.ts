import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialResourceService, SocialActionDTO } from 'aig-standard';

@Component({
    templateUrl: './social-list-page.component.html',
    styleUrls: ['./social-list-page.component.scss']
})
export class AigSocialListPageComponent extends GenericComponent {
    constructor(
        private socialResourceService: SocialResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    socialActionDTOs: SocialActionDTO[];

    async loadComponent() {
        this.socialActionDTOs = await this.socialResourceService.getAllSocialsUsingGET().toPromise();
    }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSocialActionNewUpdateModalComponent } from '../social-action-new-update-modal/social-action-new-update-modal.component';

@Component({
    templateUrl: './social-action-detail.component.html',
    styleUrls: ['./social-action-detail.component.scss']
})
export class AigSocialActionDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private socialActionResourceService: SocialActionResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    socialAction: SocialActionDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.socialAction = this.route.snapshot.data.socialAction;
        } else {
            this.socialAction = await this.socialActionResourceService.getSocialActionUsingGET(this.socialAction.id).toPromise();
        }
    }

    editSocialAction(socialAction: SocialActionDTO) {
        this.dialog.open(AigSocialActionNewUpdateModalComponent, { data: { socialAction: socialAction } });
    }

}

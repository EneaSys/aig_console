import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSocialActionDialogComponent } from '../social-action-dialog/social-action-dialog.component';

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

    socialActionDTO: SocialActionDTO;
    
    async loadComponent() {
        if(this.firstLoad) {
            this.socialActionDTO = this.route.snapshot.data.socialAction;
        } else {
            this.socialActionDTO = await this.socialActionResourceService.getSocialActionUsingGET(this.socialActionDTO.id).toPromise();
        }
    }

    editSocialAction(socialActionDTO: SocialActionDTO) {
        this.dialog.open(AigSocialActionDialogComponent, { data: { socialAction: socialActionDTO } });
    }

}

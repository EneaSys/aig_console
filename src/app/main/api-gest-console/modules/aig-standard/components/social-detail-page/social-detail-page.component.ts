import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SocialResourceService, SocialDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSocialDialogComponent } from '../social-dialog/social-dialog.component';

@Component({
    templateUrl: './social-detail-page.component.html',
    styleUrls: ['./social-detail-page.component.scss']
})
export class AigSocialDetailPageComponent extends GenericComponent {
    constructor(
        private socialResourceService: SocialResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }

    socialDTO: SocialDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.socialDTO = this.route.snapshot.data.social;
        } else {
            this.socialDTO = await this.socialResourceService.getSocialUsingGET(this.socialDTO.id).toPromise();
        }
    }

    editSocial(socialDTO: SocialDTO) {
        this.dialog.open(AigSocialDialogComponent, { data: { social: socialDTO } });
    }
}

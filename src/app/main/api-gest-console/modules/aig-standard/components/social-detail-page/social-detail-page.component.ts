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

    social: SocialDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.social = this.route.snapshot.data.social;
        } else {
            this.social = await this.socialResourceService.getSocialUsingGET(this.social.id).toPromise();
        }
    }

    editSocial(social: SocialDTO) {
        this.dialog.open(AigSocialDialogComponent, { data: { social: social } });
    }
}

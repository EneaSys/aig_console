import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SocialResourceService, SocialDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSocialNewUpdateModalComponent } from '../social-new-update-modal/social-new-update-modal.component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    templateUrl: './social-detail-page.component.html',
    styleUrls: ['./social-detail-page.component.scss']
})
export class AigSocialDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
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

    async deleteSocial(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.socialResourceService.deleteSocialUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Social: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/s6d', 'social']);
        } catch (e) {
            this._snackBar.open(`Error during deleting social: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
    

    editSocial(social: SocialDTO) {
        this.dialog.open(AigSocialNewUpdateModalComponent, { data: { social: social } });
    }
}

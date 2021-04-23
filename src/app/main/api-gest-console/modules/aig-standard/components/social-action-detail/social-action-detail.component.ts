import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSocialActionNewUpdateModalComponent } from '../social-action-new-update-modal/social-action-new-update-modal.component';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './social-action-detail.component.html',
    styleUrls: ['./social-action-detail.component.scss']
})
export class AigSocialActionDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private socialActionResourceService: SocialActionResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    socialAction: SocialActionDTO;

    async loadComponent() {
        if (this.firstLoad) {
            this.socialAction = this.route.snapshot.data.socialAction;
            console.log(this.socialAction);
        } else {
            this.socialAction = await this.socialActionResourceService.getSocialActionUsingGET(this.socialAction.id).toPromise();
        }
    }
    async deleteSocialAction(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.socialActionResourceService.deleteSocialActionUsingDELETE(id).toPromise();

            this._snackBar.open(`Social Action: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/s6d', 'social-action']);
        } catch (e) {
            this._snackBar.open(`Error during deleting social action: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }


    editSocialAction(socialAction: SocialActionDTO) {
        this.dialog.open(AigSocialActionNewUpdateModalComponent, { data: { socialAction: socialAction } });
    }

}

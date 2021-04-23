import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { SocialActionDTO, SocialActionResourceService } from 'aig-standard';
import { AigSocialActionNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/social-action-new-update-modal/social-action-new-update-modal.component';

@Component({
    selector: 'aig-social-actiopn-list-table',
    templateUrl: './social-action-list-table.component.html',
    styleUrls: ['./social-action-list-table.component.scss']
})
export class AigSocialActionListTableComponent implements OnInit {

    constructor(
        private router: Router,
        private socialActionResourceService: SocialActionResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteSocialAction(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.socialActionResourceService.deleteSocialActionUsingDELETE(id).toPromise();
            this._snackBar.open(`Social Action: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting social action: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editSocialAction(socialActionDTO: SocialActionDTO) {
        this.dialog.open(AigSocialActionNewUpdateModalComponent, { data: { socialAction: socialActionDTO } });
    }
}

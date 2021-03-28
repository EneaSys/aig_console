import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { SocialDTO, SocialResourceService } from 'aig-standard';
import { AigSocialNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/social-new-update-modal/social-new-update-modal.component';

@Component({
    selector: 'aig-social-list-table',
    templateUrl: './social-list-table.component.html',
    styleUrls: ['./social-list-table.component.scss']
})
export class AigSocialListTableComponent implements OnInit {
    constructor(
        private socialResourceService: SocialResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteSocial(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.socialResourceService.deleteSocialUsingDELETE(id).toPromise();
            this._snackBar.open(`City: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting city: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editSocial(socialDTO: SocialDTO) {
        this.dialog.open(AigSocialNewUpdateModalComponent, { data: { social: socialDTO } });
    }

}

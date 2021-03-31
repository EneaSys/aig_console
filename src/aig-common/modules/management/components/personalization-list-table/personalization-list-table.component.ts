import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PersonalizationDTO, PersonalizationResourceService } from 'aig-management';
import { AigPersonalizationNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/personalization-new-update-modal/personalization-new-update-modal.component';


@Component({
    selector: 'aig-personalization-list-table',
    templateUrl: './personalization-list-table.component.html',
    styleUrls: ['./personalization-list-table.component.scss'],
})
export class AigPersonalizationListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private personalizationResourceService: PersonalizationResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ){ }

    ngOnInit(): void {}

    async deletePersonalization(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.personalizationResourceService.deletePersonalizationUsingDELETE(id).toPromise();
            this._snackBar.open(`Personalization: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Personalization: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPersonalization(personalizationDTO: PersonalizationDTO) {
        this.dialog.open(AigPersonalizationNewUpdateModalComponent, { data: { personalization: personalizationDTO } });
    }

}
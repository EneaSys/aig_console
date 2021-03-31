import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextUserDTO, ContextUserResourceService } from 'aig-management';
import { AigContextUserNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/context-user-new-update-modal/context-user-new-update-modal.component';


@Component({
    selector: 'aig-context-user-list-table',
    templateUrl: './context-user-list-table.component.html',
    styleUrls: ['./context-user-list-table.component.scss'],
})
export class AigContextUserListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private contextUserResourceService: ContextUserResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ){ }

    ngOnInit(): void {}

    async deleteContextUser(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.contextUserResourceService.deleteContextUserUsingDELETE(id).toPromise();
            this._snackBar.open(`Context User: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting context User: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editContextUser(contextUserDTO: ContextUserDTO) {
        this.dialog.open(AigContextUserNewUpdateModalComponent, { data: { contextUser: contextUserDTO } });
    }

}
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextUserDTO, ContextUserResourceService, ObjectReferenceDTO, ObjectReferenceResourceService } from 'aig-management';
import { AigContextUserNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/context-user-new-update-modal/context-user-new-update-modal.component';
import { AigObjectReferenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/object-reference-new-update-dialog/object-reference-new-update-dialog.component';


@Component({
    selector: 'aig-object-reference-list-table',
    templateUrl: './object-reference-list-table.component.html',
    styleUrls: ['./object-reference-list-table.component.scss'],
})
export class AigObjectReferenceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private objectReferenceResourceService: ObjectReferenceResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ){ }

    ngOnInit(): void {}

    async deleteObjectReference(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.objectReferenceResourceService.deleteObjectReferenceUsingDELETE(id).toPromise();
            this._snackBar.open(`Context User: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting object Reference: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editObjectReference(objectReferenceDTO: ObjectReferenceDTO) {
        this.dialog.open(AigObjectReferenceNewUpdateDialogComponent, { data: { objectReference: objectReferenceDTO } });
    }

}
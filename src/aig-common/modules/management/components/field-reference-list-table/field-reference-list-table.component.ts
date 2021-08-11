import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextUserDTO, ContextUserResourceService, FieldReferenceDTO, FieldReferenceResourceService, ObjectReferenceDTO, ObjectReferenceResourceService } from 'aig-management';
import { AigContextUserNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/context-user-new-update-modal/context-user-new-update-modal.component';
import { AigFieldReferenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/field-reference-new-update-dialog/field-reference-new-update-dialog.component';
import { AigObjectReferenceNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/management/components/object-reference-new-update-dialog/object-reference-new-update-dialog.component';


@Component({
    selector: 'aig-field-reference-list-table',
    templateUrl: './field-reference-list-table.component.html',
    styleUrls: ['./field-reference-list-table.component.scss'],
})
export class AigFieldReferenceListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private fieldReferenceResourceService: FieldReferenceResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ){ }

    ngOnInit(): void {}

    async deleteFieldReference(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.fieldReferenceResourceService.deleteFieldReferenceUsingDELETE(id).toPromise();
            this._snackBar.open(`field  reference: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting field Reference: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editFieldReference(fieldReferenceDTO: FieldReferenceDTO) {
        this.dialog.open(AigFieldReferenceNewUpdateDialogComponent, { data: { fieldReference: fieldReferenceDTO } });
    }

}
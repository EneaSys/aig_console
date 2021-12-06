import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { EopooTypeDTO, EopooTypeResourceService, FormTypeDTO, FormTypeResourceService } from 'aig-generic';
import { AigEopooTypeNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-generic/components/eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { AigFormTypeNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-generic/components/form-type-new-update-dialog/form-type-new-update-dialog.component';

@Component({
    selector: 'aig-form-type-list-table',
    templateUrl: './form-type-list-table.component.html',
    styleUrls: ['./form-type-list-table.component.scss']
})
export class AigFormTypeListTableComponent implements OnInit {
    constructor(
        private formTypeResourceService: FormTypeResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: FormTypeDTO[];

    ngOnInit(): void { }

    async deleteFormType(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.formTypeResourceService.deleteFormTypeUsingDELETE(id).toPromise();
            this._snackBar.open(`form type: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting form type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editFormType(formTypeDTO: FormTypeDTO) {
        this.dialog.open(AigFormTypeNewUpdateDialogComponent, { data: { formType: formTypeDTO } });
    }
}
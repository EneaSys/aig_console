import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigSolidarityRequestCalculatorService } from 'aig-common/modules/solidarity/services/solidarityRequestCalulator.service';
import { EopooTypeDTO, EopooTypeResourceService, FormDataDTO, FormDataResourceService, FormTypeDTO, FormTypeResourceService } from 'aig-generic';
import { AigEopooTypeNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-generic/components/eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';
import { AigFormDataNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-generic/components/form-data-new-update-dialog/form-data-new-update-dialog.component';
import { AigFormTypeNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-generic/components/form-type-new-update-dialog/form-type-new-update-dialog.component';

@Component({
    selector: 'aig-form-data-list-table',
    templateUrl: './form-data-list-table.component.html',
    styleUrls: ['./form-data-list-table.component.scss']
})
export class AigFormDataListTableComponent implements OnInit {
    constructor(
        private formDataResourceService: FormDataResourceService,
        private eventService: EventService,
		public calculatorService: AigSolidarityRequestCalculatorService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: FormDataDTO[];

    ngOnInit(): void { }

    async deleteFormData(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.formDataResourceService.deleteFormDataUsingDELETE(id).toPromise();
            this._snackBar.open(`form type: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting form Data: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editFormData(formDataDTO: FormDataDTO) {
        this.dialog.open(AigFormDataNewUpdateDialogComponent, { data: { formData: formDataDTO } });
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { EopooTypeDTO, EopooTypeResourceService } from 'aig-generic';
import { AigEopooTypeNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-generic/components/eopoo-type-new-update-modal/eopoo-type-new-update-modal.component';

@Component({
    selector: 'aig-eopoo-type-list-table',
    templateUrl: './eopoo-type-list-table.component.html',
    styleUrls: ['./eopoo-type-list-table.component.scss']
})
export class AigEopooTypeListTableComponent implements OnInit {
    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
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
    dataSource: EopooTypeDTO[];

    ngOnInit(): void { }

    async deleteEopooType(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.eopooTypeResourceService.deleteEopooTypeUsingDELETE(id).toPromise();
            this._snackBar.open(`Eopoo type: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting eopoo type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editEopooType(eopooTypeDTO: EopooTypeDTO) {
        this.dialog.open(AigEopooTypeNewUpdateModalComponent, { data: { eopooType: eopooTypeDTO } });
    }
}
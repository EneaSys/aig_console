import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotAwardCriterionResourceService } from 'aig-standard';
import { AigAwardCriterionNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/award-criterion-new-update-dialog/award-criterion-new-update-dialog.component';

@Component({
    selector: 'aig-award-criterion-list-table',
    templateUrl: './award-criterion-list-table.component.html',
    styleUrls: ['./award-criterion-list-table.component.scss']
})
export class AigAwardCriterionListTableComponent implements OnInit {
    constructor(
        private awardCriterionResourceService: IlPpProcurementLotAwardCriterionResourceService,
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
    dataSource: any[];

    ngOnInit(): void { }

    async deleteAwardCriterion(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.awardCriterionResourceService.deleteIlPpProcurementLotAwardCriterionUsingDELETE(id).toPromise();
            this._snackBar.open(`Award Criterion: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Award Criterion: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editAwardCriterion(awardCriterionDTO: IlPpProcurementLotAwardCriterionDTO) {
        this.dialog.open(AigAwardCriterionNewUpdateDialogComponent, { data: { awardCriterion: awardCriterionDTO } });
    }
}

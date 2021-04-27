import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PartecipationTypeDTO, PartecipationTypeResourceService} from 'aig-standard';
import { AigPartecipationTypeNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/partecipation-type-new-update-dialog/partecipation-type-new-update-dialog.component';

@Component({
    selector: 'aig-partecipation-type-list-table',
    templateUrl: './partecipation-type-list-table.component.html',
    styleUrls: ['./partecipation-type-list-table.component.scss']
})
export class AigPartecipationTypeListTableComponent implements OnInit {
    constructor(
        private partecipationTypeResourceService: PartecipationTypeResourceService,
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

    async deletePartecipationType(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.partecipationTypeResourceService.deletePartecipationTypeUsingDELETE(id).toPromise();
            this._snackBar.open(`Partecipation Type: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Partecipation Type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editPartecipationType(partecipationTypeDTO: PartecipationTypeDTO) {
        this.dialog.open(AigPartecipationTypeNewUpdateDialogComponent, { data: { partecipationType: partecipationTypeDTO } });
    }
}

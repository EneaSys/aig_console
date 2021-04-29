import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AllegatiDTO, AllegatiResourceService } from 'aig-italianlegislation';
import { AigAllegatiNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/i16n/components/allegati-new-update-dialog/allegati-new-update-dialog.component';


@Component({
    selector: 'aig-allegati-list-table',
    templateUrl: './allegati-list-table.component.html',
    styleUrls: ['./allegati-list-table.component.scss']
})
export class AigAllegatiListTableComponent implements OnInit {
    constructor(
        private allegatiResourceService: AllegatiResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteAllegati(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.allegatiResourceService.deleteAllegatiUsingDELETE(id).toPromise();
            this._snackBar.open(`Allegati : '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting allegati: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editAllegati(allegatiDTO: AllegatiDTO) {
        this.dialog.open(AigAllegatiNewUpdateDialogComponent, { data: { allegati: allegatiDTO } });
    }
}

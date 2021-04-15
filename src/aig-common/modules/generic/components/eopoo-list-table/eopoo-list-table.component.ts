import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { EopooDTO, EopooResourceService } from 'aig-generic';
import { AigEopooNewModalComponent } from 'app/main/api-gest-console/modules/aig-generic/components/eopoo-new-modal/eopoo-new-modal.component';

@Component({
    selector: 'aig-eopoo-list-table',
    templateUrl: './eopoo-list-table.component.html',
    styleUrls: ['./eopoo-list-table.component.scss']
})
export class AigEopooListTableComponent implements OnInit {
    constructor(
        private eopooResourceService: EopooResourceService,
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
    dataSource: EopooDTO[];

    ngOnInit(): void { }

    async deleteEopoo(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.eopooResourceService.deleteEopooUsingDELETE(id).toPromise();
            this._snackBar.open(`Eopoo: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting eopoo: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editEopoo(eopooDTO: EopooDTO) {
        this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: eopooDTO } });
    }
}

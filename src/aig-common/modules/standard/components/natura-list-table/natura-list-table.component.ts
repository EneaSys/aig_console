import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import {IlFeNaturaDTO, IlFeNaturaResourceService } from 'aig-standard';
import { AigNaturaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/natura-new-update-dialog/natura-new-update-dialog.component';

@Component({
    selector: 'aig-natura-list-table',
    templateUrl: './natura-list-table.component.html',
    styleUrls: ['./natura-list-table.component.scss']
})
export class AigNaturaListTableComponent implements OnInit {
    constructor(
        private naturaResourceService: IlFeNaturaResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteNatura(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.naturaResourceService.deleteIlFeNaturaUsingDELETE(id).toPromise();
            this._snackBar.open(`Natura: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting natura: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editNatura(naturaDTO: IlFeNaturaDTO) {
        this.dialog.open(AigNaturaNewUpdateDialogComponent, { data: { natura: naturaDTO } });
    }
}

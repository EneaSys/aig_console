import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpProcurementSectorDTO, IlPpProcurementSectorResourceService } from 'aig-standard';
import { AigIppSectorNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/ipp-sector-new-update-modal/ipp-sector-new-update-modal.component';

@Component({
    selector: 'aig-ipp-sector-list-table',
    templateUrl: './ipp-sector-list-table.component.html',
    styleUrls: ['./ipp-sector-list-table.component.scss']
})
export class AigIppSectorListTableComponent implements OnInit {
    constructor(
        private ippSectorResourceService: IlPpProcurementSectorResourceService,
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

    async deleteIppSector(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.ippSectorResourceService.deleteIlPpProcurementSectorUsingDELETE(id).toPromise();
            this._snackBar.open(`Ipp Sector: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting ipp sector: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editIppSector(ippSectorDTO: IlPpProcurementSectorDTO) {
        this.dialog.open(AigIppSectorNewUpdateModalComponent, { data: { ippSector: ippSectorDTO } });
    }
}

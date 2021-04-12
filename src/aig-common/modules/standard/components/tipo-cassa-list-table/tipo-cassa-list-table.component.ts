import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CityDTO } from 'aig-generic';
import { CityResourceService, TipoCassaDTO, TipoCassaResourceService } from 'aig-standard';
import { AigCityNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/city-new-update-modal/city-new-update-modal.component';
import { AigTipoCassaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';

@Component({
    selector: 'aig-tipo-cassa-list-table',
    templateUrl: './tipo-cassa-list-table.component.html',
    styleUrls: ['./tipo-cassa-list-table.component.scss']
})
export class AigTipoCassaListTableComponent implements OnInit {
    constructor(
        private tipoCassaResourceService: TipoCassaResourceService,
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

    async deleteTipoCassa(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.tipoCassaResourceService.deleteTipoCassaUsingDELETE(id).toPromise();
            this._snackBar.open(`Tipo Cassa: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo cassa: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTipoCassa(tipoCassaDTO: TipoCassaDTO) {
        this.dialog.open(AigTipoCassaNewUpdateDialogComponent, { data: { tipoCassa: tipoCassaDTO } });
    }
}
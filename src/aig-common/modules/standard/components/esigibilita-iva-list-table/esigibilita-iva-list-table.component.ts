import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlFeEsigibilitaIvaDTO, IlFeEsigibilitaIvaResourceService } from 'aig-standard';
import { AigEsigibilitaIvaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/esigibilita-iva-new-update-dialog/esigibilita-iva-new-update-dialog.component';


@Component({
    selector: 'aig-esigibilita-iva-list-table',
    templateUrl: './esigibilita-iva-list-table.component.html',
    styleUrls: ['./esigibilita-iva-list-table.component.scss']
})
export class AigEsigibilitaIvaListTableComponent implements OnInit {
    constructor(
        private esigibilitaIvaResourceService: IlFeEsigibilitaIvaResourceService,
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

    async deleteEsigibilitaIva(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.esigibilitaIvaResourceService.deleteIlFeEsigibilitaIvaUsingDELETE(id).toPromise();
            this._snackBar.open(`Tipo Esigibilita Iva: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Esigibilita Iva: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editEsigibilitaIva(esigibilitaIvaDTO: IlFeEsigibilitaIvaDTO) {
        this.dialog.open(AigEsigibilitaIvaNewUpdateDialogComponent, { data: { esigibilitaIva: esigibilitaIvaDTO } });
    }
}
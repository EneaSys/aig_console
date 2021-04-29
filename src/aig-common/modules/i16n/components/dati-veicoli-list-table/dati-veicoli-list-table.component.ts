import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { DatiVeicoliDTO, DatiVeicoliResourceService } from 'aig-italianlegislation';
import { AigDatiVeicoliNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/i16n/components/dati-veicoli-new-update-dialog/dati-veicoli-new-update-dialog.component';


@Component({
    selector: 'aig-dati-veicoli-list-table',
    templateUrl: './dati-veicoli-list-table.component.html',
    styleUrls: ['./dati-veicoli-list-table.component.scss']
})
export class AigDatiVeicoliListTableComponent implements OnInit {
    constructor(
        private datiVeicoliResourceService: DatiVeicoliResourceService,
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

    async deleteDatiVeicoli(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.datiVeicoliResourceService.deleteDatiVeicoliUsingDELETE(id).toPromise();
            this._snackBar.open(`Dati Veicoli: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting dati veicoli: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editDatiVeicoli(datiVeicoliDTO: DatiVeicoliDTO) {
        this.dialog.open(AigDatiVeicoliNewUpdateDialogComponent, { data: { datiVeicoli: datiVeicoliDTO } });
    }
}

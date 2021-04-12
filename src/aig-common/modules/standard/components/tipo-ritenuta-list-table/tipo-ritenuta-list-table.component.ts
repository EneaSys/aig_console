import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { CityDTO } from 'aig-generic';
import { CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoRitenutaDTO, TipoRitenutaResourceService } from 'aig-standard';
import { AigCityNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/city-new-update-modal/city-new-update-modal.component';
import { AigTipoCassaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoRitenutaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/tipo-ritenuta-new-update-dialog/tipo-ritenuta-new-update-dialog.component';

@Component({
    selector: 'aig-tipo-ritenuta-list-table',
    templateUrl: './tipo-ritenuta-list-table.component.html',
    styleUrls: ['./tipo-ritenuta-list-table.component.scss']
})
export class AigTipoRitenutaListTableComponent implements OnInit {
    constructor(
        private tipoRitenutaResourceService: TipoRitenutaResourceService,
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

    async deleteTipoRitenuta(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.tipoRitenutaResourceService.deleteTipoRitenutaUsingDELETE(id).toPromise();
            this._snackBar.open(`Tipo Ritenuta: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting tipo Ritenuta: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editTipoRitenuta(tipoRitenutaDTO: TipoRitenutaDTO) {
        this.dialog.open(AigTipoRitenutaNewUpdateDialogComponent, { data: { tipoRitenuta: tipoRitenutaDTO } });
    }
}
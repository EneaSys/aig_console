import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { FatturaElettronicaBodyDTO, FatturaElettronicaBodyResourceService } from 'aig-italianlegislation';
import { AigFatturaElettronicaNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/i16n/components/fattura-elettronica-new-update-dialog/fattura-elettronica-new-update-dialog.component';

@Component({
    selector: 'aig-fattura-elettronica-body-list-table',
    templateUrl: './fattura-elettronica-body-list-table.component.html',
    styleUrls: ['./fattura-elettronica-body-list-table.component.scss']
})
export class AigFatturaElettronicaBodyListTableComponent implements OnInit {
    constructor(
        private fatturaElettronicaBodyResourceService: FatturaElettronicaBodyResourceService,
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

    async deleteFatturaPagamento(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.fatturaElettronicaBodyResourceService.deleteFatturaElettronicaBodyUsingDELETE(id).toPromise();
            this._snackBar.open(`Fattura Elettronica: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting fattura elettronica: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editFatturaPagamento(fatturaElettronicaDTO: FatturaElettronicaBodyDTO) {
        this.dialog.open(AigFatturaElettronicaNewUpdateDialogComponent, { data: { fatturaElettronicaBody: fatturaElettronicaDTO } });
    }
}
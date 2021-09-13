import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlFeRegimeFiscaleDTO, IlFeRegimeFiscaleResourceService } from 'aig-standard';
import { AigRegimeFiscaleNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-standard/components/regime-fiscale-new-update-dialog/regime-fiscale-new-update-dialog.component';


@Component({
    selector: 'aig-regime-fiscale-list-table',
    templateUrl: './regime-fiscale-list-table.component.html',
    styleUrls: ['./regime-fiscale-list-table.component.scss']
})
export class AigRegimeFiscaleListTableComponent implements OnInit {
    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private regimeFiscaleResourceService: IlFeRegimeFiscaleResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteRegimeFiscale(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.regimeFiscaleResourceService.deleteIlFeRegimeFiscaleUsingDELETE(id).toPromise();
            this._snackBar.open(`Regime Fiscale: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting regime fiscale: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editRegimeFiscale (regimeFiscaleDTO: IlFeRegimeFiscaleDTO) {
        this.dialog.open(AigRegimeFiscaleNewUpdateDialogComponent, { data: { regimeFiscale: regimeFiscaleDTO } });
    }

}
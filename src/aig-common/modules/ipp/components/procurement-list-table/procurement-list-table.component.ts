import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ProcurementDTO, ProcurementResourceService } from 'aig-italianlegislation';
import { AigProcurementNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/procurement-new-update-dialog/procurement-new-update-dialog.component';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-procurement-list-table',
    templateUrl: './procurement-list-table.component.html',
    styleUrls: ['./procurement-list-table.component.scss']
})
export class AigProcurementListTableComponent extends AigIppCommonGenericComponent implements OnInit {
    constructor(
        private procurementResourceService: ProcurementResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ) { super(_fuseTranslationLoaderService); }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteProcurement(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.procurementResourceService.deleteProcurementUsingDELETE(id).toPromise();
            this._snackBar.open(`Procurement: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting procurement: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editProcurement(procurementDTO: ProcurementDTO) {
        this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: {procurement:procurementDTO } });
    }
}



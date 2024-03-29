import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italianlegislation';
import { AigProcurementLotCategoryNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/procurement-lot-category-new-update-dialog/procurement-lot-category-new-update-dialog.component';
import { AigProcurementLotNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-procurement-lot-list-table',
    templateUrl: './procurement-lot-list-table.component.html',
    styleUrls: ['./procurement-lot-list-table.component.scss']
})
export class AigProcurementLotListTableComponent extends AigIppCommonGenericComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        private procurementLotResourceService: ProcurementLotResourceService,
        _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ) { super(_fuseTranslationLoaderService); }

    @Input()
    error: any = null;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteProcurementLot(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.procurementLotResourceService.deleteProcurementLotUsingDELETE(id).toPromise();
            this._snackBar.open(`Procurement Lot: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting procurement lot: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editProcurementLot(procurementLotDTO: ProcurementLotDTO) {
        this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: {procurementLot:procurementLotDTO } });
    }

	addCategory(procurementLotDTO: ProcurementLotDTO) {
        this.dialog.open(AigProcurementLotCategoryNewUpdateDialogComponent, { data: {procurementLot: procurementLotDTO } });
    }
}

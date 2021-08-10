import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ProcurementLotCategoryDTO, ProcurementLotCategoryResourceService, ProcurementLotDTO, ProcurementLotResourceService } from 'aig-italianlegislation';
import { AigProcurementLotCategoryNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/procurement-lot-category-new-update-dialog/procurement-lot-category-new-update-dialog.component';
import { AigProcurementLotNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-procurement-lot-category-list-table',
    templateUrl: './procurement-lot-category-list-table.component.html',
    styleUrls: ['./procurement-lot-category-list-table.component.scss']
})
export class AigProcurementLotCategoryListTableComponent extends AigIppCommonGenericComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        private procurementLotCategoryResourceService: ProcurementLotCategoryResourceService,
        _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ) { super(_fuseTranslationLoaderService); }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteProcurementLotCategory(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.procurementLotCategoryResourceService.deleteProcurementLotCategoryUsingDELETE(id).toPromise();
            this._snackBar.open(`Procurement Lot Category: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting procurement lot Category: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editProcurementLotCategory(procurementLotCategoryDTO: ProcurementLotCategoryDTO) {
        this.dialog.open(AigProcurementLotCategoryNewUpdateDialogComponent, { data: {procurementLotCategory:procurementLotCategoryDTO } });
    }

}

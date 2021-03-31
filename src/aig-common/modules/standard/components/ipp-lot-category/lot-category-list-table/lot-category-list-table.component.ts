import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';
import { AigLotCategoryNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/ipp-lot-category-new-update-modal/lot-category-new-update-modal.component';
import { AigLotCategoryNewUpdateFormComponent } from '../lot-category-new-update-form/lot-category-new-update-form.component';

@Component({
    selector: 'aig-lot-category-list-table',
    templateUrl: './lot-category-list-table.component.html',
    styleUrls: ['./lot-category-list-table.component.scss']
})
export class AigLotCategoryListTableComponent implements OnInit {
    constructor(
        private ippLotCategoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ippLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO; 

    @Input() 
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }
    
    async deleteIppLotCategory(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.ippLotCategoryResourceService.deleteItalianPublicProcurementLotCategoryUsingDELETE(id).toPromise();
            this._snackBar.open(`Ipp lot category: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Ipp Lot Category: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editIppLotCategory(IppLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO) {
        this.dialog.open(AigLotCategoryNewUpdateModalComponent, { data: { ippLotCategory: this.ippLotCategoryDTO } });
    }
}

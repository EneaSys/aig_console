import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpProcurementLotTypeDTO, IlPpProcurementLotTypeResourceService } from 'aig-standard';
import { AigIppLotTypeNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/ipp-lot-type-new-update-modal/ipp-lot-type-new-update-modal.component';

@Component({
    selector: 'aig-ipp-lot-type-list-table',
    templateUrl: './ipp-lot-type-list-table.component.html',
    styleUrls: ['./ipp-lot-type-list-table.component.scss']
})
export class AigIppLotTypeListTableComponent implements OnInit {
    constructor(
        private ippLotTypeResourceService: IlPpProcurementLotTypeResourceService,
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

    async deleteIppLotType(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.ippLotTypeResourceService.deleteIlPpProcurementLotTypeUsingDELETE(id).toPromise();
            this._snackBar.open(`Ipp Lot Type: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting Ipp Lot Type: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editIppLotType(ippLotTypeDTO: IlPpProcurementLotTypeDTO) {
        this.dialog.open(AigIppLotTypeNewUpdateModalComponent, { data: { ippLotType: ippLotTypeDTO } });
    }
}

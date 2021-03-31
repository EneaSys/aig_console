import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ItalianPublicProcurementModalityDTO, ItalianPublicProcurementModalityResourceService } from 'aig-standard';
import { AigIppModalityNewUpdateModalComponent } from 'app/main/api-gest-console/modules/aig-standard/components/ipp-modality-new-update-modal/ipp-modality-new-update-modal.component';

@Component({
    selector: 'aig-ipp-modality-list-table',
    templateUrl: './ipp-modality-list-table.component.html',
    styleUrls: ['./ipp-modality-list-table.component.scss']
})
export class AigIppModalityListTableComponent implements OnInit {
    constructor(
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
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
    async deleteCity(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.ippModalityResourceService.deleteItalianPublicProcurementModalityUsingDELETE(id).toPromise();
            this._snackBar.open(`Ipp Modality: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting ipp modality: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editIppModality(ippModalityDTO: ItalianPublicProcurementModalityDTO) {
        this.dialog.open(AigIppModalityNewUpdateModalComponent, { data: { ippModality: ippModalityDTO } });
    }
}

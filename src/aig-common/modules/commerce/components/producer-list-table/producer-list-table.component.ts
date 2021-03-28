import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ProducerDTO, ProducerResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigProducerNewUpdateModalComponent } from 'app/main/api-gest-console/modules/commerce/components/producer-new-update-modal-component/producer-new-update-modal.component';

@Component({
    selector: 'aig-producer-list-table',
    templateUrl: './producer-list-table.component.html',
    styleUrls: ['./producer-list-table.component.scss']
})
export class AigProducerListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
	dataSource: any[];
	@Input()
    error: any;
    
    constructor(
        private producerResourceService:ProducerResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    async deleteProducer(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.producerResourceService.deleteProducerUsingDELETE(id).toPromise();
            this._snackBar.open(`Producer: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting producer: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editProducer(producerDTO: ProducerDTO) {
        this.dialog.open(AigProducerNewUpdateModalComponent, { data: {producer: producerDTO } });
    }
}

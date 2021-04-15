import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventService } from 'aig-common/event-manager/event.service';
import { ReferentDTO, ReferentResourceService } from 'aig-generic';

@Component({
    selector: 'aig-referent-list-table',
    templateUrl: './referent-list-table.component.html',
    styleUrls: ['./referent-list-table.component.scss']
})
export class AigReferentListTableComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private referentResourceService: ReferentResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: ReferentDTO[];
    
    ngOnInit(): void { }

    /*editReferent(referentDTO: ReferentDTO) {
        this.dialog.open(AigAddressNewUpdateModalComponent, { data: { address: addressDTO } });
    }*/

    async deleteReferent(referentDTO: ReferentDTO) {
        await this.referentResourceService.deleteReferentUsingDELETE(referentDTO.id).toPromise();
        this.eventService.reloadCurrentPage();
    }
}
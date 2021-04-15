import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContactDTO, ContactResourceService } from 'aig-generic';
import { AigContactNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/aig-generic/components/contact-new-update-dialog/contact-new-update-dialog.component';

@Component({
    selector: 'aig-contact-list-table',
    templateUrl: './contact-list-table.component.html',
    styleUrls: ['./contact-list-table.component.scss']
})
export class AigContactListTableComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private contactResourceService: ContactResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: ContactDTO[];
    
    ngOnInit(): void { }

    editContact(contactDTO: ContactDTO) {
        this.dialog.open(AigContactNewUpdateDialogComponent, { data: { contact: contactDTO } });
    }

    async deleteContact(contactDTO: ContactDTO) {
        await this.contactResourceService.deleteContactUsingDELETE(contactDTO.id).toPromise();
        this.eventService.reloadCurrentPage();
    }
}
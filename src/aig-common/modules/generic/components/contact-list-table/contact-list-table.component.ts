import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
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
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: ContactDTO[];
    
    ngOnInit(): void { }

    async deleteContact(id: number) {
        this._fuseProgressBarService.show();
        try{
            await this.contactResourceService.deleteContactUsingDELETE(id).toPromise();
            this._snackBar.open(`Contact: '${id}' deleted.`, null, { duration: 2000, });
            this.eventService.reloadCurrentPage();

        } catch (e) {
            this._snackBar.open(`Error during deleting contact: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();

    }

    editContact(contactDTO: ContactDTO) {
        this.dialog.open(AigContactNewUpdateDialogComponent, { data: { contact: contactDTO } });
    }

   
}
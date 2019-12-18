import { Component } from '@angular/core';
import { UserResourceService, UserDTO } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigUserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
import { EventService } from 'aig-common/event-manager/event.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class AigUserListComponent extends GenericComponent {
    constructor(
        private userResourceService: UserResourceService,
        private dialog: MatDialog,
        eventService: EventService,
    ) { super(eventService) }

    displayedColumns: string[] = ['usercode', 'firstName', 'lastName', 'email', 'status', 'type', 'buttons'];
    userDataSource: UserDTO[];
    error: any;

    loadComponent(): void {
        var destructor = this.userResourceService.getAllUsersUsingGET(null).subscribe(
            res => this.userDataSource = res,
            err => this.error = err,
        );
        this._destructors.push(destructor);
    }

    newUser() {
        this.dialog.open(AigUserNewDialogComponent);
    }
}


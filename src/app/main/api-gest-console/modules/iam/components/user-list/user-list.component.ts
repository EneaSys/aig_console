import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UserResourceService, UserDTO } from 'api-gest';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { AigUserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
import { Observable } from 'rxjs';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AigUserListComponent implements OnInit, OnDestroy {
    constructor(
        private userResourceService: UserResourceService,
        private dialog: MatDialog,
        private eventService: EventService,
    ) {
        this.eventService.reloadPage$.subscribe(() => this.ngOnInit());
    }

    displayedColumns: string[] = ['usercode', 'firstName', 'lastName', 'email', 'status', 'type', 'buttons'];
    userDataSource: Observable<UserDTO[]>;

    ngOnInit(): void {
        this.userDataSource = this.userResourceService.getAllUsersUsingGET("");
    }

    ngOnDestroy(): void {
        
    }

    newUser() {
        this.dialog.open(AigUserNewDialogComponent);
    }
}

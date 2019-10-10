import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserResourceService, UserDTO } from 'api-gest';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { AigUserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AigUserListComponent implements OnInit {
    constructor(
        private userResourceService: UserResourceService,
        public dialog: MatDialog
    ) { }

    displayedColumns: string[] = ['usercode', 'firstName', 'lastName', 'email', 'status', 'type', 'buttons'];
    dataSource: any[];

    ngOnInit(): void {
        this.loadUsers();
    }

    private loadUsers() {
        var queryParams: any = "";
        this.userResourceService.getAllUsersUsingGET(queryParams).subscribe(
            (users: UserDTO[]) => {
                this.dataSource = users;
            }
        );
    }

    private newUser() {
        this.dialog.open(AigUserNewDialogComponent);
    }
}

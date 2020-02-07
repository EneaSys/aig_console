import { Component } from '@angular/core';
import { UserResourceService, UserDTO } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigUserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class AigUserListComponent extends GenericComponent {
    constructor(
        private userResourceService: UserResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

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


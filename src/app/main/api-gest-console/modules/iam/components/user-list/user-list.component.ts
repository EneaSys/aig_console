import { Component } from '@angular/core';
import { UserResourceService, UserDTO } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigUserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { PageEvent } from '@angular/material/paginator';

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
    userDTOs: UserDTO[];
    error: any;

    filter = {
        seller: null,
    }

    pageable = {
        page: 0,
        size: 20,
    }
    length: number = 500;
    index: number;

    loadPage() {
        this.loadUser(0);
    }

    reloadPage() {
        this.loadUser(this.pageable.page);
    }

    pageEvent(event: PageEvent) {
        this.pageable.size = event.pageSize;
        this.loadUser(event.pageIndex);
    }

    private async loadUser(page: number) {
        this.userDTOs = null;

        this.index = page
        this.pageable.page = page;

        try {
            this.userDTOs = await this.userResourceService.getAllUsersUsingGET(null,null,null,null,null,null,null,null,this.pageable.page,this.pageable.size,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null).toPromise();
        } catch(e) {
            this.error = e;
        }
    }

    newUser() {
        this.dialog.open(AigUserNewDialogComponent);
    }
}


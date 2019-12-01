import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomRoleResourceService, CustomRoleDTO } from 'api-gest';
import { EventService } from 'app/main/api-gest/event.service';
import { Observable } from 'rxjs';
import { AigRoleCustomNewDialogComponent } from '../custom-role-new-dialog/custom-role-new-dialog.component';

@Component({
    templateUrl: './custom-role-page.component.html',
    styleUrls: ['./custom-role-page.component.scss']
})
export class AigCustomRolePageComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private customRoleResourceService: CustomRoleResourceService,
        private eventService: EventService,
    ) {
        this.eventService.reloadPage$.subscribe(() => this.ngOnInit());
    }
    roleCustomDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    roleCustomDataSource: Observable<CustomRoleDTO[]>;

    ngOnInit(): void {
        this.roleCustomDataSource = this.customRoleResourceService.getAllCustomRolesUsingGET("");
    }

    newCustomRole(): void {
        this.dialog.open(AigRoleCustomNewDialogComponent);
    }
}

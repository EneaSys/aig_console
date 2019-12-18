import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomRoleResourceService, CustomRoleDTO } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigRoleCustomNewDialogComponent } from '../custom-role-new-dialog/custom-role-new-dialog.component';
import { GenericComponent } from 'app/main/api-gest-console/generic-component';

@Component({
    templateUrl: './custom-role-page.component.html',
    styleUrls: ['./custom-role-page.component.scss']
})
export class AigCustomRolePageComponent extends GenericComponent {
    constructor(
        private dialog: MatDialog,
        private customRoleResourceService: CustomRoleResourceService,
        eventService: EventService,
    ) { super(eventService) }

    roleCustomDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    roleCustomDataSource: CustomRoleDTO[];
    error: any;

    loadComponent(): void {
        var destructor = this.customRoleResourceService.getAllCustomRolesUsingGET().subscribe(
            value => this.roleCustomDataSource = value,
            error => this.error = error,
        );
        this._destructors.push(destructor);
    }

    newCustomRole(): void {
        this.dialog.open(AigRoleCustomNewDialogComponent);
    }
}

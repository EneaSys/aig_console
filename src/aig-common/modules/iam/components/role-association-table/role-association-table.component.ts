import { Component, OnInit, Input } from '@angular/core';
import { ContextGroupDTO, RoleAssignationResourceService, RoleAssignationDTO, UserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-role-association-table',
    templateUrl: './role-association-table.component.html',
    styleUrls: ['./role-association-table.component.scss']
})
export class AigRoleAssociationTableComponent implements OnInit {
    constructor(
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    buttonConfig: any = {};

    ngOnInit(): void { }

    removeFromGroup(roleAssignation: any) {
        this._fuseProgressBarService.show();

        let message = "Removed role";
        if (roleAssignation.customRole != null || roleAssignation.systemRole != null) {
            let groupChild: ContextGroupDTO = this.buttonConfig.removeFromGroup;
            let roleName = (roleAssignation.customRoleId != null) ? roleAssignation.customRole.name : roleAssignation.systemRole.name;
            let message = "Removed role: " + roleName + " to group: " + groupChild.name + ".";
        }
        this.remove(roleAssignation, message);
    }

    removeFromUser(roleAssignation: any) {
        this._fuseProgressBarService.show();

        let message = "Removed role";
        if (roleAssignation.customRole != null || roleAssignation.systemRole != null) {
            let user: UserDTO = this.buttonConfig.removeFromUser;
            let roleName = (roleAssignation.customRoleId != null) ? roleAssignation.customRole.name : roleAssignation.systemRole.name;
            message = "Removed role: " + roleName + " to user: " + user.firstName + ".";
        }

        this.remove(roleAssignation, message);
    }

    private remove(roleAssignation: any, message: string) {
        this.roleAssignationResourceService.deleteRoleAssignationUsingDELETE(roleAssignation.id).subscribe(
            () => {
                this.eventService.reloadCurrentPage();
                this._snackBar.open(message, null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            }
        );
    }
}

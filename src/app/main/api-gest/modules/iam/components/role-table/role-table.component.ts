import { Component, OnInit, Input } from '@angular/core';
import { ContextGroupDTO, RoleAssignationResourceService, RoleAssignationDTO, UserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'app/main/api-gest/event.service';

@Component({
    selector: 'aig-role-table',
    templateUrl: './role-table.component.html',
    styleUrls: ['./role-table.component.scss']
})
export class AigRoleTableComponent implements OnInit {
    constructor(
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private eventService: EventService,
    ) { }
    
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    buttonConfig: any = {};

    ngOnInit(): void { }

    removeFromGroup(roleAssignation: any) {
        this._fuseProgressBarService.show();

        let groupChild: ContextGroupDTO = this.buttonConfig.removeFromGroup;
        let roleName = (roleAssignation.customRoleId != null) ? roleAssignation.customRole.name : roleAssignation.systemRole.name;
        let message = "Removed role: " + roleName + " to group: " + groupChild.name + ".";

        this.remove(roleAssignation, message);
    }

    removeFromUser(roleAssignation: any) {
        this._fuseProgressBarService.show();

        let userChild: UserDTO = this.buttonConfig.removeFromUser;
        let roleName = (roleAssignation.customRoleId != null) ? roleAssignation.customRole.name : roleAssignation.systemRole.name;
        let message = "Removed role: " + roleName + " to user: " + userChild.firstName + ".";

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

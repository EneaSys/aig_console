import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ContextGroupResourceService, ContextGroupDTO, UserDTO, ContextUserResourceService, ContextUserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-group-table',
    templateUrl: './group-table.component.html',
    styleUrls: ['./group-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigGroupTableComponent implements OnInit {
    constructor(
        private router: Router,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private contextGroupResourceService: ContextGroupResourceService,
        private contextUserResourceService: ContextUserResourceService,
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

    public groupDetails(idGroup: number) {
        this.router.navigate(['iam', 'group', idGroup]);
    }

    public removeGroupFromGroup(groupParent: ContextGroupDTO) {
        this._fuseProgressBarService.show();

        let groupChild: ContextGroupDTO = this.buttonConfig.removeGroupFromGroup;

        let _groupChild: ContextGroupDTO = JSON.parse(JSON.stringify(groupChild));
        _groupChild.groupMemberOfs.forEach((group, index) => {
            if (group.id == groupParent.id) _groupChild.groupMemberOfs.splice(index, 1);
        });

        this.contextGroupResourceService.updateContextGroupUsingPUT(_groupChild).subscribe(
            (value: ContextGroupDTO) => {
                groupChild.groupMemberOfs = _groupChild.groupMemberOfs;
                this.eventService.reloadCurrentPage();
                this._snackBar.open("Group " + groupParent.name + " removed from " + groupChild.name + ".", null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            },
            (error: any) => {
                console.log(error);
                this._snackBar.open("Error: " + error.error.title + ".", null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            }
        )
    }

    public removeUserFromGroup(groupToRemove: ContextGroupDTO) {
        this._fuseProgressBarService.show();

        let user: any = this.buttonConfig.removeUserFromGroup;

        let _user = JSON.parse(JSON.stringify(user));
        _user.userMemberOfs.forEach((group, index) => {
            if (group.id == groupToRemove.id) _user.userMemberOfs.splice(index, 1);
        });

        this.contextUserResourceService.updateContextUserUsingPUT(_user).subscribe(
            (value: ContextUserDTO) => {
                user.userMemberOfs = _user.userMemberOfs;
                this.eventService.reloadCurrentPage();
                this._snackBar.open("Group " + groupToRemove.name + " removed from " + user.firstName + " " + user.lastName + ".", null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.title + ".", null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            }
        )
    }
}

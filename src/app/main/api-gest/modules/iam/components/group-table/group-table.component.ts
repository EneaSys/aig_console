import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ContextGroupResourceService, ContextGroupDTO, UserDTO, ContextUserResourceService, ContextUserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

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
    ) { }

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

        groupChild.groupMemberOfs.forEach((item, index) => {
            if (item === groupParent) groupChild.groupMemberOfs.splice(index, 1);
        });

        this.contextGroupResourceService.updateContextGroupUsingPUT(groupChild).subscribe(
            (value: ContextGroupDTO) => {
                this._snackBar.open("Group " + groupParent.name + " removed from " + groupChild.name + ".", null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            }
        )
    }

    public removeUserFromGroup(grouptoRemove: ContextGroupDTO) {
        this._fuseProgressBarService.show();

        let user: any = this.buttonConfig.removeUserFromGroup;

        user.userMemberOfs.forEach((group, index) => {
            if (group === grouptoRemove) user.userMemberOfs.splice(index, 1);
        });
        console.log(user);

        this.contextUserResourceService.updateContextUserUsingPUT(user).subscribe(
            (contextUser: ContextUserDTO) => {
                this._snackBar.open("Group " + grouptoRemove.name + " removed from " + user.firstName + " " + user.lastName + ".", null, { duration: 5000, });
                this._fuseProgressBarService.hide();
            }
        )
    }
}

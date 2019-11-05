import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ContextGroupResourceService, ContextGroupDTO } from 'api-gest';
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

    public removeFromGroup(groupParent: ContextGroupDTO) {
        this._fuseProgressBarService.show();

        let groupChild: ContextGroupDTO = this.buttonConfig.removeFromGroup;

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
}

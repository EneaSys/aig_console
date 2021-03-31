import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ContextGroupResourceService, ContextGroupDTO, UserDTO, ContextUserResourceService, ContextUserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatDialog } from '@angular/material';
import { AigGroupNewDialogComponent } from 'app/main/api-gest-console/modules/iam/components/group-new-dialog/group-new-dialog.component';

@Component({
    selector: 'aig-group-table',
    templateUrl: './group-table.component.html',
    styleUrls: ['./group-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigGroupTableComponent implements OnInit {
    constructor(
  
            private groupResourceService: ContextGroupResourceService,
            private eventService: EventService,
            private _snackBar: MatSnackBar,
            private _fuseProgressBarService: FuseProgressBarService,
            private router: Router,
            private dialog: MatDialog,
        ) { }
   

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    buttonConfig: any = {};

    ngOnInit(): void { }

    async deleteGroup(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.groupResourceService.deleteContextGroupUsingDELETE(id).toPromise();
            this._snackBar.open(`Group: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting group: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editGroup(groupDTO: ContextGroupDTO) {
        this.dialog.open(AigGroupNewDialogComponent, { data: { group: groupDTO } });
    }
}

import { Component, OnInit } from '@angular/core';
import { AigGroupService } from '../../../_common/services/group.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AigGroupNewDialogComponent } from '../group-new-dialog/group-new-dialog.component';

@Component({
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class AigGroupListComponent implements OnInit {
    constructor(
        private groupService : AigGroupService,
        public dialog: MatDialog,
    ) { }

    displayedColumns: string[] = ['id', 'name', 'buttons'];
    dataSource: any[];

    ngOnInit(): void {
        this.loadGroups();
    }

    private loadGroups() {
        this.groupService.query().subscribe(
            (res: HttpResponse<any[]>) => this.dataSource = res.body,
            (res: HttpErrorResponse) => console.log("Errore: ", res.message)
        );
    }

    newGroup() {
        this.dialog.open(AigGroupNewDialogComponent);
    }
}

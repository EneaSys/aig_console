import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AigGroupNewDialogComponent } from '../group-new-dialog/group-new-dialog.component';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextGroupResourceService, ContextGroupDTO } from 'api-gest';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class AigGroupListComponent implements OnInit {
    constructor(
        private contextGroupResourceService: ContextGroupResourceService,
        public dialog: MatDialog,
        private eventService: EventService,
    ) {
        this.eventService.reloadPage$.subscribe(() => {
            this.ngOnInit()
        });
    }

    displayedColumns: string[] = ['id', 'name', 'buttons'];
    contextGroupDataSource: Observable<ContextGroupDTO[]>;

    ngOnInit(): void {
        this.contextGroupDataSource = this.contextGroupResourceService.getAllContextGroupsUsingGET("");
    }

    newGroup() {
        this.dialog.open(AigGroupNewDialogComponent);
    }
}

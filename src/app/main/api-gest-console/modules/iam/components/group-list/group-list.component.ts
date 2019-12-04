import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AigGroupNewDialogComponent } from '../group-new-dialog/group-new-dialog.component';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextGroupResourceService, ContextGroupDTO } from 'api-gest';
import { Observable } from 'rxjs';
import { GenericComponent } from 'app/main/api-gest-console/generic-component';

@Component({
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class AigGroupListComponent extends GenericComponent {
    constructor(
        private contextGroupResourceService: ContextGroupResourceService,
        public dialog: MatDialog,
        eventService: EventService,
    ) { super(eventService) }

    displayedColumns: string[] = ['id', 'name', 'buttons'];
    contextGroupDataSource: Observable<ContextGroupDTO[]>;

    loadComponent(): void {
        this.contextGroupDataSource = this.contextGroupResourceService.getAllContextGroupsUsingGET("");
    }

    newGroup() {
        this.dialog.open(AigGroupNewDialogComponent);
    }
}

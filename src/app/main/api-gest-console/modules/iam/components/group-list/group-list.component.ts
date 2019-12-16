import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AigGroupNewDialogComponent } from '../group-new-dialog/group-new-dialog.component';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextGroupResourceService, ContextGroupDTO } from 'api-gest';
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
    contextGroupDataSource: ContextGroupDTO[];
    error: any;

    loadComponent(): void {
        var destructor = this.contextGroupResourceService.getAllContextGroupsUsingGET("").subscribe(
            res => this.contextGroupDataSource = res,
            err => this.error = err,
        );
        this._destructors.push(destructor);
    }

    newGroup() {
        this.dialog.open(AigGroupNewDialogComponent);
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContextModuleDTO, ContextModuleResourceService } from 'aig-management';
import { AigContextModuleNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/context-module-new-update-modal/context-module-new-update-modal.component';


@Component({
    selector: 'aig-context-module-list-table',
    templateUrl: './context-module-list-table.component.html',
    styleUrls: ['./context-module-list-table.component.scss'],
})
export class AigContextModuleListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private contextModuleResourceService: ContextModuleResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ){ }

    ngOnInit(): void {}

    async deleteContextModule(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.contextModuleResourceService.deleteContextModuleUsingDELETE(id).toPromise();
            this._snackBar.open(`Context Module: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting context Module: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editContextModule(contextModuleDTO: ContextModuleDTO) {
        this.dialog.open(AigContextModuleNewUpdateModalComponent, { data: { contextModule: contextModuleDTO } });
    }

}
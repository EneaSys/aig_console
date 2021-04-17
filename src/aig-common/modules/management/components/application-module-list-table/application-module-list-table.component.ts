import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ApplicationModuleDTO, ApplicationModuleResourceService } from 'aig-management';
import { AigApplicationModuleNewUpdateModalComponent } from 'app/main/api-gest-console/modules/management/components/application-module-new-update-modal/application-module-new-update-modal.component';

@Component({
    selector: 'aig-application-module-list-table',
    templateUrl: './application-module-list-table.component.html',
    styleUrls: ['./application-module-list-table.component.scss']
})
export class AigApplicationModuleListTableComponent implements OnInit {
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];
    @Input()
    error: any;

    constructor(
        private applicationModuleResourceService: ApplicationModuleResourceService,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
    ) { }
    
   ngOnInit(): void { }

    async deleteApplicationModule(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.applicationModuleResourceService.deleteApplicationModuleUsingDELETE(id).toPromise();
            this._snackBar.open(`ApplicationModule: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting ApplicationModule: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editApplicationModule(applicationModuleDTO: ApplicationModuleDTO) {
        this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }
}

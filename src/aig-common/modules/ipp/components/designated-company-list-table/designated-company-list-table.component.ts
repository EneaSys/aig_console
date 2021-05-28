import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { DesignatedCompanyDTO, DesignatedCompanyResourceService, DossierDTO, DossierResourceService } from 'aig-italianlegislation';
import { AigDesignatedCompanyNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/designated-company-new-update-dialog/designated-company-new-update-dialog.component';
@Component({
    selector: 'aig-designated-company-list-table',
    templateUrl: './designated-company-list-table.component.html',
    styleUrls: ['./designated-company-list-table.component.scss']
})
export class AigDesignatedCompanyListTableComponent implements OnInit {
    constructor(
        private designatedCompanyResourceService: DesignatedCompanyResourceService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
    ) { }

    @Input()
    error: any;
    @Input()
    displayColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    async deleteDesignatedCompany(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.designatedCompanyResourceService.deleteDesignatedCompanyUsingDELETE(id).toPromise();
            this._snackBar.open(`Designated Company: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting designated company: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editDesignatedCompany(designatedCompanyDTO: DesignatedCompanyDTO) {
        this.dialog.open(AigDesignatedCompanyNewUpdateDialogComponent, { data: {designatedCompany: designatedCompanyDTO } });
    }
}

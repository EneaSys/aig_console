import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { InsurancePolicyStatusDTO, InsurancePolicyStatusResourceService} from 'aig-italianlegislation';
import { AigInsurancePolicyStatusNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/insurance-policy-status-new-update-dialog/insurance-policy-status-new-update-dialog.component';

@Component({
    selector: 'aig-insurance-policy-status-list-table',
    templateUrl: './insurance-policy-status-list-table.component.html',
    styleUrls: ['./insurance-policy-status-list-table.component.scss']
})
export class AigInsurancePolicyStatusListTableComponent implements OnInit {
    constructor(
        private insurancePolicyStatusResourceService: InsurancePolicyStatusResourceService,
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

    async deleteInsurancePolicyStatus(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.insurancePolicyStatusResourceService.deleteInsurancePolicyStatusUsingDELETE(id).toPromise();
            this._snackBar.open(`insurancePolicyStatus: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting insurance policy status: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editInsurancePolicyStatus(insurancePolicyStatusDTO: InsurancePolicyStatusDTO) {
        this.dialog.open(AigInsurancePolicyStatusNewUpdateDialogComponent, { data: {insurancePolicyStatus: insurancePolicyStatusDTO } });
    }
}



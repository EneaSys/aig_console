import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { InsurancePolicyDTO, InsurancePolicyResourceService} from 'aig-italianlegislation';
import { AigInsurancePolicyNewUpdateDialogComponent } from 'app/main/api-gest-console/modules/ipp/components/insurance-policy-new-update-dialog/insurance-policy-new-update-dialog.component';

@Component({
    selector: 'aig-insurance-policy-list-table',
    templateUrl: './insurance-policy-list-table.component.html',
    styleUrls: ['./insurance-policy-list-table.component.scss']
})
export class AigInsurancePolicyListTableComponent implements OnInit {
    constructor(
        private insurancePolicyResourceService: InsurancePolicyResourceService,
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

    async deleteInsurancePolicy(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.insurancePolicyResourceService.deleteInsurancePolicyUsingDELETE(id).toPromise();
            this._snackBar.open(`insurancePolicy: '${id}' deleted.`, null, { duration: 2000, });

            this.eventService.reloadCurrentPage();
        } catch (e) {
            this._snackBar.open(`Error during deleting insurance policy: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editInsurancePolicy(insurancePolicyDTO: InsurancePolicyDTO) {
        this.dialog.open(AigInsurancePolicyNewUpdateDialogComponent, { data: {insurancePolicy: insurancePolicyDTO } });
    }
}



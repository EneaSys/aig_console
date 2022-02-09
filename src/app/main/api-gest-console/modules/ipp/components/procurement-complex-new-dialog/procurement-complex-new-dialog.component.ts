import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatStepper, MAT_DIALOG_DATA } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ProcurementLotResourceService, ProcurementResourceService } from 'aig-italianlegislation';

@Component({
    templateUrl: './procurement-complex-new-dialog.component.html',
    styleUrls: ['./procurement-complex-new-dialog.component.scss']
})
export class AigProcurementComplexNewDialogComponent {
    constructor(
		private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementResourceService: ProcurementResourceService,
		private procurementLotResourceService: ProcurementLotResourceService,
        private eventService: EventService,

        public matDialogRef: MatDialogRef<AigProcurementComplexNewDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

	@ViewChild('stepper', {static: true}) myStepper: MatStepper;

	
	stepControl = {
		procurement: false,
		procurementLot: false,
	}

	procurement: any;
	submitProcurement(procurement: any) {
		this.procurement = procurement;
		this.stepControl.procurement = true;
		setTimeout(() => this.myStepper.next(), 1)
	}

	procurementLots: any[] = [];
	submitProcurementLot(procurementLot: any) {
		{
			let procurementLots: any[] = [];
			procurementLots.push(procurementLot);
			this.procurementLots = procurementLots;
		}
		this.stepControl.procurementLot = true;
		setTimeout(() => this.myStepper.next(), 1)
	}

	creating: number = 0;
	async create() {
		this.creating = 1;
		try {
			this._fuseProgressBarService.show();
			
			this.procurement = await this.procurementResourceService.createProcurementUsingPOST(this.procurement).toPromise();

			for(let procurementLot of this.procurementLots) {
				procurementLot.procurementId = this.procurement.id;
				procurementLot = await this.procurementLotResourceService.createProcurementLotUsingPOST(procurementLot).toPromise();
			}
			
			this.creating = 2;
			this.eventService.reloadCurrentPage();
		} catch (e) {
			this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
			this.creating = 3;
		} finally {
			this._fuseProgressBarService.hide();
		}
	}
}
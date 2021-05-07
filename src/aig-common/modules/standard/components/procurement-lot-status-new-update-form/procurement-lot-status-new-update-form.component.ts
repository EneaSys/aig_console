import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpProcurementLotStatusDTO, IlPpProcurementLotStatusResourceService, IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';

@Component({
    selector: 'aig-procurement-lot-status-new-update-form',
    templateUrl: './procurement-lot-status-new-update-form.component.html',
    styleUrls: ['./procurement-lot-status-new-update-form.component.scss']
})
export class AigProcurementLotStatusNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementLotStatusResourceService: IlPpProcurementLotStatusResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    procurementLotStatus: IlPpProcurementLotStatusDTO;

    procurementLotStatusNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.procurementLotStatusNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            description: [''],
            code: [''],
            wikiCode: [''],
        })
        
        if (this.procurementLotStatus != null) {
            this.procurementLotStatusNewUpdateForm.patchValue(this.procurementLotStatus);
        }
    }

    async submit() {
        if (!this.procurementLotStatusNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procurementLotStatus: IlPpProcurementLotStatusDTO = this.procurementLotStatusNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (procurementLotStatus.id != 0) {
                await this.procurementLotStatusResourceService.updateIlPpProcurementLotStatusUsingPUT(procurementLotStatus).toPromise();
                postOrPut = "updated";
            } else {
                await this.procurementLotStatusResourceService.createIlPpProcurementLotStatusUsingPOST(procurementLotStatus).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newProcurementLotStatus() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

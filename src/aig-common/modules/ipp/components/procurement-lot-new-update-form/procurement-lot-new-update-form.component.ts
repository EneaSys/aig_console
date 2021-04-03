import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';

import { ProcurementLotDTO, ProcurementLotResourceService,  } from 'aig-italian-public-procurement';

@Component({
    selector: 'aig-procurement-lot-new-update-form',
    templateUrl: './procurement-lot-new-update-form.component.html',
    styleUrls: ['./procurement-lot-new-update-form.component.scss']
})
export class AigProcurementLotNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementLotResourceService: ProcurementLotResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    procurementLot: ProcurementLotDTO;

    procurementLotNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.procurementLotNewUpdateForm = this._formBuilder.group({
            id: [''],
            cig: ['', Validators.required],
            description: ['', Validators.required],
            offerExpiryDate: ['', Validators.required],
            baseAmount: ['', Validators.required],
            securityAmount: [''],
            istatCode: [''],
            nustCode: [''],
            ippLotTypeCode: ['', Validators.required],
            ippLotCategoryCode: ['', Validators.required],
            cpvCode: ['', Validators.required],
        })
        
        if (this.procurementLot != null) {
            this.procurementLotNewUpdateForm.patchValue(this.procurementLot);
        }
    }

    async submit() {
        if (!this.procurementLotNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procurementLot: ProcurementLotDTO = this.procurementLotNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.procurementLot.id != 0) {
                await this.procurementLotResourceService.updateProcurementLotUsingPUT(procurementLot).toPromise();
                postOrPut = "updated";
            } else {
                await this.procurementLotResourceService.createProcurementLotUsingPOST(procurementLot).toPromise();
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

    newProcurement() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

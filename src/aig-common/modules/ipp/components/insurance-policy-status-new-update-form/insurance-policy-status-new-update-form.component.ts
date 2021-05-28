import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { InsurancePolicyStatusDTO, InsurancePolicyStatusResourceService} from 'aig-italianlegislation';

@Component({
    selector: 'aig-insurance-policy-status-new-update-form',
    templateUrl: './insurance-policy-status-new-update-form.component.html',
    styleUrls: ['./insurance-policy-status-new-update-form.component.scss']
})
export class AigInsurancePolicyStatusNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private insurancePolicyStatusResourceService: InsurancePolicyStatusResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    insurancePolicyStatus: InsurancePolicyStatusDTO;

    insurancePolicyStatusNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.insurancePolicyStatusNewUpdateForm = this._formBuilder.group({
            id:[''],
            description:[''],
        })
        
        if (this.insurancePolicyStatus != null) {
            this.insurancePolicyStatusNewUpdateForm.patchValue(this.insurancePolicyStatus);
        }
    }

    async submit() {
        if (!this.insurancePolicyStatusNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let insurancePolicyStatus: InsurancePolicyStatusDTO = this.insurancePolicyStatusNewUpdateForm.value;
        console.log(this.insurancePolicyStatus);

        try {
            let postOrPut: string;

            if (this.insurancePolicyStatus.id > 0) {
                await this.insurancePolicyStatusResourceService.updateInsurancePolicyStatusUsingPUT(insurancePolicyStatus).toPromise();
                postOrPut = "updated";
            } else {
                await this.insurancePolicyStatusResourceService.createInsurancePolicyStatusUsingPOST(insurancePolicyStatus).toPromise();
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

    newInsurancePolicy() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

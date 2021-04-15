import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { InsurancePolicyDTO, InsurancePolicyResourceService, PartecipationDTO, PartecipationResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'aig-insurance-policy-new-update-form',
    templateUrl: './insurance-policy-new-update-form.component.html',
    styleUrls: ['./insurance-policy-new-update-form.component.scss']
})
export class AigInsurancePolicyNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private insurancePolicyResourceService: InsurancePolicyResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    insurancePolicy: InsurancePolicyDTO;

    insurancePolicyNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.insurancePolicyNewUpdateForm = this._formBuilder.group({
            id:[''],
            
        })
        
        if (this.insurancePolicy != null) {
            this.insurancePolicyNewUpdateForm.patchValue(this.insurancePolicy);
        }
    }

    async submit() {
        if (!this.insurancePolicyNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let insurancePolicy: InsurancePolicyDTO = this.insurancePolicyNewUpdateForm.value;

        console.log(this.insurancePolicy);
        try {
            let postOrPut: string;

            if (this.insurancePolicy.id > 0) {
                await this.insurancePolicyResourceService.updateInsurancePolicyUsingPUT(insurancePolicy).toPromise();
                postOrPut = "updated";
            } else {
                await this.insurancePolicyResourceService.createInsurancePolicyUsingPOST(insurancePolicy).toPromise();
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

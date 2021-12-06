import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EopooTypeResourceService, EopooTypeDTO, FormTypeDTO, FormTypeResourceService, FormDataDTO, FormDataResourceService } from 'aig-generic';
import { EventService } from 'aig-common/event-manager/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'aig-form-data-new-update-form',
    templateUrl: './form-data-new-update-form.component.html',
    styleUrls: ['./form-data-new-update-form.component.scss']
})
export class AigFormDataNewUpdateFormComponent implements OnInit {
	@Input()
    formData: FormDataDTO;

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private formDataResourceService: FormDataResourceService,
    ) { }
	
	step: any = {
        form: true,
        loading: false,
        complete: false
    };

   



    isUpdate: boolean = false;

    formTypeResult: any;

    formDataNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.formDataNewUpdateForm = this._formBuilder.group({
            id: [''],
            n1: ['', [Validators.required]],
            
        })

        if (this.formData != null && this.formData.id != null) {
            this.formDataNewUpdateForm.patchValue(this.formData);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.formDataNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let formData = this.formDataNewUpdateForm.value;

        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.formDataResourceService.updateFormDataUsingPUT(formData).toPromise();
                postOrPut = "updated";
            } else {
                await this.formDataResourceService.createFormDataUsingPOST(formData).toPromise();
                postOrPut = "created";
            }

            this.formTypeResult = formData;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newFormData() {
        this.setStep("form");
    }

    private setStep(stepToShow: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
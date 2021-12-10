import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EopooTypeResourceService, EopooTypeDTO, FormTypeDTO, FormTypeResourceService } from 'aig-generic';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-form-type-new-update-form',
    templateUrl: './form-type-new-update-form.component.html',
    styleUrls: ['./form-type-new-update-form.component.scss']
})
export class AigFormTypeNewUpdateFormComponent implements OnInit {
	@Input()
    formType: FormTypeDTO;

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private formTypeResourceService: FormTypeResourceService,
    ) { }
	
	step: any = {
        form: true,
        loading: false,
        complete: false
    };

   



    isUpdate: boolean = false;

    formTypeResult: any;

    formTypeNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.formTypeNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            
        })

        if (this.formType != null && this.formType.id != null) {
            this.formTypeNewUpdateForm.patchValue(this.formType);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.formTypeNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let formType = this.formTypeNewUpdateForm.value;

        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.formTypeResourceService.updateFormTypeUsingPUT(formType).toPromise();
                postOrPut = "updated";
            } else {
                await this.formTypeResourceService.createFormTypeUsingPOST(formType).toPromise();
                postOrPut = "created";
            }

            this.formTypeResult = formType;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newFormType() {
        this.setStep("form");
    }

    private setStep(stepToShow: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
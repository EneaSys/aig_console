import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EopooTypeResourceService, EopooTypeDTO } from 'aig-generic';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-eopoo-type-new-update-form',
    templateUrl: './eopoo-type-new-update-form.component.html',
    styleUrls: ['./eopoo-type-new-update-form.component.scss']
})
export class AigEopooTypeNewUpdateFormComponent implements OnInit {
	@Input()
    eopooType: EopooTypeDTO;

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private eopooTypeResourceService: EopooTypeResourceService,
    ) { }
	
	step: any = {
        form: true,
        loading: false,
        complete: false
    };

    eopooTypeCategorys = ['GENERIC', 'PERSON'];



    isUpdate: boolean = false;

    eopooTypeResult: any;

    eopooTypeNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.eopooTypeNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            eopooTypeCode: [''],
            eopooCategory: ['', [Validators.required]],
        })

        if (this.eopooType != null && this.eopooType.id != null) {
            this.eopooTypeNewUpdateForm.patchValue(this.eopooType);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.eopooTypeNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let eopooType = this.eopooTypeNewUpdateForm.value;

        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.eopooTypeResourceService.updateEopooTypeUsingPUT(eopooType).toPromise();
                postOrPut = "updated";
            } else {
                await this.eopooTypeResourceService.createEopooTypeUsingPOST(eopooType).toPromise();
                postOrPut = "created";
            }

            this.eopooTypeResult = eopooType;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newEopooType() {
        this.setStep("form");
    }

    private setStep(stepToShow: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
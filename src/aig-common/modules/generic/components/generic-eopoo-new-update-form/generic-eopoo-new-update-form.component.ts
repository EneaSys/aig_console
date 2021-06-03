import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EopooResourceService, EopooDTO, EopooTypeDTO, EopooTypeResourceService } from 'aig-generic';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-generic-eopoo-new-update-form',
    templateUrl: './generic-eopoo-new-update-form.component.html',
    styleUrls: ['./generic-eopoo-new-update-form.component.scss']
})
export class AigGenericEopooNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
        private _formBuilder: FormBuilder,
        private eopooResourceService: EopooResourceService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    eopooType: EopooTypeDTO;

    @Input()
    eopoo: EopooDTO;

    isUpdate: boolean = false;

    eopooResult: any;

    eopooTypeDTOs: EopooTypeDTO[];

    eopooGenericNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.eopooGenericNewUpdateForm = this._formBuilder.group({
            id: [''],
            eopooType: [this.eopooType],
            taxNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), AigValidator.haveId]],
            name: ['', [Validators.required, AigValidator.haveId]],
        });

        this.loadTypes();

        if(this.eopoo == undefined && this.eopooType != null) {
            let newEopoo: any = {}
            newEopoo.eopooTypeId = this.eopooType.id;
            this.eopooGenericNewUpdateForm.patchValue(newEopoo);
        }

        if (this.eopoo != null && this.eopoo.id != null) {
            this.eopooGenericNewUpdateForm.patchValue(this.eopoo.genericEopoo);
            this.eopooGenericNewUpdateForm.patchValue(this.eopoo);
            this.isUpdate = true;
        }
    }

    async loadTypes() {
        this.eopooTypeDTOs = await this.eopooTypeResourceService.getAllEopooTypesUsingGET({}).toPromise();
    }

    async submit() {
        if (!this.eopooGenericNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let eopooGeneric: EopooDTO = {
            id: this.eopooGenericNewUpdateForm.value.id,
            taxNumber: this.eopooGenericNewUpdateForm.value.taxNumber,
            eopooTypeId: this.eopooGenericNewUpdateForm.value.eopooType.id,
            genericEopoo: this.eopooGenericNewUpdateForm.value,
        };

        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.eopooResourceService.updateEopooUsingPUT(eopooGeneric).toPromise();
                postOrPut = "updated";
            } else {
                await this.eopooResourceService.createEopooUsingPOST(eopooGeneric).toPromise();
                postOrPut = "created";
            }

            this.eopooResult = eopooGeneric;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newEopoo() {
        this.setStep("form");
    }

    private setStep(stepToShow: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
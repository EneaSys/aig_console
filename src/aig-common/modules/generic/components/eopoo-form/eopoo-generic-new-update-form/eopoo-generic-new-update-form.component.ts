import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EopooResourceService, EopooDTO } from 'aig-generic';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';
import { EopooTypeDTO } from 'api-gest';

@Component({
    selector: 'aig-eopoo-generic-new-update-form',
    templateUrl: './eopoo-generic-new-update-form.component.html',
    styleUrls: ['./eopoo-generic-new-update-form.component.scss']
})
export class AigEopooGenericNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
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

    eopooOrganizationNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.eopooOrganizationNewUpdateForm = this._formBuilder.group({
            id: [''],
            taxNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            name: ['', Validators.required],
            eopooTypeId: [''],
        });

        // Is creation
        if(this.eopoo == undefined && this.eopooType != null) {
            let newEopoo: any = {}
            newEopoo.eopooTypeId = this.eopooType.id;
            this.eopooOrganizationNewUpdateForm.patchValue(newEopoo);
        }

        // Is update
        if (this.eopoo != null) {
            this.eopooOrganizationNewUpdateForm.patchValue(this.eopoo);    
        }
    }

    async submit() {
        if (!this.eopooOrganizationNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let eopooOrganization: EopooDTO = this.eopooOrganizationNewUpdateForm.value;

        try {
            let postOrPut;
            if (eopooOrganization.id != 0) {
                await this.eopooResourceService.updateEopooUsingPUT(eopooOrganization).toPromise();
                postOrPut = "updated";
            } else {
                await this.eopooResourceService.createEopooUsingPOST(eopooOrganization).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Eopoo with tax id: '${eopooOrganization.taxNumber}' ${postOrPut}.`, null, { duration: 2000, });
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

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

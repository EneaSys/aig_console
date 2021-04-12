import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ReferentDTO, ReferentResourceService } from 'aig-generic';

@Component({
    selector: 'aig-referent-new-update-form',
    templateUrl: './referent-new-update-form.component.html',
    styleUrls: ['./referent-new-update-form.component.scss']
})
export class AigReferentNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        //public autocompleteDisplayService: AigAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        //private commerceAutocompleteService: AigCommerceAutocompleteService,
        private referentResourceService: ReferentResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    referent: ReferentDTO;

    isUpdate: boolean = false;

    referentNewUpdateForm: FormGroup;

    ngOnInit(): void {
        
        this.referentNewUpdateForm = this._formBuilder.group({
            id:[''],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            position: ['', Validators.required],
            eopoo: ['', Validators.required],
        })
        
        if (this.referent != null) {
            this.referentNewUpdateForm.patchValue(this.referent);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.referentNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let referent: ReferentDTO = {
            id: this.referentNewUpdateForm.value.id,
            firstname: this.referentNewUpdateForm.value.firstname,
            lastname: this.referentNewUpdateForm.value.lastname,
            position: this.referentNewUpdateForm.value.position,
            eopooTaxNumber: this.referentNewUpdateForm.value.eopoo,
        }

        try {
            let postOrPut;
            if (referent.id != 0) {
                await this.referentResourceService.updateReferentUsingPUT(referent).toPromise();
                postOrPut = "updated";
            } else {
                await this.referentResourceService.createReferentUsingPOST(referent).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Referent: '${referent.firstname} ${referent.lastname}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
     }

     newReferent() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
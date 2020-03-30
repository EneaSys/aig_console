import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-solidarity-request-new-update-form',
    templateUrl: './solidarity-request-new-update-form.component.html',
    styleUrls: ['./solidarity-request-new-update-form.component.scss']
})
export class AigSolidarityRequestNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,

        private eventService: EventService,
    ) { }

    @Input()
    solidarityRequest: any;

    solidarityRequestNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.solidarityRequestNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
        if (this.solidarityRequest != null) {
            this.solidarityRequestNewUpdateForm.patchValue(this.solidarityRequest);
        }
    }



    async submit() {
        if (!this.solidarityRequestNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let solidarityRequest: any = this.solidarityRequestNewUpdateForm.value;

        try {
            let postOrPut;
            if (solidarityRequest.id != 0) {
                //await this.cityResourceService.updateCityUsingPUT(city).toPromise();
                postOrPut = "updated";
            } else {
                //await this.cityResourceService.createCityUsingPOST(city).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`City: '${solidarityRequest.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }




    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

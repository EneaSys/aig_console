import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-city-new-update-form',
    templateUrl: './city-new-update-form.component.html',
    styleUrls: ['./city-new-update-form.component.scss']
})
export class AigCityNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private cityResourceService: CityResourceService,
        private eventService: EventService,
    ) { }
    
    @Input()
    city: CityDTO;

    cityNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.cityNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required], 
            code: ['', Validators.required], 
            wikiCode:['']
        })
        if (this.city != null) {
            this.cityNewUpdateForm.patchValue(this.city);
        }
    }

    async submit() {
        if (!this.cityNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let city = this.cityNewUpdateForm.value;

        try {
            let postOrPut;
            if (city.id != null && city.id != "") {
                await this.cityResourceService.updateCityUsingPUT(city).toPromise();
                postOrPut = "updated";
            } else {
                await this.cityResourceService.createCityUsingPOST(city).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`City: '${city.name}' ${postOrPut}.`, null, { duration: 2000, });
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

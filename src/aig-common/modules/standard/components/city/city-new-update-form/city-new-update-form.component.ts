import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { EventEmitter } from 'events';

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
        private cityResourceService: CityResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    city: CityDTO;

    @Input()
	returnToParent: boolean = false; 

    /*@Output()
	cityOutput = new EventEmitter<CityDTO>();*/

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

        let city: CityDTO = this.cityNewUpdateForm.value;

        /*if(this.returnToParent) {
			this.cityOutput.emit(city);
			this.setStep("complete");
		} */

        if(!this.returnToParent){
            try {
                let postOrPut;
                if (city.id != 0) {
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
        }
        
        this._fuseProgressBarService.hide();
    }

    newCity() {
        this.city = null;
        //this.cityOutput.emit(this.city);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

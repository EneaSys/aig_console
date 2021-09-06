import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

    @Output()
	cityOutput = new EventEmitter<CityDTO>();

    isUpdate: boolean = false;

    cityResult: any;

    cityNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.cityNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            wikiCode:[''],
            expirationDate: [''],
            activationDate: [''],

        })
        if (this.city != null && this.city.id != null) {
            this.cityNewUpdateForm.patchValue(this.city);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.cityNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let city: CityDTO = this.cityNewUpdateForm.value;

        if(this.returnToParent) {
			this.cityOutput.emit(city);
			this.setStep("complete");
		} 

        if(!this.returnToParent){
            try {
                let postOrPut: string;
                if (this.isUpdate) {
                    await this.cityResourceService.updateCityUsingPUT(city).toPromise();
                    postOrPut = "updated";
                } else {
                    await this.cityResourceService.createCityUsingPOST(city).toPromise();
                    postOrPut = "created";
                }

                this.cityResult = city;

                this.eventService.reloadCurrentPage();
    
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
        this.cityOutput.emit(this.city);
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
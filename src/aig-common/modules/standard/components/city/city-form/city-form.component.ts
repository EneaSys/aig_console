import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-city-form',
    templateUrl: './city-form.component.html',
    styleUrls: ['./city-form.component.scss']
})
export class AigCityNewUpdateFormComponent implements OnInit {
    private step: any = {
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
    cityDTO: CityDTO;

    cityNewForm: FormGroup;

    ngOnInit(): void {
        this.cityNewForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required], 
            code: ['', Validators.required], 
            wikiCode:['']
        })
        if (this.cityDTO != null) {
            this.cityNewForm.patchValue(this.cityDTO);
        }
    }

    async submit() {
        if (!this.cityNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let cityDTO = this.cityNewForm.value;

        try {
            let postOrPut;
            if (cityDTO.id != null && cityDTO.id != "") {
                await this.cityResourceService.updateCityUsingPUT(cityDTO).toPromise();
                postOrPut = "updated";
            } else {
                await this.cityResourceService.createCityUsingPOST(cityDTO).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`City: '${cityDTO.name}' ${postOrPut}.`, null, { duration: 2000, });
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

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

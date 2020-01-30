import { Component, OnInit } from '@angular/core';
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
export class AigCityFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private cityResourceService: CityResourceService,
        private eventService: EventService,
    ) { }

    private cityNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public cityDTO: CityDTO;

    ngOnInit(): void {
        this.cityNewForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required], 
            code: ['', Validators.required], 
            wikiCode:['']
        })
    }

    public createCity(){
        if (!this.cityNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let cityDTO: CityDTO = {
            name: this.cityNewForm.value.name,
            code: this.cityNewForm.value.code,
            wikiCode: this.cityNewForm.value.wikiCode
        };

        this.cityResourceService.createCityUsingPOST(cityDTO).subscribe(
            (value: CityDTO) => {
                this.cityDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("City: " + value.name + " created.", null, {duration: 2000,});
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.title, null, {duration: 5000,});
                this._fuseProgressBarService.hide();
                this.setStep("form");
            }
        );
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

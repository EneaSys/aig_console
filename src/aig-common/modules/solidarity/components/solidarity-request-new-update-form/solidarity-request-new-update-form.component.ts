import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteFunctionService } from 'aig-common/modules/standard/services/autocomplete-function.service';
import { Observable } from 'rxjs';
import { CityDTO } from 'aig-standard';

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
        private aigStandardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public aigStandardAutocompleteFunctionService: AigStandardAutocompleteFunctionService,
        private eventService: EventService,
    ) { }

    @Input()
    solidarityRequest: any;

    solidarityRequestNewUpdateForm: FormGroup;

    filteredBornCitys: Observable<CityDTO[]>;
    filteredCitys: Observable<CityDTO[]>;

    ngOnInit(): void {
        this.solidarityRequestNewUpdateForm = this._formBuilder.group({
            id: [''],

            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            sex: ['', Validators.required],
            bornDate: ['', Validators.required],
            bornCity: ['', Validators.required],
            
            address: ['', Validators.required],
            address2: ['', Validators.required],
            cap: ['', Validators.required],
            city: ['', Validators.required],
            
            senior: [''],
            adults: [''],
            childrens: [''],
            infants: [''],

            disability: [''],
            note: [''],
        })



        // PRECOMPILE
        // Is update
        if (this.solidarityRequest != null) {
            this.solidarityRequestNewUpdateForm.patchValue(this.solidarityRequest);
        }



        // EVENT ON ITERACTION
        this.filteredBornCitys = this.aigStandardAutocompleteFilterService.filterCity(this.solidarityRequestNewUpdateForm.controls['bornCity'].valueChanges);
        this.filteredCitys = this.aigStandardAutocompleteFilterService.filterCity(this.solidarityRequestNewUpdateForm.controls['city'].valueChanges);
    }



    async submit() {
        if (!this.solidarityRequestNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let solidarityRequest: any = this.solidarityRequestNewUpdateForm.value;

        console.log(solidarityRequest);

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

    newSolidarityRequest() {
        this.setStep("form");
    }


    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

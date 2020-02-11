import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EopooDTO, EopooResourceService, EopooTypeDTO } from 'aig-generic';
import { Observable } from 'rxjs';
import { CityDTO } from 'aig-standard';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteFunctionService } from 'aig-common/modules/standard/services/autocomplete-function.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'aig-eopoo-person-new-update-form',
    templateUrl: './eopoo-person-new-update-form.component.html',
    styleUrls: ['./eopoo-person-new-update-form.component.scss']
})
export class AigEopooPersonNewUpdateFormComponent implements OnInit {
    // Form preparation Objects
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private eopooResourceService: EopooResourceService,
        private _fuseProgressBarService: FuseProgressBarService,
        private aigStandardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public aigStandardAutocompleteFunctionService: AigStandardAutocompleteFunctionService,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    eopooType: EopooTypeDTO;
    @Input()
    eopoo: EopooDTO;

    eopooPersonNewUpdateForm: FormGroup;

    filteredCitys: Observable<CityDTO[]>;

    ngOnInit(): void {
        // PREPARE FORM
        this.eopooPersonNewUpdateForm = this._formBuilder.group({
            id: [''],
            taxNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(17)]],
            eopooTypeId: [''],

            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            sex: ['', Validators.required],
            bornDate: ['', Validators.required],
            bornCity: ['', Validators.required],
        });

        // Is creation
        if(this.eopoo == undefined && this.eopooType != null) {
            let newEopoo: any = {}
            newEopoo.eopooTypeId = this.eopooType.id;
            this.eopooPersonNewUpdateForm.patchValue(newEopoo);
        }



        // PRECOMPILE
        // Is update
        if (this.eopoo != null && this.eopoo.person != null) {
            this.eopooPersonNewUpdateForm.patchValue(this.eopoo.person);
            this.eopooPersonNewUpdateForm.patchValue(this.eopoo);
        }



        // EVENT ON ITERACTION
        this.filteredCitys = this.aigStandardAutocompleteFilterService.filterCity(this.eopooPersonNewUpdateForm.controls['bornCity'].valueChanges);
    }

    async submit() {
        if (!this.eopooPersonNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let formValue = this.eopooPersonNewUpdateForm.value;
        
        let eopooPerson: EopooDTO = {
            id: formValue.id,
            taxNumber: formValue.taxNumber,
            eopooTypeId: formValue.eopooTypeId,
            person: formValue,
        };
        eopooPerson.person.cityCode = formValue.bornCity.code;

        try {
            let postOrPut;
            if (eopooPerson.id != 0) {
                await this.eopooResourceService.updateEopooUsingPUT(eopooPerson).toPromise();
                postOrPut = "updated";
            } else {
                await this.eopooResourceService.createEopooUsingPOST(eopooPerson).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Eopoo with tax id: '${eopooPerson.taxNumber}' ${postOrPut}.`, null, { duration: 2000, });
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

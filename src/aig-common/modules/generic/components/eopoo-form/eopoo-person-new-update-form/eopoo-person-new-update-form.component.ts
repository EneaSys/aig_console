import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EopooDTO, EopooResourceService, EopooTypeDTO } from 'aig-generic';
import { Observable } from 'rxjs';
import { CityDTO } from 'aig-standard';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteFunctionService } from 'aig-common/modules/standard/services/autocomplete-function.service';

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
        private aigStandardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public aigStandardAutocompleteFunctionService: AigStandardAutocompleteFunctionService,
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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            taxId: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(17)]],
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
        if (this.eopoo != null) {
            this.eopooPersonNewUpdateForm.patchValue(this.eopoo);
        }



        // EVENT ON ITERACTION
        this.filteredCitys = this.aigStandardAutocompleteFilterService.filterCity(this.eopooPersonNewUpdateForm.controls['bornCity'].valueChanges);
    }

    submit() {
        if (!this.eopooPersonNewUpdateForm.valid) {
            return;
        }

        console.log("create Person");


    }
}

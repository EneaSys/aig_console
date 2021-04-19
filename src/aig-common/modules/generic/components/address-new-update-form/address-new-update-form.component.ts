import { Component, OnInit, Input } from '@angular/core';
import { EopooDTO, AddressDTO, AddressResourceService } from 'aig-generic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { CityDTO } from 'aig-standard';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteFunctionService } from 'aig-common/modules/standard/services/autocomplete-function.service';
import { AigGenericAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigGenericAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';

@Component({
    selector: 'aig-address-new-update-form',
    templateUrl: './address-new-update-form.component.html',
    styleUrls: ['./address-new-update-form.component.scss']
})
export class AigAddressNewUpdateFormComponent implements OnInit {
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
        private aigGenericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteFunctionService,
        private aigStandardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public standardAutocompleteFunctionService: AigStandardAutocompleteFunctionService,
        private addressResourceService: AddressResourceService,
    ) { }

    @Input()
    address: AddressDTO;

    addressNewUpdateForm: FormGroup;

    filteredCitys: Observable<CityDTO[]>;
    filteredEopoos: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.addressNewUpdateForm = this._formBuilder.group({
            id: [''],
            eopooTaxNumber: ['', Validators.required],
            name: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
        })

        if (this.address != null) {
            this.addressNewUpdateForm.patchValue(this.address);
        }

        this.filteredEopoos = this.aigGenericAutocompleteFilterService.filterEopoo(this.addressNewUpdateForm.controls['eopooTaxNumber'].valueChanges);

        this.filteredCitys = this.aigStandardAutocompleteFilterService.filterCity(this.addressNewUpdateForm.controls['city'].valueChanges);
    }

    async submit() {
        if (!this.addressNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let addressDTO: AddressDTO = {
            eopooId: this.addressNewUpdateForm.value.eopooTaxNumber.id,
            name: this.addressNewUpdateForm.value.name,
            address: this.addressNewUpdateForm.value.address,
            cityCode: this.addressNewUpdateForm.value.city.code,
        }

        try {
            await this.addressResourceService.createAddressUsingPOST(addressDTO).toPromise();
            this.eventService.reloadCurrentPage();
            this._snackBar.open("Address created", null, { duration: 5000, });
            this.setStep("complete");
        } catch(e) {
            this._snackBar.open("Error: " + e.error.message, null, { duration: 10000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newAddress() {
        this.setStep("form");
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

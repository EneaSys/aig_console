import { Component, OnInit, Input } from '@angular/core';
import { EopooDTO, AddressDTO, AddressResourceService } from 'aig-generic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { CityDTO } from 'aig-standard';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';
import { AigGenericAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from '../../services/form/autocomplete-function.service';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-address-new-update-form',
    templateUrl: './address-new-update-form.component.html',
    styleUrls: ['./address-new-update-form.component.scss']
})
export class AigAddressNewUpdateFormComponent implements OnInit {
	@Input()
    address: AddressDTO;

    @Input()
    eopoo: EopooDTO;

	isUpdate: boolean = false;
	
	constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
        private standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public standardAutocompleteDisplayService: AigStandardAutocompleteDisplayService,
        private addressResourceService: AddressResourceService,
    ) { }

	addressNewUpdateForm: FormGroup;
	
	step: any = {
        form: true,
        loading: false,
        complete: false
    };

	filteredCitys: Observable<CityDTO[]>;
    filteredEopoos: Observable<EopooDTO[]>;

    addressResult: any;

    ngOnInit(): void {
        this.addressNewUpdateForm = this._formBuilder.group({
            id: [''],
            eopoo: [this.eopoo, [Validators.required, AigValidator.haveId]],
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required, AigValidator.haveCode]],
        })

        if (this.address != null) {
            this.addressNewUpdateForm.patchValue(this.address);
            this.isUpdate = true;
        }

		this.filteredEopoos = this.genericAutocompleteFilterService.filterEopoo(this.addressNewUpdateForm.controls['eopoo'].valueChanges);
        this.filteredCitys = this.standardAutocompleteFilterService.filterCity(this.addressNewUpdateForm.controls['city'].valueChanges);
    }

    async submit() {
        if (!this.addressNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let address: AddressDTO = this.addressNewUpdateForm.value;
        address.eopooId = this.addressNewUpdateForm.value.eopoo.id;
        address.cityCode = this.addressNewUpdateForm.value.city.code;


        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.addressResourceService.updateAddressUsingPUT(address).toPromise();
                postOrPut = "updated";
            } else {
                await this.addressResourceService.createAddressUsingPOST(address).toPromise();
                postOrPut = "created";
            }

            this.addressResult = address;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newAddress() {
        this.setStep("form");
    }

    private setStep(stepToShow: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
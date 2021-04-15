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
        private aigStandardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public aigStandardAutocompleteFunctionService: AigStandardAutocompleteFunctionService,
        private addressResourceService: AddressResourceService,
    ) { }

    @Input()
    eopoo: EopooDTO;
    @Input()
    address: AddressDTO;

    addressNewUpdateForm: FormGroup;

    filteredCitys: Observable<CityDTO[]>;
    
    ngOnInit(): void {
        this.addressNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            eopooId: [],
        })

        if(this.address == undefined && this.eopoo != null) {
            let newAddress: any = {}
            newAddress.eopooId = this.eopoo.id;
            this.addressNewUpdateForm.patchValue(newAddress);
        }

        if (this.address != null) {
            this.addressNewUpdateForm.patchValue(this.address);
        }

        this.filteredCitys = this.aigStandardAutocompleteFilterService.filterCity(this.addressNewUpdateForm.controls['city'].valueChanges);
    }

    async submit() {
        if (!this.addressNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let address: AddressDTO = this.addressNewUpdateForm.value;
        address.cityCode = this.addressNewUpdateForm.value.city.code;

        try {
            let postOrPut;
            if (address.id != 0) {
                await this.addressResourceService.updateAddressUsingPUT(address).toPromise();
                postOrPut = "updated";
            } else {
                await this.addressResourceService.createAddressUsingPOST(address).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Address: '${address.name}' ${postOrPut}.`, null, { duration: 2000, });
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

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

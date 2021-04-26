import { Component, OnInit, Input } from '@angular/core';
import { SellerDTO, SellerResourceService } from 'aig-commerce';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { Observable } from 'rxjs';
import { EopooDTO } from 'aig-generic';

@Component({
    selector: 'seller-new-update-form',
    templateUrl: './seller-new-update-form.component.html',
    styleUrls: ['./seller-new-update-form.component.scss']
})
export class AigSellerNewUpdateFormComponent implements OnInit {
    @Input()
    seller: SellerDTO;
    @Input()
    eopoo: SellerDTO;
    
    constructor(
        private aigGenericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public AigGenericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        private sellerResourceService: SellerResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    sellerNewUpdateForm: FormGroup;

    filteredEopoos: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.sellerNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            eopoo: ['', Validators.required],
        })

        if (this.seller != null) {
            this.sellerNewUpdateForm.patchValue(this.seller);
        }

        if(this.eopoo != null) {
            this.sellerNewUpdateForm.controls['eopoo'].setValue(this.eopoo);
        }

        this.filteredEopoos = this.aigGenericAutocompleteFilterService.filterEopoo(this.sellerNewUpdateForm.controls['eopoo'].valueChanges);
    }




    async submit() {
        if (!this.sellerNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let sellerDTO: SellerDTO = {
            name: this.sellerNewUpdateForm.value.name,
            eopooCode: this.sellerNewUpdateForm.value.eopoo.id
        }

        try {
            await this.sellerResourceService.createSellerUsingPOST(sellerDTO).toPromise();
            this.eventService.reloadCurrentPage();
            this._snackBar.open("Seller created", null, { duration: 5000, });
            this.setStep("complete");
        } catch(e) {
            this._snackBar.open("Error: " + e.error.message, null, { duration: 10000, });
            this.setStep("form");
        }
        
        this._fuseProgressBarService.hide();
    }







    newSeller() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

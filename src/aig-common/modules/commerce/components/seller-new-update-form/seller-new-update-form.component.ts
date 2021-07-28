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
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    constructor(
        private aigGenericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public AigGenericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        private sellerResourceService: SellerResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    seller: SellerDTO;

    
    @Input()


    isUpdate: boolean = false;

    sellerResult: any;

    sellerNewUpdateForm: FormGroup;

    filteredEopoos: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.sellerNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            eopoo: ['', [Validators.required]],
        })

        if (this.seller != null && this.seller.id != null) {
            this.sellerNewUpdateForm.patchValue(this.seller);
            this.isUpdate = true;
        }

        this.filteredEopoos = this.aigGenericAutocompleteFilterService.filterEopoo(this.sellerNewUpdateForm.controls['eopoo'].valueChanges);
    }

    async submit() {
        if (!this.sellerNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let seller = this.sellerNewUpdateForm.value;
        seller.eopooCode = this.sellerNewUpdateForm.value.eopoo.id;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
				await this.sellerResourceService.updateSellerUsingPUT(seller).toPromise();
				postOrPut = "updated";
			} else {
				await this.sellerResourceService.createSellerUsingPOST(seller).toPromise();
				postOrPut = "created";
			}

            this.sellerResult = seller;

            this.eventService.reloadCurrentPage();
            
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

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
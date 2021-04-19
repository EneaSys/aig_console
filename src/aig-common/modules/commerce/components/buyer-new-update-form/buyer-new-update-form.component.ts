import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { BuyerDTO, BuyerResourceService, SellerDTO } from "aig-commerce";
import { EventService } from "aig-common/event-manager/event.service";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteFunctionService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { EopooDTO } from "aig-generic";
import { Observable } from "rxjs";
import { AigAutocompleteDisplayService } from "../../service/autocomplete-display.service";
import { AigCommerceAutocompleteService } from "../../service/autocomplete-filter.service";

@Component({
    selector: 'aig-buyer-new-update-form',
    templateUrl: './buyer-new-update-form.component.html',
    styleUrls: ['./buyer-new-update-form.component.scss']
})
export class AigBuyerNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private buyerResourceService: BuyerResourceService,
        private eventService: EventService,
        public autocompleteDisplayService: AigAutocompleteDisplayService,
        private commerceAutocompleteService: AigCommerceAutocompleteService,
        private aigGenericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteFunctionService,
    ) { }

    @Input()
    buyer: BuyerDTO;

    @Input()
    seller: SellerDTO;

    buyerNewUpdateForm: FormGroup;

    filteredSellers: Observable<SellerDTO[]>;
    filteredEopoos: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.buyerNewUpdateForm = this._formBuilder.group({
            id:[''],
            eopooCode: ['', Validators.required],
            confirmation: [true, Validators.required],
            statusNote: [''],
            seller: ['', Validators.required],
        })
        

        
        if (this.buyer != null) {
            this.buyerNewUpdateForm.patchValue(this.buyer);
        }

        if (this.seller!= null) {
            this.buyerNewUpdateForm.controls['seller'].patchValue(this.seller);
        }

        this.filteredEopoos = this.aigGenericAutocompleteFilterService.filterEopoo(this.buyerNewUpdateForm.controls['eopooCode'].valueChanges);
        
        this.filteredSellers = this.commerceAutocompleteService.filterSeller(this.buyerNewUpdateForm.controls['seller'].valueChanges);

    }

    async submit() {
        if (!this.buyerNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let buyer: BuyerDTO = {
            id: this.buyerNewUpdateForm.value.id,
            eopooCode: this.buyerNewUpdateForm.value.eopooCode,
            confirmation: this.buyerNewUpdateForm.value.confirmation,
            statusNote: this.buyerNewUpdateForm.value.statusNote,
            sellerId: this.buyerNewUpdateForm.value.seller.id,      
        
        }

        try {
            let postOrPut: string;

            if (buyer.id != 0) {
                await this.buyerResourceService.updateBuyerUsingPUT(buyer).toPromise();
                postOrPut = "updated";
            } else {
                await this.buyerResourceService.createBuyerUsingPOST(buyer).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newBuyer() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[step] = true;
    }
}

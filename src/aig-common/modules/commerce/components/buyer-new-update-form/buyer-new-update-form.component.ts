import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { BuyerDTO, BuyerResourceService, SellerDTO } from "aig-commerce";
import { AigValidator } from "aig-common/AigValidator";
import { EventService } from "aig-common/event-manager/event.service";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteDisplayService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { EopooDTO } from "aig-generic";
import { Observable } from "rxjs";
import { AigCommerceAutocompleteDisplayService } from "../../service/autocomplete-display.service";
import { AigCommerceAutocompleteFilterService } from "../../service/autocomplete-filter.service";

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
        public commerceAutocompleteDisplayService: AigCommerceAutocompleteDisplayService,
        private commerceAutocompleteFilterService: AigCommerceAutocompleteFilterService,
        public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
    ) { }

    @Input()
    buyer: BuyerDTO;

    @Input()
    seller: SellerDTO;

    isUpdate: boolean = false;

    buyerResult: any;

    buyerNewUpdateForm: FormGroup;

    filteredSellers: Observable<SellerDTO[]>;
    filteredEopoos: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.buyerNewUpdateForm = this._formBuilder.group({
            id:[''],
            
            seller: [this.seller, Validators.required, AigValidator.haveId],
            
            eopoo: ['', [Validators.required, AigValidator.haveId]],
            
            confirmation: [true, Validators.required, AigValidator.haveId ],
            statusNote: [''],
        })
        
        if (this.buyer != null && this.buyer.id != null) {
            this.buyerNewUpdateForm.patchValue(this.buyer);
            this.isUpdate = true
        }

        this.filteredEopoos = this.genericAutocompleteFilterService.filterEopoo(this.buyerNewUpdateForm.controls['eopoo'].valueChanges);
        
        this.filteredSellers = this.commerceAutocompleteFilterService.filterSeller(this.buyerNewUpdateForm.controls['seller'].valueChanges);
    }

    async submit() {
        if (!this.buyerNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let buyer: BuyerDTO = this.buyerNewUpdateForm.value;
        buyer.eopooCode = this.buyerNewUpdateForm.value.eopoo.id;
        buyer.sellerId = this.buyerNewUpdateForm.value.seller.id;
        
        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.buyerResourceService.updateBuyerUsingPUT(buyer).toPromise();
                postOrPut = "updated";
            } else {
                await this.buyerResourceService.createBuyerUsingPOST(buyer).toPromise();
                postOrPut = "created";
            }

            this.buyerResult = buyer;

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

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
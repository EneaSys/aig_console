import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AigValidator } from "aig-common/AigValidator";
import { EventService } from "aig-common/event-manager/event.service";
import { CreditCardResourceService, CreditCardDTO, WalletDTO } from 'aig-wallet';
import { Observable } from "rxjs";
import { AigWalletAutocompleteFilterService } from "../../services/autocomplete-filter.service";
import { AigWalletAutocompleteDisplayService } from "../../services/autocomplete-function.service";

@Component({
    selector: 'aig-credit-card-new-update-form',
    templateUrl: './credit-card-new-update-form.component.html',
    styleUrls: ['./credit-card-new-update-form.component.scss']
})
export class AigCreditCardNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
		public walletAutocompleteFilterService: AigWalletAutocompleteFilterService,
        public walletAutocompleteDisplayService: AigWalletAutocompleteDisplayService,
		private creditCardResourceService: CreditCardResourceService,
        private eventService: EventService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    creditCard: any;

	@Input()
    wallet: WalletDTO;

    isUpdate: boolean = false;

    creditCardResult: any;

    creditCardNewUpdateForm: FormGroup;

	filteredWallet: Observable<WalletDTO[]>;

    ngOnInit(): void {
        this.creditCardNewUpdateForm = this._formBuilder.group({
            id:[''],
			wallet: [this.wallet, [Validators.required, AigValidator.haveId] ],
            code: ['', [Validators.required]],
			pin: ['', [Validators.required]],
        })
        
        if (this.creditCard != null) {
            this.creditCardNewUpdateForm.patchValue(this.creditCard);
            this.isUpdate = true
        }

		this.filteredWallet = this.walletAutocompleteFilterService.filterWallet(this.creditCardNewUpdateForm.controls['wallet'].valueChanges);
    }

    async submit() {
        if (!this.creditCardNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let creditCard: any = this.creditCardNewUpdateForm.value;
		creditCard.walletId = this.creditCardNewUpdateForm.value.wallet.id;
        
        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.creditCardResourceService.updateCreditCardUsingPUT(creditCard).toPromise();
                postOrPut = "updated";
            } else {
                await this.creditCardResourceService.createCreditCardUsingPOST(creditCard).toPromise();
                postOrPut = "created";
            }

            this.creditCardResult = creditCard;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newCreditCard() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
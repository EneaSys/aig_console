import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AigValidator } from "aig-common/AigValidator";
import { EventService } from "aig-common/event-manager/event.service";
import { CreditCardResourceService, CreditCardDTO, WalletDTO, TransactionApiControllerService, TransactionRequest } from 'aig-wallet';
import { Observable } from "rxjs";
import { AigWalletAutocompleteFilterService } from "../../services/autocomplete-filter.service";
import { AigWalletAutocompleteDisplayService } from "../../services/autocomplete-function.service";

@Component({
    selector: 'aig-transaction-new-form',
    templateUrl: './transaction-new-form.component.html',
    styleUrls: ['./transaction-new-form.component.scss']
})
export class AigTransactionNewFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
		public walletAutocompleteFilterService: AigWalletAutocompleteFilterService,
        public walletAutocompleteDisplayService: AigWalletAutocompleteDisplayService,
		private transactionApiControllerService: TransactionApiControllerService,
        private eventService: EventService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    creditCard: CreditCardDTO;

	@Input()
    wallet: WalletDTO;

    transactionNewForm: FormGroup;

	filteredWallet: Observable<WalletDTO[]>;

    ngOnInit(): void {
        this.transactionNewForm = this._formBuilder.group({
            id:[''],
			wallet: [this.wallet, [Validators.required, AigValidator.haveId] ],
            amount: ['', [Validators.required]],
			creditCardCode: ['', [Validators.required]],
			pin: ['', [Validators.required]],
        })
        
        if (this.creditCard != null) {
			this.transactionNewForm.controls['creditCardCode'].patchValue(this.creditCard.code);
        }

		this.filteredWallet = this.walletAutocompleteFilterService.filterWallet(this.transactionNewForm.controls['wallet'].valueChanges);
    }

    async submit() {
        if (!this.transactionNewForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

		let formValue = this.transactionNewForm.value;
        let transactionRequest: TransactionRequest = {
			walletReceiver: this.transactionNewForm.value.wallet.id,
			amount: formValue.amount,
			cardCode: formValue.creditCardCode,
			cardPin: formValue.pin,
		};
		
        try {
            await this.transactionApiControllerService.createTransaction(transactionRequest).toPromise();

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newTransaction() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
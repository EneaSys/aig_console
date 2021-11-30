import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AigValidator } from "aig-common/AigValidator";
import { EventService } from "aig-common/event-manager/event.service";
import { Observable } from "rxjs";
import { AigMerchantService } from "../../services/merchant.service";
import { WalletDTO } from "aig-wallet";
import { AigWalletAutocompleteDisplayService } from "../../services/autocomplete-function.service";
import { AigWalletAutocompleteFilterService } from "../../services/autocomplete-filter.service";

@Component({
    selector: 'aig-merchant-new-update-form',
    templateUrl: './merchant-new-update-form.component.html',
    styleUrls: ['./merchant-new-update-form.component.scss']
})
export class AigMerchantNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
		public walletAutocompleteFilterService: AigWalletAutocompleteFilterService,
        public walletAutocompleteDisplayService: AigWalletAutocompleteDisplayService,
		private merchantService: AigMerchantService,
        private eventService: EventService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    merchant: any;

	@Input()
    wallet: any;

    isUpdate: boolean = false;

    merchantResult: any;

    merchantNewUpdateForm: FormGroup;

	filteredWallet: Observable<WalletDTO[]>;

    ngOnInit(): void {
        this.merchantNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', [Validators.required]],
            username: ['', [Validators.required]],
			password: ['', [Validators.required]],
            wallet: [this.wallet, [Validators.required, AigValidator.haveId] ],
        })
        
        if (this.merchant != null) {
            this.merchantNewUpdateForm.patchValue(this.merchant);
            this.isUpdate = true
        }

		this.filteredWallet = this.walletAutocompleteFilterService.filterWallet(this.merchantNewUpdateForm.controls['wallet'].valueChanges);
    }

    async submit() {
        if (!this.merchantNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let merchant: any = this.merchantNewUpdateForm.value;
		merchant.wallet_id = this.merchantNewUpdateForm.value.wallet.id;
        
        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.merchantService.putMerchant(merchant).toPromise();
                postOrPut = "updated";
            } else {
                await this.merchantService.postMerchant(merchant).toPromise();
                postOrPut = "created";
            }

            this.merchantResult = merchant;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newMerchant() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
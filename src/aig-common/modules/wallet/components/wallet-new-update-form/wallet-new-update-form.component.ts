import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AigValidator } from "aig-common/AigValidator";
import { EventService } from "aig-common/event-manager/event.service";
import { AigGenericAutocompleteFilterService } from "aig-common/modules/generic/services/form/autocomplete-filter.service";
import { AigGenericAutocompleteDisplayService } from "aig-common/modules/generic/services/form/autocomplete-function.service";
import { EopooDTO } from "aig-generic";
import { WalletResourceService, WalletDTO } from 'aig-wallet';
import { Observable } from "rxjs";

@Component({
    selector: 'aig-wallet-new-update-form',
    templateUrl: './wallet-new-update-form.component.html',
    styleUrls: ['./wallet-new-update-form.component.scss']
})
export class AigWalletNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
		public genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
		private walletResourceService: WalletResourceService,
        private eventService: EventService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    wallet: any;

	@Input()
    eopoo: EopooDTO;

    isUpdate: boolean = false;

    walletResult: any;

    walletNewUpdateForm: FormGroup;

	filteredEopoo: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.walletNewUpdateForm = this._formBuilder.group({
            id:[''],
			eopoo: [this.eopoo, [Validators.required, AigValidator.haveId] ],
            description: ['', [Validators.required]],
        })
        
        if (this.wallet != null) {
            this.walletNewUpdateForm.patchValue(this.wallet);
            this.isUpdate = true
        }

		this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.walletNewUpdateForm.controls['eopoo'].valueChanges);
    }

    async submit() {
        if (!this.walletNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let wallet: any = this.walletNewUpdateForm.value;
		wallet.eopooCode = this.walletNewUpdateForm.value.eopoo.id;
        
        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.walletResourceService.updateWalletUsingPUT(wallet).toPromise();
                postOrPut = "updated";
            } else {
                await this.walletResourceService.createWalletUsingPOST(wallet).toPromise();
                postOrPut = "created";
            }

            this.walletResult = wallet;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newWallet() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
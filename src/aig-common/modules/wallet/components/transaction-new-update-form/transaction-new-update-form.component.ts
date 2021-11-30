import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AigValidator } from "aig-common/AigValidator";
import { EventService } from "aig-common/event-manager/event.service";
import { CreditCardResourceService, CreditCardDTO, WalletDTO, TransactionResourceService, TransactionDTO } from 'aig-wallet';
import { Observable } from "rxjs";
import { AigWalletAutocompleteFilterService } from "../../services/autocomplete-filter.service";
import { AigWalletAutocompleteDisplayService } from "../../services/autocomplete-function.service";

@Component({
    selector: 'aig-transaction-new-update-form',
    templateUrl: './transaction-new-update-form.component.html',
    styleUrls: ['./transaction-new-update-form.component.scss']
})
export class AigTransactionNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
		private transactionResourceService: TransactionResourceService,
        private eventService: EventService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    transaction: any;


    isUpdate: boolean = false;

    transactionResult: any;

    transactionNewUpdateForm: FormGroup;

	filteredTransaction: Observable<TransactionDTO[]>;

    ngOnInit(): void {
        this.transactionNewUpdateForm = this._formBuilder.group({
            id:[''],
			creationDateTime:[''],
        })
        
        if (this.transaction != null) {
            this.transactionNewUpdateForm.patchValue(this.transaction);
            this.isUpdate = true
        }


    }

    async submit() {
        if (!this.transactionNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let transaction: any = this.transactionNewUpdateForm.value;
		
        
        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.transactionResourceService.updateTransactionUsingPUT(transaction).toPromise();
                postOrPut = "updated";
            } else {
                await this.transactionResourceService.createTransactionUsingPOST(transaction).toPromise();
                postOrPut = "created";
            }

            this.transactionResult = transaction;

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
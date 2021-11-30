import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import { AigMerchantService } from "../../services/merchant.service";

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
		private merchantService: AigMerchantService,
        private eventService: EventService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
    ) { }

    @Input()
    merchant: any;

    isUpdate: boolean = false;

    merchantResult: any;

    merchantNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.merchantNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', [Validators.required]],
            username: ['', [Validators.required]],
			password: ['', [Validators.required]],
            wallet_id: ['', [Validators.required]],
        })
        
        if (this.merchant != null) {
            this.merchantNewUpdateForm.patchValue(this.merchant);
            this.isUpdate = true
        }
    }

    async submit() {
        if (!this.merchantNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let merchant: any = this.merchantNewUpdateForm.value;
        
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
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PaymentDTO, PaymentResourceService } from 'aig-commerce';

@Component({
    selector: 'aig-payment-new-update-form',
    templateUrl: './payment-new-update-form.component.html',
    styleUrls: ['./payment-new-update-form.component.scss']
})
export class AigPaymentNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private paymentResourceService: PaymentResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    payment: PaymentDTO;

    paymentNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.paymentNewUpdateForm = this._formBuilder.group({
            id:[''],
            amount:[''],
            creditPayment:{},
            creditPaymentId:[''],
            paymentMethod:{},
            paymentMethodId:[''],
            purchase:{},
            purchaseId:[''],
            valuePaperPayment:{},
            valuePaperPaymentId:[''],

        })
        
        if (this.payment != null) {
            this.paymentNewUpdateForm.patchValue(this.payment);
        }
    }

    async submit() {
        if (!this.paymentNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let payment: PaymentDTO = this.paymentNewUpdateForm.value;

        try {
            let postOrPut;
            if (payment.id != 0) {
                await this.paymentResourceService.updatePaymentUsingPUT(payment).toPromise();
                postOrPut = "updated";
            } else {
                await this.paymentResourceService.createPaymentUsingPOST(payment).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Payment: '${payment.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newPayment() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

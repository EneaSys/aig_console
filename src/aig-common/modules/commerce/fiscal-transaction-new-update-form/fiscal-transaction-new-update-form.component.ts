import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { FiscalTransactionDTO, FiscalTransactionResourceService, WarehouseDTO, WarehouseResourceService } from 'aig-commerce';

@Component({
    selector: 'aig-fiscal-transaction-new-update-form',
    templateUrl: './fiscal-transaction-new-update-form.component.html',
    styleUrls: ['./fiscal-transaction-new-update-form.component.scss']
})
export class AigFiscalTransactionNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private fiscalTransactionResourceService: FiscalTransactionResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    fiscalTransaction: FiscalTransactionDTO;

    fiscalTransactionNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.fiscalTransactionNewUpdateForm = this._formBuilder.group({
            id:[''],
            date: [''],
            code: [''],
            amount: [''],
            seller:  [''],
            buyer:  [''],
            status:  [''],
        })
        
        if (this.fiscalTransaction != null) {
            this.fiscalTransactionNewUpdateForm.patchValue(this.fiscalTransaction);
        }
    }

    async submit() {
        if (!this.fiscalTransactionNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let fiscalTransaction: FiscalTransactionDTO = this.fiscalTransactionNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (fiscalTransaction.id != 0) {
                await this.fiscalTransactionResourceService.updateFiscalTransactionUsingPUT(fiscalTransaction).toPromise();
                postOrPut = "updated";
            } else {
                await this.fiscalTransactionResourceService.createFiscalTransactionUsingPOST(fiscalTransaction).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newFiscalTransaction() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

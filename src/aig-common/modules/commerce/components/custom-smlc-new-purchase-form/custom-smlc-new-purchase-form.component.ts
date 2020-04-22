import { Component, OnInit, Input } from '@angular/core';
import { ValidateEopooPersonRequest, ValidateApiControllerService, CityDTO } from 'aig-generic';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatStepper } from '@angular/material/stepper';
import { CustomSmlcApiControllerService, AddSmlcPurchaseTO, AddSmlcPurchaseTOValuePaperItems, SellerDTO } from 'aig-commerce';

@Component({
    selector: 'custom-smlc-new-purchase-form',
    templateUrl: './custom-smlc-new-purchase-form.component.html',
    styleUrls: ['./custom-smlc-new-purchase-form.component.scss']
})
export class AigCustomSmlcNewPurchaseFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    @Input()
    seller: SellerDTO;

    constructor(
        private validateApiControllerService: ValidateApiControllerService,
        private customSmlcApiControllerService: CustomSmlcApiControllerService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    validateCustomerAsEopooForm: FormGroup;
    fiscalReceiptForm: FormGroup;
    addPaperValueForm: FormGroup;
    totalOfValuePaperItems: number = 0;
    addSmlcPurchaseTOValuePaperItems: AddSmlcPurchaseTOValuePaperItems[] = [];

    eopooCodeBuyer: string;
    validationEopooPerson: boolean = false;

    addSmlcPurchaseTO: any;

    ngOnInit(): void {
        this.validateCustomerAsEopooForm = this._formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            date: ['', Validators.required],
        });

        this.fiscalReceiptForm = this._formBuilder.group({
            date: ['', Validators.required],
            code: ['', Validators.required],
            amount: ['', Validators.required],
        });

        this.addPaperValueForm = this._formBuilder.group({
            amount: ['', Validators.required],
            code: ['', Validators.required],
        });

    }

    async validateCustomer(matStepper: MatStepper) {
        if (!this.validateCustomerAsEopooForm.valid) {
            return;
        }
        this.validationEopooPerson = true;
        this._fuseProgressBarService.show();

        let validateEopooPersonRequest: ValidateEopooPersonRequest = {
            firstname: this.validateCustomerAsEopooForm.value.firstname,
            lastname: this.validateCustomerAsEopooForm.value.lastname,
            bornDate: "1992-07-25"
        }

        try {
            let eopooBuyers: string[] = await this.validateApiControllerService.validateEopooPerson(validateEopooPersonRequest).toPromise();
            if(eopooBuyers.length != 1) {
                throw new Error();
            }

            this.eopooCodeBuyer = eopooBuyers[0];
            matStepper.next();
        } catch(e) {
            this._snackBar.open(`Cittadino non valido: ${e.title}.`, null, { duration: 5000, });
        }
        
        this.validationEopooPerson = false;
        this._fuseProgressBarService.hide();
    }

    async addPaperValue() {
        if (!this.addPaperValueForm.valid) {
            return;
        }
        
        this.totalOfValuePaperItems = this.totalOfValuePaperItems + Number(this.addPaperValueForm.value.amount);

        this.addSmlcPurchaseTOValuePaperItems.push(this.addPaperValueForm.value);

    }

    async submitPurchase() {
        if (!this.validateCustomerAsEopooForm.valid) {
            return;
        }
        if (!this.fiscalReceiptForm.valid) {
            return;
        }
        
        this._fuseProgressBarService.show();
        this.setStep("loading");

        this.addSmlcPurchaseTO = {
            seller: this.seller.id,
            buyer: this.eopooCodeBuyer,
            "fiscal-transaction": this.fiscalReceiptForm.value,
            "value-paper-items": this.addSmlcPurchaseTOValuePaperItems
        };

        try {
            await this.customSmlcApiControllerService.customSmlcPurchasePost(this.addSmlcPurchaseTO).toPromise()
            this.eventService.reloadCurrentPage();
            this.setStep("complete");
        } catch(e) {
            this._snackBar.open(`Inserimento fallito: ${e.error.message}.`, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

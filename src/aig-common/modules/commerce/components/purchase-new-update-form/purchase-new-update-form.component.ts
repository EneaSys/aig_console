import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { BuyerDTO, PurchaseDTO, PurchaseResourceService } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';


@Component({
	selector: 'aig-purchase-new-update-form',
	templateUrl: './purchase-new-update-form.component.html',
	styleUrls: ['./purchase-new-update-form.component.scss']
})
export class AigPurchaseNewUpdateFormComponent implements OnInit {
	step: any = {
		form: true,
		loading: false,
		complete: false
	};
	constructor(
		public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
		private _fuseProgressBarService: FuseProgressBarService,
		private purchaseResourceService: PurchaseResourceService,
		private _formBuilder: FormBuilder,
		private eventService: EventService,
        private _snackBar: MatSnackBar,
	) { }

	@Input()
	purchase: PurchaseDTO;
	@Input()
	returnToParent: boolean = false; 

	@Output()
	purchaseOutput = new EventEmitter<PurchaseDTO>();

	purchaseNewUpdateForm: FormGroup;

	filteredBuyer: Observable<BuyerDTO[]>;

	isUpdate: boolean = false;



	ngOnInit(): void {
		this.purchaseNewUpdateForm = this._formBuilder.group({
			id: [''],
            amount: [''],
			buyer: ['', [Validators.required, AigValidator.haveId]],
			closed: [true],
			insertedDateTime: ['', [Validators.required]],
            statusNote: [''],
		});

		if(this.purchase != null) {
			this.purchaseNewUpdateForm.patchValue(this.purchase);
			this.isUpdate = true;
		}

		this.filteredBuyer = this.commerceAutocompleteService.filterBuyer(this.purchaseNewUpdateForm.controls['buyer'].valueChanges);
	}

	async submit() {
		if (!this.purchaseNewUpdateForm.valid) {
			return;
		}

		this._fuseProgressBarService.show();
		this.setStep("loading");

		let purchase: PurchaseDTO = {
			id: this.purchaseNewUpdateForm.value.id,
			amount: this.purchaseNewUpdateForm.value.amount,
            buyerId: this.purchaseNewUpdateForm.value.buyer.id,
            statusNote:this.purchaseNewUpdateForm.value.statusNote,
            closed: this.purchaseNewUpdateForm.value.closed,
			insertedDateTime: this.purchaseNewUpdateForm.value.insertedDateTime,
		};

		if(this.returnToParent) {
			this.purchaseOutput.emit(purchase);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut;
				if (purchase.id != 0) {
					await this.purchaseResourceService.updatePurchaseUsingPUT(purchase).toPromise();
					postOrPut = "updated";
				} else {
					await this.purchaseResourceService.createPurchaseUsingPOST(purchase).toPromise();
					postOrPut = "created";
				}
				this.eventService.reloadCurrentPage();

				this._snackBar.open(`Purchase: '${purchase.id}' ${postOrPut}.`, null, { duration: 2000, });
				this.setStep("complete");
			} catch (error) {
				this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
				this.setStep("form");
			}
		}

		this._fuseProgressBarService.hide();
	}



	newPurchase() {
		this.purchase = null;
		this.purchaseOutput.emit(this.purchase);
		this.setStep("form");
	}

	private setStep(step: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[step] = true;
	}
}

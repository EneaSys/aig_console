import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { BuyerDTO, PurchaseDTO, PurchaseResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';


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
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		private _fuseProgressBarService: FuseProgressBarService,
		private purchaseResourceService: PurchaseResourceService,
		private _formBuilder: FormBuilder,
		private eventService: EventService,
        private _snackBar: MatSnackBar,
	) { }

	@Input()
	purchase: PurchaseDTO;

	purchaseNewUpdateForm: FormGroup;


	filteredBuyer: Observable<BuyerDTO[]>;

	closed: boolean;





	ngOnInit(): void {
		this.purchaseNewUpdateForm = this._formBuilder.group({
			id: [''],
            amount: [''],
			buyer: ['', Validators.required],
			closed: [true],
			insertedDateTime: ['', Validators.required],
            statusNote: [''],
		});


		if(this.purchase != null) {
			this.purchaseNewUpdateForm.patchValue(this.purchase);
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
            buyerId: 1, //this.purchaseNewUpdateForm.value.buyer.id,
            statusNote:this.purchaseNewUpdateForm.value.statusNote,
            closed: this.purchaseNewUpdateForm.value.closed,
			insertedDateTime: this.purchaseNewUpdateForm.value.insertedDateTime,
		};

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

			this._snackBar.open(`Ipp Social: '${purchase.id}' ${postOrPut}.`, null, { duration: 2000, });
			this.setStep("complete");
		} catch (error) {
			this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
			this.setStep("form");
		}
		this._fuseProgressBarService.hide();
	}



	newPurchase() {
		this.setStep("form");
	}

	private setStep(step: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[step] = true;
	}
}

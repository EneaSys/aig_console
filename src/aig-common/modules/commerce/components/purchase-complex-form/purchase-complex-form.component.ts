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
	selector: 'aig-purchase-complex-form',
	templateUrl: './purchase-complex-form.component.html',
	styleUrls: ['./purchase-complex-form.component.scss']
})
export class AigPurchaseComplexFormComponent implements OnInit {
  	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	fourFormGroup: FormGroup;
	fiveFormGroup: FormGroup;

	step: any = {
		form: true,
		loading: false,
		complete: false
	};
	
	constructor(
		private _formBuilder: FormBuilder,
		private _fuseProgressBarService: FuseProgressBarService,
		private _snackBar: MatSnackBar,
		private eventService: EventService,
		private purchaseResourceService: PurchaseResourceService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		public 	autocompleteDisplayService: AigAutocompleteDisplayService,
		
	) { }

	purchaseNewUpdateForm: FormGroup;


	purchaseDetailFormGroup: FormGroup;
	filteredBuyer: Observable<BuyerDTO[]>;

	warehouseQuestionFormGroup: FormGroup;
	
	warehouseHandlingFormGroup: FormGroup;

	ngOnInit(): void { 

		this.purchaseDetailFormGroup = this._formBuilder.group({
			buyer: ['', [Validators.required]],
			insertedDataTime: ['', Validators.required],
			statusNote: [''],
		});

		this.filteredBuyer = this.commerceAutocompleteService.filterBuyer(this.purchaseDetailFormGroup.controls['buyer'].valueChanges);
	



		this.warehouseQuestionFormGroup = this._formBuilder.group({
			warehouseHandlingQuestion: ['', Validators.required],
		});
		this.warehouseHandlingFormGroup = this._formBuilder.group({
			insertedDataTime: ['', Validators.required]
		});
		this.fourFormGroup = this._formBuilder.group({
			statusNote: ['', Validators.required]
		});
		this.fiveFormGroup = this._formBuilder.group({
			buyer: ['', Validators.required]
		});



		
		
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
			buyer: this.purchaseNewUpdateForm.value.buyer,
			closed: this.purchaseNewUpdateForm.value.closed,
			insertedDateTime: this.purchaseNewUpdateForm.value.insertedDateTime,
			statusNote:this.purchaseNewUpdateForm.value.statusNote,
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

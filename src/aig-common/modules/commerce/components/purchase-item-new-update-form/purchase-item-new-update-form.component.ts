import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import {InventoryItemCombinationDTO, PurchaseDTO, PurchaseItemDTO, PurchaseItemResourceService, WarehouseHandlingItemDTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

@Component({
	selector: 'aig-purchase-item-new-update-form',
	templateUrl: './purchase-item-new-update-form.component.html',
	styleUrls: ['./purchase-item-new-update-form.component.scss']
})
export class AigPurchaseItemNewUpdateFormComponent implements OnInit {
	step: any = {
		form: true,
		loading: false,
		complete: false
	};
	constructor(
		public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
		private _fuseProgressBarService: FuseProgressBarService,
		private purchaseItemResourceService: PurchaseItemResourceService,
		private _formBuilder: FormBuilder,
		private eventService: EventService,
        private _snackBar: MatSnackBar,
	) { }

	@Input()
	purchaseItem: PurchaseItemDTO;

	@Input()
	purchase: PurchaseDTO;

	@Input()
	returnToParent: boolean = false; 	
	@Output()
	purchaseItemOutput = new EventEmitter<PurchaseItemDTO>();

	@Input()
	continueInsertion: boolean = false;

	isUpdate: boolean = false;

	purchaseItemNewUpdateForm: FormGroup;

	filteredInventoryItemCombination: Observable<InventoryItemCombinationDTO[]>;
	filteredPurchase: Observable<PurchaseDTO[]>;
	filteredWarehouseHandligItem: Observable<WarehouseHandlingItemDTO[]>;





	ngOnInit(): void {
		this.purchaseItemNewUpdateForm = this._formBuilder.group({
			id: [''],
            quantity: ['', [Validators.required]],
            price: ['', [Validators.required]],
            tax: [''],
            purchase: [this.purchase],
            warehouseHandlingItem: [''],
            inventoryItemCombination: [''],
		});


		if(this.purchaseItem != null) {
			this.purchaseItemNewUpdateForm.patchValue(this.purchaseItem);
			this.isUpdate = true
		}

		this.filteredInventoryItemCombination = this.commerceAutocompleteService.filterInventoryItemCombination(this.purchaseItemNewUpdateForm.controls['inventoryItemCombination'].valueChanges);
		this.filteredPurchase = this.commerceAutocompleteService.filterPurchase(this.purchaseItemNewUpdateForm.controls['purchase'].valueChanges);
		this.filteredWarehouseHandligItem = this.commerceAutocompleteService.filterWarehouseHandlingItem(this.purchaseItemNewUpdateForm.controls['warehouseHandlingItem'].valueChanges);
	}

	async submit() {
		if (!this.purchaseItemNewUpdateForm.valid) {
			return;
		}

		this._fuseProgressBarService.show();
		this.setStep("loading");


		let purchaseItem: PurchaseItemDTO = this.purchaseItemNewUpdateForm.value;
		purchaseItem.purchaseId = this.purchaseItemNewUpdateForm.value.purchase.id;
		purchaseItem.inventoryItemCombinationId = this.purchaseItemNewUpdateForm.value.inventoryItemCombination.id;
		purchaseItem.warehouseHandlingItemId = this.purchaseItemNewUpdateForm.value.warehouseHandlingItem.id;
		
		if(this.returnToParent) {
			this.purchaseItemOutput.emit(purchaseItem);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut;
				if (purchaseItem.id != 0) {
					await this.purchaseItemResourceService.updatePurchaseItemUsingPUT(purchaseItem).toPromise();
					postOrPut = "updated";
				} else {
					await this.purchaseItemResourceService.createPurchaseItemUsingPOST(purchaseItem).toPromise();
					postOrPut = "created";
				}
				this.eventService.reloadCurrentPage();

				this._snackBar.open(`Ipp Social: '${purchaseItem.id}' ${postOrPut}.`, null, { duration: 2000, });
				this.setStep("complete");
			} catch (error) {
				this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
				this.setStep("form");
			}
		}

		if(this.continueInsertion) {
			this.setStep("form");
		}

		this._fuseProgressBarService.hide();
	}



	newPurchaseItem() {
		this.purchaseItem = null;
		this.purchaseItemOutput.emit(this.purchaseItem);
		this.setStep("form");
	}

	private setStep(step: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[step] = true;
	}
}

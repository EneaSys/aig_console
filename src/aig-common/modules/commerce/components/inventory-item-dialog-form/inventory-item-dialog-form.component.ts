import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryCategoryDTO, InventoryItemDTO, InventoryItemResourceService, ProducerDTO } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

@Component({
	selector: 'aig-inventory-item-dialog-form',
	templateUrl: './inventory-item-dialog-form.component.html',
	styleUrls: ['./inventory-item-dialog-form.component.scss']
})
export class AigInventoryItemDialogFormComponent implements OnInit {
	step: any = {
		form: true,
		loading: false,
		complete: false
	};
	constructor(
		public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
		private _fuseProgressBarService: FuseProgressBarService,
		private inventoryItemResourceService: InventoryItemResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private eventService: EventService,
	) { }

	@Input()
	inventoryItem: InventoryItemDTO;

	@Input()
	inventoryCategory: InventoryCategoryDTO;

	@Input()
	producer: ProducerDTO;

	isUpdate: boolean = false;

	inventoryItemResult: any;

	inventoryItemNewUpdateForm: FormGroup;

	filteredProducers: Observable<ProducerDTO[]>;
	filteredInventoryCategories: Observable<InventoryCategoryDTO[]>;

	ngOnInit(): void {
		this.inventoryItemNewUpdateForm = this._formBuilder.group({
			id: [''],
			name: ['', [Validators.required]],
			itemCode: [''],
			producer: [this.producer, [Validators.required, AigValidator.haveId]],
			inventoryCategory: [this.inventoryCategory, [Validators.required, AigValidator.haveId]],
		});

		if (this.inventoryItem != null && this.inventoryItem.id != null) {
			this.inventoryItemNewUpdateForm.patchValue(this.inventoryItem);
			this.isUpdate = true;
		}

		if (this.inventoryItem != null && this.inventoryItem.id != null && this.inventoryCategory) {
			this.inventoryItemNewUpdateForm.patchValue(this.inventoryItem);
			this.inventoryItemNewUpdateForm.controls.inventoryCategory.setValue(this.inventoryCategory);
			this.isUpdate = true;
		}

		if (this.producer) {
			this.inventoryItemNewUpdateForm.controls.producer.setValue(this.producer);
		}

		this.filteredProducers = this.commerceAutocompleteService.filterProducer(this.inventoryItemNewUpdateForm.controls['producer'].valueChanges);
		this.filteredInventoryCategories = this.commerceAutocompleteService.filterInventoryCategory(this.inventoryItemNewUpdateForm.controls['inventoryCategory'].valueChanges);
	}

	async submit() {
		if (!this.inventoryItemNewUpdateForm.valid) {
			return;
		}

		this._fuseProgressBarService.show();
		this.setStep("loading");

		let inventoryItem: InventoryItemDTO = this.inventoryItemNewUpdateForm.value;
		inventoryItem.producerId = this.inventoryItemNewUpdateForm.value.producer.id;
		inventoryItem.inventoryCategoryId = this.inventoryItemNewUpdateForm.value.inventoryCategory.id;

		try {
			let postOrPut: string;
			
			if (this.isUpdate) {
				await this.inventoryItemResourceService.updateInventoryItemUsingPUT(inventoryItem).toPromise();
				postOrPut = "updated";
			} else {
				await this.inventoryItemResourceService.createInventoryItemUsingPOST(inventoryItem).toPromise();
				postOrPut = "created";
			}

			this.inventoryItemResult = inventoryItem;

			this.eventService.reloadCurrentPage();

			this.setStep("complete");
			
		} catch (e) {
			this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
			this.setStep("form");
		}

		this._fuseProgressBarService.hide();
	}

	newInventoryItem() {
		this.setStep("form");
	}

	private setStep(stepToShow: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[stepToShow] = true;
	}
}
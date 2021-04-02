import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PurchaseDTO, PurchaseItemDTO, WarehouseHandlingDTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { cloneDeep } from 'lodash';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';

@Component({
	selector: 'aig-purchase-complex-form',
	templateUrl: './purchase-complex-form.component.html',
	styleUrls: ['./purchase-complex-form.component.scss']
})
export class AigPurchaseComplexFormComponent implements OnInit {
	constructor(
		private _formBuilder: FormBuilder,
		private _fuseProgressBarService: FuseProgressBarService,
		private _snackBar: MatSnackBar,
		private eventService: EventService,
		public 	autocompleteDisplayService: AigAutocompleteDisplayService,
		
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

	purchaseIsCompleted: boolean = false;
	warehouseHandlingIsCompleted: boolean = false;


	askWarehouseCreationFormGroup: FormGroup;

	ngOnInit(): void { 
		this.askWarehouseCreationFormGroup = this._formBuilder.group({
			create: ['', Validators.required],
		});


	}

	purchase: PurchaseDTO;
	purchaseOutput($event: PurchaseDTO){
		this.purchase = $event;

		if (!this.purchase) {
			this.purchaseIsCompleted = false;
			return;
		}
		this.purchaseIsCompleted = true;
	}

	warehouseHandling: WarehouseHandlingDTO;
	warehouseHandlingOutput($event: WarehouseHandlingDTO) {
		this.warehouseHandling = $event;

		if (!this.warehouseHandling) {
			this.warehouseHandlingIsCompleted = false;
			return;
		}
		this.warehouseHandlingIsCompleted = true;
	}

	purchaseItemList: PurchaseItemDTO[] = [];
	addPurchaseItem(purchaseItem: PurchaseItemDTO) {
		let purchaseItemList = cloneDeep(this.purchaseItemList);
		purchaseItemList.push(purchaseItem);
		this.purchaseItemList = purchaseItemList;
	}


	async insertComplexPurchase() {
		this._fuseProgressBarService.show();
		this.setStep("loading");
		
		let complexPurchase: any = {
			purchase: this.purchase,
			purchaseItems: this.purchaseItemList,
			warehouseHandling: this.warehouseHandling
		};

		try {
			console.log(complexPurchase);
			let returned: any = "" //Chiama il server
			this.eventService.reloadCurrentPage();

			this._snackBar.open(`Purhase inserted: '${returned.id}'.`, null, { duration: 2000, });
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

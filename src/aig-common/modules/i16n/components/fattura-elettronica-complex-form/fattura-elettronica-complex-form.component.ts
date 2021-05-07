import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PurchaseDTO, PurchaseItemDTO, WarehouseHandlingDTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { cloneDeep } from 'lodash';


@Component({
	selector: 'aig-fattura-elettronica-complex-form',
	templateUrl: './fattura-elettronica-complex-form.component.html',
	styleUrls: ['./fattura-elettronica-complex-form.component.scss']
})
export class AigFatturaElettronicaFormComponent implements OnInit {
	constructor(
		private _formBuilder: FormBuilder,
		private _fuseProgressBarService: FuseProgressBarService,
		private _snackBar: MatSnackBar,
		private eventService: EventService,
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};
    value : string;

	fatturaElettronicaIsCompleted: boolean = false;
	warehouseHandlingIsCompleted: boolean = false;


	askWarehouseCreationFormGroup: FormGroup;

	ngOnInit(): void { 
		this.askWarehouseCreationFormGroup = this._formBuilder.group({
			create: ['', Validators.required],
		});


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

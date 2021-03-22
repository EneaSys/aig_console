import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { InventoryItemCombinationDTO, WarehouseDTO, WarehouseHandlingDTO, WarehouseHandlingItemDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';
import { Observable } from 'rxjs';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { cloneDeep } from 'lodash';


@Component({
    selector: 'aig-warehouse-handling-form-complex',
    templateUrl: './warehouse-handling-form-complex.component.html',
    styleUrls: ['./warehouse-handling-form-complex.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})
export class AigWarehouseHandlingFormComplexComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        public autocompleteDisplayService: AigAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,
        private eventService: EventService,
        private commerceAutocompleteService: AigCommerceAutocompleteService,
    ) { }

    warehouseHandling: WarehouseHandlingDTO;

	warehouseHandlingIsCompleted: boolean = false;

	warehouseHandlingItemDTOs: any[] = [];

    filteredWarehouseToLoad: Observable<WarehouseDTO[]>;
    filteredWarehouseToUnload: Observable<WarehouseDTO[]>;
    filteredInventoryItem: Observable<InventoryItemCombinationDTO[]>;

    

    
    dateRequirementIsCompleted = false;
    quantityItemCombinationRequirementIsCompleted = false;

    warehouseHandlingNewUpdateForm: FormGroup;
    isLinear = false;
    handlingTypeFormGroup: FormGroup;
    warehouseDateFormGroup: FormGroup;
    dateFormGroup: FormGroup;
    quantityInventoryItemCombinationFormGroup: FormGroup;


    ngOnInit(): void {

        this.handlingTypeFormGroup = this._formBuilder.group({
            id: [""],
            handlingType: ['', Validators.required]
        });
        this.warehouseDateFormGroup = this._formBuilder.group({
            warehouseLoad: [''],
            warehouseUnload: [''],
            date: ['', Validators.required]
        });
        this.dateFormGroup = this._formBuilder.group({
            date: ['', Validators.required]
        });
        this.quantityInventoryItemCombinationFormGroup = this._formBuilder.group({
            quantity: ['', Validators.required],
            inventoryItemCombination: ['', Validators.required],
        })

        this.filteredWarehouseToLoad = this.commerceAutocompleteService.filterWarehouse(this.warehouseDateFormGroup.controls['warehouseLoad'].valueChanges);
        this.filteredWarehouseToUnload = this.commerceAutocompleteService.filterWarehouse(this.warehouseDateFormGroup.controls['warehouseUnload'].valueChanges);
        this.filteredInventoryItem = this.commerceAutocompleteService.filterInventoryItem(this.quantityInventoryItemCombinationFormGroup.controls['inventoryItemCombination'].valueChanges);
    }

	checkStep1(stepper: any) {
		if( !(this.warehouseHandling && this.warehouseHandling.warehouseHandlingType) ) {
			//error
			return;
		}

		this.warehouseHandlingIsCompleted = true;
		setTimeout(() => { stepper.next(); }, 1);
	}

	addIn(warehouseHandlingItemDTO: WarehouseHandlingItemDTO) {
		let warehouseHandlingItemDTOs = cloneDeep(this.warehouseHandlingItemDTOs);
		warehouseHandlingItemDTOs.push(warehouseHandlingItemDTO);
		this.warehouseHandlingItemDTOs = warehouseHandlingItemDTOs;
	}
	


    //CHECK DATE
    dateRequirementError;
    checkDateRequirement(stepper): void {
        let dateValue = this.warehouseDateFormGroup.controls.date.value;
        this.dateRequirementIsCompleted = false;

        if (dateValue == "") {
            this.dateRequirementError = "Selezionare una data!";
            return
        } else {
            this.dateRequirementIsCompleted = true;
        }
        setTimeout(() => stepper.next(), 1);
    }

    //CHECK QUANTITY AND ITEM COMBINATION
    quantityItemCombinationRequirementError;
    checkQuantityItemCombinationRequirement(stepper): void {
        let quantityValue = this.quantityInventoryItemCombinationFormGroup.controls.quantity.value;
        let itemCombinationValue = this.quantityInventoryItemCombinationFormGroup.controls.inventoryItemCombination.value;
        this.quantityItemCombinationRequirementIsCompleted = false;

        if (quantityValue == "" || itemCombinationValue == "") {
            this.quantityItemCombinationRequirementError = "Riempire i campi richiesti!";
            return
        } else {
            this.quantityItemCombinationRequirementIsCompleted = true;
        }
        setTimeout(() => stepper.next(), 1);
    }




    async confirmation() {

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehouseHandling: WarehouseHandlingDTO = {
            id: this.handlingTypeFormGroup.controls.id.value,
            warehouseHandlingType: this.handlingTypeFormGroup.controls.handlingType.value,
            date: this.dateFormGroup.controls.date.value,
        }

        switch (this.handlingTypeFormGroup.controls.handlingType.value) {
            case 'LOAD':
                warehouseHandling.warehouseToLoadId = this.warehouseDateFormGroup.controls.warehouseLoad.value.id;
				warehouseHandling.warehouseToLoad = this.warehouseDateFormGroup.controls.warehouseLoad.value;
                break;
            case 'UNLOAD':
                warehouseHandling.warehouseToUnloadId = this.warehouseDateFormGroup.controls.warehouseUnload.value.id;
				warehouseHandling.warehouseToUnload = this.warehouseDateFormGroup.controls.warehouseUnload.value;
                break;
            case 'SHIFT':
                warehouseHandling.warehouseToLoadId = this.warehouseDateFormGroup.controls.warehouseLoad.value.id;
				warehouseHandling.warehouseToLoad = this.warehouseDateFormGroup.controls.warehouseLoad.value;

                warehouseHandling.warehouseToUnloadId = this.warehouseDateFormGroup.controls.warehouseUnload.value.id;
				warehouseHandling.warehouseToUnload = this.warehouseDateFormGroup.controls.warehouseUnload.value;
                break;
        }
        try {
            let postOrPut;
            if (warehouseHandling.id != 0) {
                await this.warehouseHandlingResourceService.updateWarehouseHandlingUsingPUT(warehouseHandling).toPromise();
                postOrPut = "updated";
            } else {
                await this.warehouseHandlingResourceService.createWarehouseHandlingUsingPOST(warehouseHandling).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Warehouse Handling: '${warehouseHandling.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newWarehouseHandling() {
        this.setStep("form");
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { InventoryItemCombinationDTO, WarehouseDTO, WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';
import { Observable } from 'rxjs';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@Component({
    selector: 'aig-warehouse-handling-new-update-form',
    templateUrl: './warehouse-handling-new-update-form.component.html',
    styleUrls: ['./warehouse-handling-new-update-form.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})
export class AigWarehouseHandlingNewUpdateFormComponent implements OnInit {
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

    @Input()
    warehouseHandling: WarehouseHandlingDTO;

    filteredWarehouseToLoad: Observable<WarehouseDTO[]>;
    filteredWarehouseToUnload: Observable<WarehouseDTO[]>;
    filteredInventoryItem: Observable<InventoryItemCombinationDTO[]>;

    handlingTypeRequirementIsCompleted = false;
    dateRequirementIsCompleted = false;
    quantityItemCombinationRequirementIsCompleted = false;

    warehouseHandlingNewUpdateForm: FormGroup;
    isLinear = false;
    handlingTypeFormGroup: FormGroup;
    warehouseFormGroup: FormGroup;
    dateFormGroup: FormGroup;
    quantityInventoryItemCombinationFormGroup: FormGroup;


    ngOnInit(): void {

        this.handlingTypeFormGroup = this._formBuilder.group({
            id: [""],
            handlingType: ['', Validators.required]
        });
        this.warehouseFormGroup = this._formBuilder.group({
            warehouseLoad: ['',],
            warehouseUnload: ['',]
        });
        this.dateFormGroup = this._formBuilder.group({
            date: ['', Validators.required]
        });
        this.quantityInventoryItemCombinationFormGroup = this._formBuilder.group({
            quantity: ['', Validators.required],
            inventoryItemCombination: ['', Validators.required],
        })




        this.filteredWarehouseToLoad = this.commerceAutocompleteService.filterWarehouse(this.warehouseFormGroup.controls['warehouseLoad'].valueChanges);
        this.filteredWarehouseToUnload = this.commerceAutocompleteService.filterWarehouse(this.warehouseFormGroup.controls['warehouseUnload'].valueChanges);
        this.filteredInventoryItem = this.commerceAutocompleteService.filterInventoryItem(this.quantityInventoryItemCombinationFormGroup.controls['inventoryItemCombination'].valueChanges);
        
        if (this.warehouseHandling != null) {

            this.handlingTypeFormGroup.controls.handlingType.value.patchValue(this.warehouseHandling.warehouseHandlingType);
            this.warehouseFormGroup.controls.warehouseLoad.value.patchValue(this.warehouseHandling.warehouseToLoadName);
            this.warehouseFormGroup.controls.warehouseUnload.value.patchValue(this.warehouseHandling.warehouseToUnloadName);
            this.dateFormGroup.controls.date.value.patchValue(this.warehouseHandling.date);
        }
    }


    // CHECK FORM

    //CHECK HANDLING TYPE
    handlingTypeRequirementError;
    checkHandlingTypeRequirement($event): void {
        let handlingTypeValue = this.handlingTypeFormGroup.controls.handlingType.value;
        this.handlingTypeRequirementIsCompleted = false;

        if ($event != null) {
            handlingTypeValue = $event.value;
        }

        switch (handlingTypeValue) {
            case '1': case '2': case '3':
                this.handlingTypeRequirementIsCompleted = true;
                this.handlingTypeRequirementError = "";
                break;
            default:
                this.handlingTypeRequirementError = "Selezionare movimento!";
                break;
        }
    }
    checkAndGoHandlingTypeRequirement(stepper): void {
        this.checkHandlingTypeRequirement(null);

        if (this.handlingTypeRequirementIsCompleted) {
            setTimeout(() => stepper.next(), 1);
        }
    }

    //CHECK DATE
    dateRequirementError;
    checkDateRequirement(stepper): void {
        let dateValue = this.dateFormGroup.controls.date.value;
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


    addQuantityItemCombination() {

    }


    async confirmation() {

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehouseHandling: WarehouseHandlingDTO = {
            id: this.handlingTypeFormGroup.controls.id.value,
            warehouseHandlingType: this.handlingTypeFormGroup.controls.handlingType.value,
            date: this.dateFormGroup.controls.date.value,
            warehouseToLoadName: this.warehouseFormGroup.controls.warehouseLoad.value,
            warehouseToUnloadName: this.warehouseFormGroup.controls.warehouseUnload.value,
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

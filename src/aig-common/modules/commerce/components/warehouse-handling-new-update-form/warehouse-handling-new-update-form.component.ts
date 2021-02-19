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

    warehouseHandlingItemDTOs: WarehouseHandlingItemDTO[] = [];

    handlingTypeRequirementIsCompleted = false;
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

        if (this.warehouseHandling != null) {

            this.handlingTypeFormGroup.controls.handlingType.patchValue(this.warehouseHandling.warehouseHandlingType);
            this.warehouseDateFormGroup.controls.warehouseLoad.patchValue(this.warehouseHandling.warehouseToLoadName);
            this.warehouseDateFormGroup.controls.warehouseUnload.patchValue(this.warehouseHandling.warehouseToUnloadName);
            this.dateFormGroup.controls.date.patchValue(this.warehouseHandling.date);
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
            case 'LOAD': case 'SHIFT': case 'UNLOAD':
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


    addQuantityItemCombination() {
        this.warehouseHandlingItemDTOs.push(this.quantityInventoryItemCombinationFormGroup.controls.inventoryItemCombination.value);
        console.log(this.warehouseHandlingItemDTOs);
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
                break;
            case 'UNLOAD':
                warehouseHandling.warehouseToUnloadId = this.warehouseDateFormGroup.controls.warehouseUnload.value.id;
                break;
            case 'SHIFT':
                warehouseHandling.warehouseToLoadId = this.warehouseDateFormGroup.controls.warehouseLoad.value.id;
                warehouseHandling.warehouseToUnloadId = this.warehouseDateFormGroup.controls.warehouseUnload.value.id;
                break;

            default:

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

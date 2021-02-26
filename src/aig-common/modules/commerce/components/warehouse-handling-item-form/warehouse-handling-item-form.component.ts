import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemCombinationDTO, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-warehouse-handling-item-form',
    templateUrl: './warehouse-handling-item-form.component.html',
    styleUrls: ['./warehouse-handling-item-form.component.scss']
})
export class AigWarehouseHandlingItemFormComponent implements OnInit {
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
        private warehouseHandlingItemResourceService: WarehouseHandlingItemResourceService,
        private eventService: EventService,
        private commerceAutocompleteService: AigCommerceAutocompleteService,
    ) { }

    @Input()
    warehouseHandlingItem: WarehouseHandlingItemDTO;

    filteredInventoryItem: Observable<InventoryItemCombinationDTO[]>;

    quantityInventoryItemCombinationFormGroup: FormGroup;


    ngOnInit(): void {
        this.quantityInventoryItemCombinationFormGroup = this._formBuilder.group({
            quantity: ['', Validators.required],
            inventoryItemCombination: ['', Validators.required],
        })

        this.filteredInventoryItem = this.commerceAutocompleteService.filterInventoryItem(this.quantityInventoryItemCombinationFormGroup.controls['inventoryItemCombination'].valueChanges);

        if (this.warehouseHandlingItem != null) {
            this.quantityInventoryItemCombinationFormGroup.patchValue(this.warehouseHandlingItem);
        }
    }

    async submit() {
        if (!this.quantityInventoryItemCombinationFormGroup.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehouseHandlingItem: WarehouseHandlingItemDTO = this.quantityInventoryItemCombinationFormGroup.value;

        try {
            let postOrPut;
            if (warehouseHandlingItem.id != 0) {
                await this.warehouseHandlingItemResourceService.updateWarehouseHandlingItemUsingPUT(warehouseHandlingItem).toPromise();
                postOrPut = "updated";
            } else {
                await this.warehouseHandlingItemResourceService.createWarehouseHandlingItemUsingPOST(warehouseHandlingItem).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Warehouse Handling Item: '${warehouseHandlingItem.inventoryName}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newProducer() {
        this.setStep("form");
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

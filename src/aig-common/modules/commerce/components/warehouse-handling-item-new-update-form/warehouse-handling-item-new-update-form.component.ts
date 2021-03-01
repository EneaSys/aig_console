import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { InventoryItemCombinationDTO, WarehouseHandlingDTO, WarehouseHandlingItemDTO, WarehouseHandlingItemResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'aig-warehouse-handling-item-new-update-form',
    templateUrl: './warehouse-handling-item-new-update-form.component.html',
    styleUrls: ['./warehouse-handling-item-new-update-form.component.scss']
})
export class AigWarehouseHandlingItemNewUpdateFormComponent implements OnInit {
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

    filteredWarehouseHandling: Observable<WarehouseHandlingDTO[]>;

    warehouseHandlingItemNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.warehouseHandlingItemNewUpdateForm = this._formBuilder.group({
            id:[''],
            quantity: ['', Validators.required],
            inventoryItemCombination: ['', Validators.required],
            warehouseHandlingDate: [''],
            warehouseHandling: ['', Validators.required],

        })

        this.filteredInventoryItem = this.commerceAutocompleteService.filterInventoryItemCombination(this.warehouseHandlingItemNewUpdateForm.controls['inventoryItemCombination'].valueChanges);
        
        this.filteredWarehouseHandling = this.commerceAutocompleteService.filterWarehouseHandling(this.warehouseHandlingItemNewUpdateForm.controls['warehouseHandlingDate'].valueChanges);

        if (this.warehouseHandlingItem != null) {
            this.warehouseHandlingItemNewUpdateForm.patchValue(this.warehouseHandlingItem);
        }
    }

    async submit() {
        if (!this.warehouseHandlingItemNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehouseHandlingItem: WarehouseHandlingItemDTO = {
            id:this.warehouseHandlingItemNewUpdateForm.value.id,
            quantity : this.warehouseHandlingItemNewUpdateForm.value.quantity,
            inventoryItemCombinationId: this.warehouseHandlingItemNewUpdateForm.value.inventoryItemCombination.id,
            warehouseHandlingId: this.warehouseHandlingItemNewUpdateForm.value.warehouseHandling.id,
        }

        try {
            let postOrPut: string;

            if (warehouseHandlingItem.id != 0) {
                await this.warehouseHandlingItemResourceService.updateWarehouseHandlingItemUsingPUT(warehouseHandlingItem).toPromise();
                postOrPut = "updated";
            } else {
                await this.warehouseHandlingItemResourceService.createWarehouseHandlingItemUsingPOST(warehouseHandlingItem).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newWarehouse() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

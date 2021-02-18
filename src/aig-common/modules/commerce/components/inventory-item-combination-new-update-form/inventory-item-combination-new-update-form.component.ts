import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService, InventoryItemDTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-inventory-item-combination-new-update-form',
    templateUrl: './inventory-item-combination-new-update-form.component.html',
    styleUrls: ['./inventory-item-combination-new-update-form.component.scss']
})
export class AigInventoryItemCombinationNewUpdateFormComponent implements OnInit {
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
        private commerceAutocompleteService: AigCommerceAutocompleteService,
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    inventoryItemCombination: InventoryItemCombinationDTO;

    inventoryItemCombinationNewUpdateForm: FormGroup;

    filteredInventoryItems: Observable<InventoryItemDTO[]>;

    ngOnInit(): void { 
        this.inventoryItemCombinationNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            combinationCode: [''],
            inventoryItem: ['', Validators.required],
        })

        if (this.inventoryItemCombination != null) {
            this.inventoryItemCombinationNewUpdateForm.patchValue(this.inventoryItemCombination);
        }

        this.filteredInventoryItems = this.commerceAutocompleteService.filterInventoryItem(this.inventoryItemCombinationNewUpdateForm.controls['inventoryItem'].valueChanges);
    }

    async submit() {
        if (!this.inventoryItemCombinationNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let inventoryItemCombination: InventoryItemCombinationDTO = {
            id: this.inventoryItemCombinationNewUpdateForm.value.id,
            name: this.inventoryItemCombinationNewUpdateForm.value.name,
            combinationCode: this.inventoryItemCombinationNewUpdateForm.value.combinationCode,
            inventoryItemId: this.inventoryItemCombinationNewUpdateForm.value.inventoryItem.id,
        }

        try {
            let postOrPut;
            if (inventoryItemCombination.id != 0) {
                await this.inventoryItemCombinationResourceService.updateInventoryItemCombinationUsingPUT(inventoryItemCombination).toPromise();
                postOrPut = "updated";
            } else {
                await this.inventoryItemCombinationResourceService.createInventoryItemCombinationUsingPOST(inventoryItemCombination).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Inventory Item Combination: '${inventoryItemCombination.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newInventoryItemCombination() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
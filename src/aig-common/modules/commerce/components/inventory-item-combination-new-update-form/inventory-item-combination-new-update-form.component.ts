import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemCombinationDTO, InventoryItemCombinationResourceService, InventoryItemDTO } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

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
        public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
        private inventoryItemCombinationResourceService: InventoryItemCombinationResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    inventoryItemCombination: InventoryItemCombinationDTO;

    @Input()
    inventoryItem: InventoryItemDTO;

    isUpdate: boolean = false;

    inventoryItemCombinationResult: any;

    inventoryItemCombinationNewUpdateForm: FormGroup;

    filteredInventoryItems: Observable<InventoryItemDTO[]>;

    ngOnInit(): void { 
        this.inventoryItemCombinationNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', [Validators.required]],
            combinationCode: [''],
            inventoryItem: ['', [Validators.required, AigValidator.haveId]],
        })

        if (this.inventoryItemCombination != null && this.inventoryItemCombination.id != null) {
            this.inventoryItemCombinationNewUpdateForm.patchValue(this.inventoryItemCombination);
            this.isUpdate = true;
        }

        if(this.inventoryItem != null){
            this.inventoryItemCombinationNewUpdateForm.controls['inventoryItem'].patchValue(this.inventoryItem); 
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
            let postOrPut: string;
            if (this.isUpdate) {
                await this.inventoryItemCombinationResourceService.updateInventoryItemCombinationUsingPUT(inventoryItemCombination).toPromise();
                postOrPut = "updated";
            } else {
                await this.inventoryItemCombinationResourceService.createInventoryItemCombinationUsingPOST(inventoryItemCombination).toPromise();
                postOrPut = "created";
            }

            this.inventoryItemCombinationResult = inventoryItemCombination;

            this.eventService.reloadCurrentPage();

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

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
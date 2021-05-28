import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-inventory-category-new-update-form',
    templateUrl: './inventory-category-new-update-form.component.html',
    styleUrls: ['./inventory-category-new-update-form.component.scss']
})
export class AigInventoryCategoryNewUpdateFormComponent implements OnInit {
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
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    inventoryCategory: InventoryCategoryDTO;

    isUpdate: boolean = false;

    inventoryCategoryResult: any;

    inventoryCategoryNewUpdateForm: FormGroup;

    filteredParentCategory: Observable<InventoryCategoryDTO[]>;

    ngOnInit(): void { 
        this.inventoryCategoryNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', [Validators.required]],
            parent: [''],
        })
        
        if (this.inventoryCategory != null && this.inventoryCategory.id != null) {
            this.inventoryCategoryNewUpdateForm.patchValue(this.inventoryCategory);
            this.inventoryCategoryNewUpdateForm.controls.parent.setValue(this.inventoryCategory.inventoryCategory);
            this.isUpdate = true
        }

        this.filteredParentCategory = this.commerceAutocompleteService.filterInventoryCategory(this.inventoryCategoryNewUpdateForm.controls['parent'].valueChanges);
    }

    async submit() {
        if (!this.inventoryCategoryNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let inventoryCategory: InventoryCategoryDTO = {
            id: this.inventoryCategoryNewUpdateForm.value.id,
            name: this.inventoryCategoryNewUpdateForm.value.name,
            inventoryCategoryId: this.inventoryCategoryNewUpdateForm.value.parent.id,
        }

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.inventoryCategoryResourceService.updateInventoryCategoryUsingPUT(inventoryCategory).toPromise();
                postOrPut = "updated";
            } else {
                await this.inventoryCategoryResourceService.createInventoryCategoryUsingPOST(inventoryCategory).toPromise();
                postOrPut = "created";
            }

            this.inventoryCategoryResult = inventoryCategory;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newInventoryCategory() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
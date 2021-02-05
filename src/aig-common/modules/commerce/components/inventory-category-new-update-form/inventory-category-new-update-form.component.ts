import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryCategoryDTO, InventoryCategoryResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';

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
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private inventoryCategoryResourceService: InventoryCategoryResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    inventoryCategory: InventoryCategoryDTO;

    inventoryCategoryNewUpdateForm: FormGroup;

    ngOnInit(): void { 
        this.inventoryCategoryNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
        })
        
        if (this.inventoryCategory != null) {
            this.inventoryCategoryNewUpdateForm.patchValue(this.inventoryCategory);
        }
    }

    async submit() {
        if (!this.inventoryCategoryNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let inventoryCategory: InventoryCategoryDTO = this.inventoryCategoryNewUpdateForm.value;

        try {
            let postOrPut;
            if (inventoryCategory.id != 0) {
                await this.inventoryCategoryResourceService.updateInventoryCategoryUsingPUT(inventoryCategory).toPromise();
                postOrPut = "updated";
            } else {
                await this.inventoryCategoryResourceService.createInventoryCategoryUsingPOST(inventoryCategory).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Inventory Category: '${inventoryCategory.name}' ${postOrPut}.`, null, { duration: 2000, });
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

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
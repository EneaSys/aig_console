import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { InventoryItemDTO, InventoryItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-inventory-item-dialog-form',
    templateUrl: './inventory-item-dialog-form.component.html',
    styleUrls: ['./inventory-item-dialog-form.component.scss']
})
export class AigInventoryItemDialogFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private inventoryItemResourceService: InventoryItemResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    inventoryItem: InventoryItemDTO;

    inventoryItemNewUpdateForm: FormGroup;
    

    ngOnInit(): void { 
        this.inventoryItemNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            inventoryCategoryId:[''],
            inventoryCategoryName: [''],
            producerId: [''],
            producerName:[''],
        })
        if (this.inventoryItem != null) {
            this.inventoryItemNewUpdateForm.patchValue(this.inventoryItem);
        }
    }

    async submit() {
        if (!this.inventoryItemNewUpdateForm.valid) {
            return;
            }
        this._fuseProgressBarService.show();
            this.setStep("loading");
    
        let inventoryItem: InventoryItemDTO = this.inventoryItemNewUpdateForm.value;

        try {
            let postOrPut;
            if (inventoryItem.id != 0) {
                await this.inventoryItemResourceService.updateInventoryItemUsingPUT (inventoryItem).toPromise();
                postOrPut = "updated";
            } else {
                await this.inventoryItemResourceService.createInventoryItemUsingPOST (inventoryItem).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Social: '${inventoryItem.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    newInventoryItem() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

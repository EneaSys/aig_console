import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-warehouse-new-update-form',
    templateUrl: './warehouse-new-update-form.component.html',
    styleUrls: ['./warehouse-new-update-form.component.scss']
})
export class AigWarehouseNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private warehouseResourceService: WarehouseResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    warehouse: WarehouseDTO;

    warehouseNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.warehouseNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', [Validators.required, AigValidator.haveId]],
        })
        
        if (this.warehouse != null) {
            this.warehouseNewUpdateForm.patchValue(this.warehouse);
        }
    }

    async submit() {
        if (!this.warehouseNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehouse: WarehouseDTO = this.warehouseNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (warehouse.id != 0) {
                await this.warehouseResourceService.updateWarehouseUsingPUT(warehouse).toPromise();
                postOrPut = "updated";
            } else {
                await this.warehouseResourceService.createWarehouseUsingPOST(warehouse).toPromise();
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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';

@Component({
    selector: 'aig-warehouse-handling-new-update-form',
    templateUrl: './warehouse-handling-new-update-form.component.html',
    styleUrls: ['./warehouse-handling-new-update-form.component.scss']
})
export class AigWarehouseHandlingNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private warehousehandlingResourceService: WarehouseHandlingResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    warehousehandling: WarehouseHandlingDTO;

    warehousehandlingNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.warehousehandlingNewUpdateForm = this._formBuilder.group({
            id:[''],
        })
        
        if (this.warehousehandling != null) {
            this.warehousehandlingNewUpdateForm.patchValue(this.warehousehandling);
        }
    }

    async submit() {
        if (!this.warehousehandlingNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehousehandling: WarehouseHandlingDTO = this.warehousehandlingNewUpdateForm.value;

        try {
            let postOrPut;
            if (warehousehandling.id != 0) {
                await this.warehousehandlingResourceService.updateWarehouseHandlingUsingPUT(warehousehandling).toPromise();
                postOrPut = "updated";
            } else {
                await this.warehousehandlingResourceService.createWarehouseHandlingUsingPOST(warehousehandling).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Warehouse Handling: '${warehousehandling.id}' ${postOrPut}.`, null, { duration: 2000, });
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

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

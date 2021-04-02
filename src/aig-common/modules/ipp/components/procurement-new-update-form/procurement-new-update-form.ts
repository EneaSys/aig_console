import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { ProcurementDTO, ProcurementResourceService } from 'aig-italian-public-procurement';

@Component({
    selector: 'aig-procurement-new-update-form',
    templateUrl: './procurement-new-update-form.component.html',
    styleUrls: ['./procurement-new-update-form.component.scss']
})
export class AigProcurementNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementResourceService: ProcurementResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    procurement: ProcurementDTO;

    procurementNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.procurementNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
        })
        
        if (this.procurement != null) {
            this.procurementNewUpdateForm.patchValue(this.procurement);
        }
    }

    async submit() {
        if (!this.procurementNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procurement: ProcurementDTO = this.procurementNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.procurement.id != 0) {
                await this.procurementResourceService.updateProcurementUsingPUT(procurement).toPromise();
                postOrPut = "updated";
            } else {
                await this.procurementResourceService.createProcurementUsingPOST(procurement).toPromise();
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

    newProcurement() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

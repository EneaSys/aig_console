import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PreparationStatusDTO, PreparationStatusResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'aig-preparation-status-new-update-form',
    templateUrl: './preparation-status-new-update-form.component.html',
    styleUrls: ['./preparation-status-new-update-form.component.scss']
})
export class AigPreparationStatusNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private preparationStatusResourceService: PreparationStatusResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    preparationStatus: PreparationStatusDTO;

    isUpdate: boolean = false;

    preparationStatusResult: any;

    preparationStatusNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.preparationStatusNewUpdateForm = this._formBuilder.group({
            id:[''],
            description:[''],
            
        })
        
        if (this.preparationStatus != null && this.preparationStatus.id != null) {
            this.preparationStatusNewUpdateForm.patchValue(this.preparationStatus);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.preparationStatusNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let preparationStatus: PreparationStatusDTO = this.preparationStatusNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.preparationStatusResourceService.updatePreparationStatusUsingPUT(preparationStatus).toPromise();
                postOrPut = "updated";
            } else {
                await this.preparationStatusResourceService.createPreparationStatusUsingPOST(preparationStatus).toPromise();
                postOrPut = "created";
            }

            this.preparationStatusResult = preparationStatus;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");

        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newPreparationStatus() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;	
        this.step[stepToShow] = true;
    }
}
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PreparationDTO, PreparationResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'aig-preparation-new-update-form',
    templateUrl: './preparation-new-update-form.component.html',
    styleUrls: ['./preparation-new-update-form.component.scss']
})
export class AigPreparationNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private preparationResourceService: PreparationResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    preparation: PreparationDTO;

    preparationNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.preparationNewUpdateForm = this._formBuilder.group({
            id:[''],
            
        })
        
        if (this.preparation != null) {
            this.preparationNewUpdateForm.patchValue(this.preparation);
        }
    }

    async submit() {
        if (!this.preparationNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let preparation: PreparationDTO = this.preparationNewUpdateForm.value;

        console.log(this.preparation);
        try {
            let postOrPut: string;

            if (this.preparation.id > 0) {
                await this.preparationResourceService.updatePreparationUsingPUT(preparation).toPromise();
                postOrPut = "updated";
            } else {
                await this.preparationResourceService.createPreparationUsingPOST(preparation).toPromise();
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

    newPreparation() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

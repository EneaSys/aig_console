import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WarehouseDTO, WarehouseResourceService } from 'aig-commerce';
import { RegimeFiscaleDTO, RegimeFiscaleResourceService } from 'aig-standard';

@Component({
    selector: 'aig-regime-fiscale-new-update-form',
    templateUrl: './regime-fiscale-new-update-form.component.html',
    styleUrls: ['./regime-fiscale-new-update-form.component.scss']
})
export class AigRegimeFiscaleNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private regimeFiscaleResourceService: RegimeFiscaleResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    regimeFiscale: RegimeFiscaleDTO;

    regimeFiscaleNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.regimeFiscaleNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
        })
        
        if (this.regimeFiscale != null) {
            this.regimeFiscaleNewUpdateForm.patchValue(this.regimeFiscale);
        }
    }

    async submit() {
        if (!this.regimeFiscaleNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let regimeFiscale: RegimeFiscaleDTO = this.regimeFiscaleNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (regimeFiscale.id != 0) {
                await this.regimeFiscaleResourceService.updateRegimeFiscaleUsingPUT(regimeFiscale).toPromise();
                postOrPut = "updated";
            } else {
                await this.regimeFiscaleResourceService.createRegimeFiscaleUsingPOST(regimeFiscale).toPromise();
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

    newRegimeFiscale() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

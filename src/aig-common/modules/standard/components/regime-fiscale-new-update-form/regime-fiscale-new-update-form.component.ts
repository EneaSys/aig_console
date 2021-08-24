import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlFeRegimeFiscaleDTO, IlFeRegimeFiscaleResourceService } from 'aig-standard';

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
        private regimeFiscaleResourceService: IlFeRegimeFiscaleResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    regimeFiscale: IlFeRegimeFiscaleDTO;

    isUpdate: boolean = false;

    regimeFiscaleResult: any;

    regimeFiscaleNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.regimeFiscaleNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', [Validators.required,]],
            name:['', [Validators.required,]],
            description: [''],
            wikiCode:['']
        })
        
        if (this.regimeFiscale != null && this.regimeFiscale.id != null) {
            this.regimeFiscaleNewUpdateForm.patchValue(this.regimeFiscale);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.regimeFiscaleNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let regimeFiscale: IlFeRegimeFiscaleDTO = this.regimeFiscaleNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.regimeFiscaleResourceService.updateIlFeRegimeFiscaleUsingPUT(regimeFiscale).toPromise();
                postOrPut = "updated";
            } else {
                await this.regimeFiscaleResourceService.createIlFeRegimeFiscaleUsingPOST(regimeFiscale).toPromise();
                postOrPut = "created";
            }

            this.regimeFiscaleResult = regimeFiscale;

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
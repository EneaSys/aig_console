import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { FatturaElettronicaBodyDTO, FatturaElettronicaBodyResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'aig-fattura-elettronica-body-new-update-form',
    templateUrl: './fattura-elettronica-body-new-update-form.component.html',
    styleUrls: ['./fattura-elettronica-body-new-update-form.component.scss']
})
export class AigFatturaElettronicaBodyNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private fatturaElettronicaBodyResourceService: FatturaElettronicaBodyResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    fatturaElettronicaBody: FatturaElettronicaBodyDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	fatturaElettronicaBodyOutput = new EventEmitter<FatturaElettronicaBodyDTO>();

    fatturaElettronicaBodyNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.fatturaElettronicaBodyNewUpdateForm = this._formBuilder.group({
            id: [''],
            numero: ['', Validators.required],
        })
        if (this.fatturaElettronicaBody != null) {
            this.fatturaElettronicaBodyNewUpdateForm.patchValue(this.fatturaElettronicaBody);
        }
    }

    async submit() {
        if (!this.fatturaElettronicaBodyNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let fatturaElettronicaBody: FatturaElettronicaBodyDTO = this.fatturaElettronicaBodyNewUpdateForm.value;

        if(this.returnToParent) {
			this.fatturaElettronicaBodyOutput.emit(fatturaElettronicaBody);
			this.setStep("complete");
		} 

        if(!this.returnToParent){
            try {
                let postOrPut;
                if (fatturaElettronicaBody.id != 0) {
                    await this.fatturaElettronicaBodyResourceService.updateFatturaElettronicaBodyUsingPUT(fatturaElettronicaBody).toPromise();
                    postOrPut = "updated";
                } else {
                    await this.fatturaElettronicaBodyResourceService.createFatturaElettronicaBodyUsingPOST(fatturaElettronicaBody).toPromise();
                    postOrPut = "created";
                }
                this.eventService.reloadCurrentPage();
    
                this._snackBar.open(`Fattura Elettronica: '${fatturaElettronicaBody.id}' ${postOrPut}.`, null, { duration: 2000, });
                this.setStep("complete");
            } catch (error) {
                this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
                this.setStep("form");
            }
        }
        
        this._fuseProgressBarService.hide();
    }

    newFatturaElettronicaBody() {
        this.fatturaElettronicaBody = null;
        this.fatturaElettronicaBodyOutput.emit(this.fatturaElettronicaBody);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoCessionePrestazioneDTO, TipoCessionePrestazioneResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-tipo-cessione-prestazione-new-update-form',
    templateUrl: './tipo-cessione-prestazione-new-update-form.component.html',
    styleUrls: ['./tipo-cessione-prestazione-new-update-form.component.scss']
})
export class AigTipoCessionePrestazioneNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private tipoCessionePrestazioneResourceService: TipoCessionePrestazioneResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    tipoCessionePrestazione: TipoCessionePrestazioneDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	tipoCessionePrestazioneOutput = new EventEmitter<TipoCessionePrestazioneDTO>();

    tipoCessionePrestazioneNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.tipoCessionePrestazioneNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
        if (this.tipoCessionePrestazione!= null) {
            this.tipoCessionePrestazioneNewUpdateForm.patchValue(this.tipoCessionePrestazione);
        }
    }

    async submit() {
        if (!this.tipoCessionePrestazioneNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let tipoCessionePrestazione: TipoCessionePrestazioneDTO = this.tipoCessionePrestazioneNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (tipoCessionePrestazione.id != 0) {
                await this.tipoCessionePrestazioneResourceService.updateTipoCessionePrestazioneUsingPUT(tipoCessionePrestazione).toPromise();
                postOrPut = "updated";
            } else {
                await this.tipoCessionePrestazioneResourceService.createTipoCessionePrestazioneUsingPOST(tipoCessionePrestazione).toPromise();
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

    newTipoCessionePrestazione() {
        this.tipoCessionePrestazione = null;
        this.tipoCessionePrestazioneOutput.emit(this.tipoCessionePrestazione);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
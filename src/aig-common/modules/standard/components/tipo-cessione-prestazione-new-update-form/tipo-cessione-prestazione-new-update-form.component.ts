import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import {IlFeCessionePrestazioneTipoDTO, IlFeCessionePrestazioneTipoResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

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
        private tipoCessionePrestazioneResourceService: IlFeCessionePrestazioneTipoResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    tipoCessionePrestazione: IlFeCessionePrestazioneTipoDTO;

    isUpdate: boolean = false;

    tipoCessionePrestazioneResult: any;

    tipoCessionePrestazioneNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.tipoCessionePrestazioneNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: [''],
            name: [''],
            description: [''],
            wikiCode:[''],
            expirationDate:[''],
            activationDate:[''],

        })
        if (this.tipoCessionePrestazione!= null && this.tipoCessionePrestazione.id != null) {
            this.tipoCessionePrestazioneNewUpdateForm.patchValue(this.tipoCessionePrestazione);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.tipoCessionePrestazioneNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let tipoCessionePrestazione: IlFeCessionePrestazioneTipoDTO = this.tipoCessionePrestazioneNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.tipoCessionePrestazioneResourceService.updateIlFeCessionePrestazioneTipoUsingPUT(tipoCessionePrestazione).toPromise();
                postOrPut = "updated";
            } else {
                await this.tipoCessionePrestazioneResourceService.createIlFeCessionePrestazioneTipoUsingPOST(tipoCessionePrestazione).toPromise();
                postOrPut = "created";
            }

            this.tipoCessionePrestazioneResult = tipoCessionePrestazione;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");

        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newTipoCessionePrestazione() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
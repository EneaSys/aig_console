import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlFeScontoMaggiorazioneTipoDTO, IlFeScontoMaggiorazioneTipoResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-tipo-sconto-maggiorazione-new-update-form',
    templateUrl: './tipo-sconto-maggiorazione-new-update-form.component.html',
    styleUrls: ['./tipo-sconto-maggiorazione-new-update-form.component.scss']
})
export class AigTipoScontoMaggiorazioneNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private tipoScontoMaggiorazioneResourceService: IlFeScontoMaggiorazioneTipoResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    tipoScontoMaggiorazione: IlFeScontoMaggiorazioneTipoDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	tipoScontoMaggiorazioneOutput = new EventEmitter<IlFeScontoMaggiorazioneTipoDTO>();

    isUpdate: boolean = false;

    tipoScontoMaggiorazioneResult: any;

    tipoScontoMaggiorazioneNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.tipoScontoMaggiorazioneNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', [Validators.required, AigValidator.haveId]],
            name: ['', [Validators.required, AigValidator.haveId]],
            description: [''],
            wikiCode:['']
        })
        if (this.tipoScontoMaggiorazione!= null && this.tipoScontoMaggiorazione.id != null) {
            this.tipoScontoMaggiorazioneNewUpdateForm.patchValue(this.tipoScontoMaggiorazione);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.tipoScontoMaggiorazioneNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let tipoScontoMaggiorazione: IlFeScontoMaggiorazioneTipoDTO = this.tipoScontoMaggiorazioneNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.tipoScontoMaggiorazioneResourceService.updateIlFeScontoMaggiorazioneTipoUsingPUT(tipoScontoMaggiorazione).toPromise();
                postOrPut = "updated";
            } else {
                await this.tipoScontoMaggiorazioneResourceService.createIlFeScontoMaggiorazioneTipoUsingPOST(tipoScontoMaggiorazione).toPromise();
                postOrPut = "created";
            }

            this.tipoScontoMaggiorazioneResult = tipoScontoMaggiorazione;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");

        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newTipoScontoMaggiorazione() {
        this.tipoScontoMaggiorazione = null;
        this.tipoScontoMaggiorazioneOutput.emit(this.tipoScontoMaggiorazione);
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService, TipoCassaDTO, TipoCassaResourceService, TipoRitenutaDTO, TipoRitenutaResourceService, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-tipo-sconto-maggioranza-new-update-form',
    templateUrl: './tipo-sconto-maggioranza-new-update-form.component.html',
    styleUrls: ['./tipo-sconto-maggioranza-new-update-form.component.scss']
})
export class AigTipoScontoMaggioranzaNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private tipoScontoMaggioranzaResourceService: TipoScontoMaggiorazioneResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    tipoScontoMaggioranza: TipoScontoMaggiorazioneDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	tipoScontoMaggioranzaOutput = new EventEmitter<TipoScontoMaggiorazioneDTO>();

    tipoScontoMaggioranzaNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.tipoScontoMaggioranzaNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
        if (this.tipoScontoMaggioranza!= null) {
            this.tipoScontoMaggioranzaNewUpdateForm.patchValue(this.tipoScontoMaggioranza);
        }
    }

    async submit() {
        if (!this.tipoScontoMaggioranzaNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let tipoScontoMaggioranza: TipoScontoMaggiorazioneDTO = this.tipoScontoMaggioranzaNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (tipoScontoMaggioranza.id != 0) {
                await this.tipoScontoMaggioranzaResourceService.updateTipoScontoMaggiorazioneUsingPUT(tipoScontoMaggioranza).toPromise();
                postOrPut = "updated";
            } else {
                await this.tipoScontoMaggioranzaResourceService.createTipoScontoMaggiorazioneUsingPOST(tipoScontoMaggioranza).toPromise();
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

    newTipoScontoMaggioranza() {
        this.tipoScontoMaggioranza = null;
        this.tipoScontoMaggioranzaOutput.emit(this.tipoScontoMaggioranza);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
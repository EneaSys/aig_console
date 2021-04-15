import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService, EsigibilitaIvaDTO, EsigibilitaIvaResourceService, NaturaDTO, NaturaResourceService, TipoCassaDTO, TipoCassaResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-esigibilita-iva-new-update-form',
    templateUrl: './esigibilita-iva-new-update-form.component.html',
    styleUrls: ['./esigibilita-iva-new-update-form.component.scss']
})
export class AigEsigibilitaIvaNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private esigibilitaIvaResourceService: EsigibilitaIvaResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    esigibilitaIva: EsigibilitaIvaDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	esigibilitaIvaOutput = new EventEmitter<EsigibilitaIvaDTO>();

    esigibilitaIvaNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.esigibilitaIvaNewUpdateForm = this._formBuilder.group({
            id:[''],
            value: ['', Validators.required],
            description: [''],

        })
        if (this.esigibilitaIva!= null) {
            this.esigibilitaIvaNewUpdateForm.patchValue(this.esigibilitaIva);
        }
    }
    
    async submit() {
        
        if (!this.esigibilitaIvaNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let esigibilitaIva: EsigibilitaIvaDTO = this.esigibilitaIvaNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (esigibilitaIva.id != 0) {
                await this.esigibilitaIvaResourceService.updateEsigibilitaIvaUsingPUT(esigibilitaIva).toPromise();
                postOrPut = "updated";
            } else {
                await this.esigibilitaIvaResourceService.createEsigibilitaIvaUsingPOST(esigibilitaIva).toPromise();
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

    newEsigibilitaIva() {
        this.esigibilitaIva = null;
        this.esigibilitaIvaOutput.emit(this.esigibilitaIva);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
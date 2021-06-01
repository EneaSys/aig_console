import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlFeEsigibilitaIvaDTO, IlFeEsigibilitaIvaResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

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
        private esigibilitaIvaResourceService: IlFeEsigibilitaIvaResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    esigibilitaIva: IlFeEsigibilitaIvaDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	esigibilitaIvaOutput = new EventEmitter<IlFeEsigibilitaIvaDTO>();

    isUpdate: boolean = false;

    esigibilitaIvaResult: any;

    esigibilitaIvaNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.esigibilitaIvaNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', [Validators.required, AigValidator.haveId]],
            name: ['', [Validators.required, AigValidator.haveId]],
            description: [''],
            wikiCode:['']

        })
        if (this.esigibilitaIva!= null && this.esigibilitaIva.id != null) {
            this.esigibilitaIvaNewUpdateForm.patchValue(this.esigibilitaIva);
            this.isUpdate = true;
        }
    }
    
    async submit() {
        if (!this.esigibilitaIvaNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let esigibilitaIva: IlFeEsigibilitaIvaDTO = this.esigibilitaIvaNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.esigibilitaIvaResourceService.updateIlFeEsigibilitaIvaUsingPUT(esigibilitaIva).toPromise();
                postOrPut = "updated";
            } else {
                await this.esigibilitaIvaResourceService.createIlFeEsigibilitaIvaUsingPOST(esigibilitaIva).toPromise();
                postOrPut = "created";
            }

            this.esigibilitaIvaResult = esigibilitaIva;

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

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
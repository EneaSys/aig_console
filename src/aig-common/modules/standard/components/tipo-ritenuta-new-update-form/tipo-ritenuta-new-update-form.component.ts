import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlFeRitenutaTipoDTO, IlFeRitenutaTipoResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-tipo-ritenuta-new-update-form',
    templateUrl: './tipo-ritenuta-new-update-form.component.html',
    styleUrls: ['./tipo-ritenuta-new-update-form.component.scss']
})
export class AigTipoRitenutaNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private tipoRitenutaResourceService: IlFeRitenutaTipoResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    tipoRitenuta: IlFeRitenutaTipoDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	tipoRitenutaOutput = new EventEmitter<IlFeRitenutaTipoDTO>();

    isUpdate: boolean = false;

    tipoRitenutaResult: any;

    tipoRitenutaNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.tipoRitenutaNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', [Validators.required,]],
            name: ['', [Validators.required,]],
            description: [''],
            wikiCode:[''],
            expirationDate:[''],


        })
        if (this.tipoRitenuta!= null && this.tipoRitenuta.id != null) {
            this.tipoRitenutaNewUpdateForm.patchValue(this.tipoRitenuta);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.tipoRitenutaNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let tipoRitenuta: IlFeRitenutaTipoDTO = this.tipoRitenutaNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.tipoRitenutaResourceService.updateIlFeRitenutaTipoUsingPUT(tipoRitenuta).toPromise();
                postOrPut = "updated";
            } else {
                await this.tipoRitenutaResourceService.createIlFeRitenutaTipoUsingPOST(tipoRitenuta).toPromise();
                postOrPut = "created";
            }

            this.tipoRitenutaResult = tipoRitenuta;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");

        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newTipoRitenuta() {
        this.tipoRitenuta = null;
        this.tipoRitenutaOutput.emit(this.tipoRitenuta);
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
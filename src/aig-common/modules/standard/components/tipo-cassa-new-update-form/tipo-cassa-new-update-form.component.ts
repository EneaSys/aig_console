import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlFeCassaTipoDTO, IlFeCassaTipoResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-tipo-cassa-new-update-form',
    templateUrl: './tipo-cassa-new-update-form.component.html',
    styleUrls: ['./tipo-cassa-new-update-form.component.scss']
})
export class AigTipoCassaNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private tipoCassaResourceService: IlFeCassaTipoResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    tipoCassa: IlFeCassaTipoDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	tipoCassaOutput = new EventEmitter<IlFeCassaTipoDTO>();

    isUpdate: boolean = false;

    tipoCassaResult: any;

    tipoCassaNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.tipoCassaNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', [Validators.required, AigValidator.haveId]],
            name: ['', [Validators.required, AigValidator.haveId]],
            description: [''],
            wikiCode:['']

        })
        if (this.tipoCassa!= null && this.tipoCassa.id != null) {
            this.tipoCassaNewUpdateForm.patchValue(this.tipoCassa);
            this.isUpdate = true;
        }
    }
    async submit() {
        if (!this.tipoCassaNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let tipoCassa: IlFeCassaTipoDTO = this.tipoCassaNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.tipoCassaResourceService.updateIlFeCassaTipoUsingPUT(tipoCassa).toPromise();
                postOrPut = "updated";
            } else {
                await this.tipoCassaResourceService.createIlFeCassaTipoUsingPOST(tipoCassa).toPromise();
                postOrPut = "created";
            }

            this.tipoCassaResult = tipoCassa;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");

        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newTipoCassa() {
        this.tipoCassa = null;
        this.tipoCassaOutput.emit(this.tipoCassa);
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
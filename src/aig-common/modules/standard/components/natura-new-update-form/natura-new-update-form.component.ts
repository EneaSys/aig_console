import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import {  IlFeNaturaDTO, IlFeNaturaResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-natura-new-update-form',
    templateUrl: './natura-new-update-form.component.html',
    styleUrls: ['./natura-new-update-form.component.scss']
})
export class AigNaturaNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private naturaResourceService: IlFeNaturaResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    natura: IlFeNaturaDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	naturaOutput = new EventEmitter<IlFeNaturaDTO>();

    isUpdate: boolean = false;

    naturaResult: any;

    naturaNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.naturaNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            wikiCode:[''],
            expirationDate:[''],

        })
        if (this.natura!= null && this.natura.id != null) {
            this.naturaNewUpdateForm.patchValue(this.natura);
            this.isUpdate = true;
        }
    }
    async submit() {
        if (!this.naturaNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let natura: IlFeNaturaDTO = this.naturaNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.naturaResourceService.updateIlFeNaturaUsingPUT(natura).toPromise();
                postOrPut = "updated";
            } else {
                await this.naturaResourceService.createIlFeNaturaUsingPOST(natura).toPromise();
                postOrPut = "created";
            }

            this.naturaResult = natura;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");

        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newNatura() {
        this.natura = null;
        this.naturaOutput.emit(this.natura);
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService, NaturaDTO, NaturaResourceService, TipoCassaDTO, TipoCassaResourceService } from 'aig-standard';
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
        private naturaResourceService: NaturaResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    natura: NaturaDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	naturaOutput = new EventEmitter<NaturaDTO>();

    naturaNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.naturaNewUpdateForm = this._formBuilder.group({
            id:[''],
            value: ['', Validators.required],
            description: [''],

        })
        if (this.natura!= null) {
            this.naturaNewUpdateForm.patchValue(this.natura);
        }
    }
    async submit() {
        if (!this.naturaNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let natura: NaturaDTO = this.naturaNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (natura.id != 0) {
                await this.naturaResourceService.updateNaturaUsingPUT(this.natura).toPromise();
                postOrPut = "updated";
            } else {
                await this.naturaResourceService.createNaturaUsingPOST(this.natura).toPromise();
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

    newNatura() {
        this.natura = null;
        this.naturaOutput.emit(this.natura);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
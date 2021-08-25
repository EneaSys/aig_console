import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlPpPartecipationTypeDTO, IlPpPartecipationTypeResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-partecipation-type-new-update-form',
    templateUrl: './partecipation-type-new-update-form.component.html',
    styleUrls: ['./partecipation-type-new-update-form.component.scss']
})
export class AigPartecipationTypeNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private partecipationTypeResourceService: IlPpPartecipationTypeResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    partecipationType: IlPpPartecipationTypeDTO;

    isUpdate: boolean = false;

    partecipationTypeResult: any;

    partecipationTypeNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.partecipationTypeNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', [Validators.required,]],
            name: ['', [Validators.required,]],
            description: [''],
            wikiCode:['']
        })

        if (this.partecipationType != null && this.partecipationType.id != null) {
            this.partecipationTypeNewUpdateForm.patchValue(this.partecipationType);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.partecipationTypeNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let partecipationType: IlPpPartecipationTypeDTO = this.partecipationTypeNewUpdateForm.value;

        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.partecipationTypeResourceService.updateIlPpPartecipationTypeUsingPUT(partecipationType).toPromise();
                postOrPut = "updated";
            } else {
                await this.partecipationTypeResourceService.createIlPpPartecipationTypeUsingPOST(partecipationType).toPromise();
                postOrPut = "created";
            }

            this.partecipationTypeResult = partecipationType;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newPartecipationType() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
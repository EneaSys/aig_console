import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CpvResourceService, CpvDTO } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-cpv-new-update-form',
    templateUrl: './cpv-new-update-form.component.html',
    styleUrls: ['./cpv-new-update-form.component.scss']
})
export class AigCpvNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private cpvResourceService: CpvResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    cpv: CpvDTO;

    isUpdate: boolean = false;

    cpvResult: any;

    cpvNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.cpvNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            wikiCode:[''],
            expirationDate: [''],
        })

        if (this.cpv != null && this.cpv.id != null) {
            this.cpvNewUpdateForm.patchValue(this.cpv);
            this.isUpdate = true;
        }
    }
    
    async submit() {
        if (!this.cpvNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let cpv = this.cpvNewUpdateForm.value;

        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.cpvResourceService.updateCpvUsingPUT(cpv).toPromise();
                postOrPut = "updated";
            } else {
                await this.cpvResourceService.createCpvUsingPOST(cpv).toPromise();
                postOrPut = "created";
            }

            this.cpvResult = cpv;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newCpv() {
        this.setStep("form");
    }

    private setStep(stepToShow: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
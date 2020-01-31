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

    cpvCategorys = ['GENERIC', 'PERSON'];

    @Input()
    cpv: CpvDTO;

    cpvNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.cpvNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode: ['', Validators.required],
        })

        if (this.cpv != null) {
            this.cpvNewUpdateForm.patchValue(this.cpv);
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
            let postOrPut;
            if (cpv.id != null && cpv.id != "") {
                await this.cpvResourceService.updateCpvUsingPUT(cpv).toPromise();
                postOrPut = "updated";
            } else {
                await this.cpvResourceService.createCpvUsingPOST(cpv).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Cpv Type: '${cpv.name}' ${postOrPut}.`, null, { duration: 2000, });
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

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

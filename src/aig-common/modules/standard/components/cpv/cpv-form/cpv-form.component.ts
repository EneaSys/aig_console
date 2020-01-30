import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CpvDTO, CpvResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-cpv-form',
    templateUrl: './cpv-form.component.html',
    styleUrls: ['./cpv-form.component.scss']
})
export class AigCpvFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private cpvResourceService: CpvResourceService,
        private eventService: EventService,
    ) { }

    private cpvNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public cpvDTO: CpvDTO;

    ngOnInit(): void {
        this.cpvNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['', Validators.required]
        })
    }

    public createCpv(){
        if (!this.cpvNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let cpvDTO: CpvDTO = {
            name: this.cpvNewForm.value.name,
            code: this.cpvNewForm.value.code,
            wikiCode: this.cpvNewForm.value.wikiCode
        };

        this.cpvResourceService.createCpvUsingPOST(cpvDTO).subscribe(
            (value: CpvDTO) => {
                this.cpvDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Cpv: " + value.name + " created.", null, {duration: 2000,});
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.title, null, {duration: 5000,});
                this._fuseProgressBarService.hide();
                this.setStep("form");
            }
        );
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

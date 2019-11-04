import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector: 'aig-role-associate',
    templateUrl: './role-associate.component.html',
    styleUrls: ['./role-associate.component.scss']
})
export class AigRoleAssociateComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
    ) { }

    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    formGroup: FormGroup;
    
    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            groupParent: ['', Validators.required],
            groupChild: ['', Validators.required],
            user: ['', Validators.required],
        });

    }

//    createdElement: TYPE;

    submit() {
        if (!this.formGroup.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        
/*
        this.BLA.subscribe(
            (value: TYPE) => {
                this.createdElement = value;
                this._snackBar.open("Added permission with code: " + value.permissionCode + ", to custom role.", null, {duration: 5000,});
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.detail, null, {duration: 10000,});
                this._fuseProgressBarService.hide();
                this.setStep("form");
            },
        );
        */
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

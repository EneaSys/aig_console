import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResourceService, UserDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector: 'aig-user-new',
    templateUrl: './user-new.component.html',
    styleUrls: ['./user-new.component.scss']
})
export class AigUserNewComponent implements OnInit {
    private userNerForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    private userDTO: UserDTO;

    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private userResourceService: UserResourceService,
    ) { }

    ngOnInit(): void {
        this.userNerForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    private createUser(){
        if (!this.userNerForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let userDTO: UserDTO = {
            firstName: this.userNerForm.value.firstName,
            lastName: this.userNerForm.value.lastName,
            email: this.userNerForm.value.email,
            type: "PERSON"
        }

        this.userResourceService.createUserUsingPOST(userDTO).subscribe(
            (userDTO: UserDTO) => {
                console.log("Route alla pagina di: ", userDTO);
                this.userDTO = userDTO;
                this._snackBar.open("User " + userDTO.email + " created.", null, {duration: 2000,});
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.detail, null, {duration: 5000,});
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

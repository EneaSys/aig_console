import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { RoleResourceService, RoleDTO } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-role-new-form',
    templateUrl: './role-new-form.component.html',
    styleUrls: ['./role-new-form.component.scss']
})
export class AigRoleNewFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private roleResourceService: RoleResourceService,
        private eventService: EventService,
    ) { }

    private roleNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public roleDTO: RoleDTO;

    ngOnInit(): void {
        this.roleNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            roleCode: ['', Validators.required],
        })
    }

    public createRole(){
        if (!this.roleNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let roleDTO: RoleDTO = {
            name: this.roleNewForm.value.name,
            roleCode: this.roleNewForm.value.roleCode,
        };

        this.roleResourceService.createRoleUsingPOST(roleDTO).subscribe(
            (value: RoleDTO) => {
                this.roleDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Role: " + value.name + " created.", null, {duration: 2000,});
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

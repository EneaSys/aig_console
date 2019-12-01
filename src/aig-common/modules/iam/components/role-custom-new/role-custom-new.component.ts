import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CustomRoleResourceService, CustomRoleDTO } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-role-custom-new',
    templateUrl: './role-custom-new.component.html',
    styleUrls: ['./role-custom-new.component.scss']
})
export class AigRoleCustomNewComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private customRoleResourceService: CustomRoleResourceService,
        private eventService: EventService,
    ) { }

    private roleCustomNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public customRoleDTO: CustomRoleDTO;

    ngOnInit(): void {
        this.roleCustomNewForm = this._formBuilder.group({
            name: ['', Validators.required]
        })
    }

    public createRoleCustom(){
        if (!this.roleCustomNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let customRoleDTO: CustomRoleDTO = {
            name: this.roleCustomNewForm.value.name
        };

        this.customRoleResourceService.createCustomRoleUsingPOST(customRoleDTO).subscribe(
            (value: CustomRoleDTO) => {
                this.eventService.reloadCurrentPage();
                this.customRoleDTO = value;
                this._snackBar.open("RoleCustom: " + value.name + " created.", null, {duration: 2000,});
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PermissionDTO, PermissionResourceService } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-permission-new-form',
    templateUrl: './permission-new-form.component.html',
    styleUrls: ['./permission-new-form.component.scss']
})
export class AigPermissionNewFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private permissionResourceService: PermissionResourceService,
        private eventService: EventService,
    ) { }

    private permissionNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public permissionDTO: PermissionDTO;

    ngOnInit(): void {
        this.permissionNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            permissionCode: ['', Validators.required],
        })
    }

    public createPermission(){
        if (!this.permissionNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let permissionDTO: PermissionDTO = {
            name: this.permissionNewForm.value.name,
            permissionCode: this.permissionNewForm.value.permissionCode,
            moduleId: 1, //  Static generic module
        };

        this.permissionResourceService.createPermissionUsingPOST(permissionDTO).subscribe(
            (value: PermissionDTO) => {
                this.permissionDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Permission: " + value.name + " created.", null, {duration: 2000,});
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

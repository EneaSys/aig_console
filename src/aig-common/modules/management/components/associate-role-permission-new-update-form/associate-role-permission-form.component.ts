import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CustomRolePermissionResourceService, CustomRolePermissionDTO, PermissionResourceService, PermissionDTO, CustomRoleResourceService, CustomRoleDTO, RoleResourceService, RoleDTO } from 'api-gest';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigManagementAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';

@Component({
    selector: 'aig-associate-role-permission-form',
    templateUrl: './associate-role-permission-form.component.html',
    styleUrls: ['./associate-role-permission-form.component.scss']
})
export class AigAssociateRolePermissionFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private roleResourceService: RoleResourceService,
        private eventService: EventService,
        private aigManagementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public aigManagementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    // Form preparation Objects
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    formGroup: FormGroup;


    // Precompile Objects
    @Input()
    role: any;
    @Input()
    permission: any;




    // Iteractions Objects
    filteredRoles: Observable<RoleDTO[]>;
    filteredPermissions: Observable<PermissionDTO[]>;















    ngOnInit(): void {
        // PREPARE FORM
        this.formGroup = this._formBuilder.group({
            role: ['', Validators.required],
            permission: ['', Validators.required],
        });

        // PRECOMPILE
        if (this.role != null) {
            this.formGroup.controls['role'].setValue(this.role);
        }
        if (this.permission != null) {
            this.formGroup.controls['permission'].setValue(this.permission);
        }





        // EVENT ON ITERACTION
        this.filteredRoles = this.aigManagementAutocompleteFilterService.roleFilter(this.formGroup.controls['role'].valueChanges);
        this.filteredPermissions = this.aigManagementAutocompleteFilterService.permissionFilter(this.formGroup.controls['permission'].valueChanges);
    }














    // SUBMIT
    submit() {
        if (!this.formGroup.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let role: RoleDTO = this.formGroup.controls['role'].value;
        let permission: PermissionDTO = this.formGroup.controls['permission'].value;

        {
            let _role: RoleDTO = JSON.parse(JSON.stringify(role));
            _role.permissions.push(permission);

            role.permissions = _role.permissions;
        }

        this.roleResourceService.updateRoleUsingPUT(role).subscribe(
            (value: RoleDTO) => {
                this.eventService.reloadCurrentPage();
                this._snackBar.open("Permission " + permission.name + ", added to: " + value.name + ".", null, { duration: 5000, });
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.detail, null, { duration: 10000, });
                this._fuseProgressBarService.hide();
                this.setStep("form");
            },
        );
    }

    new() {
        this.setStep("form");
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

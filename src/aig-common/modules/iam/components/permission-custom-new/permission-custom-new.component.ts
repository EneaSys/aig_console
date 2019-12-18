import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CustomRolePermissionResourceService, CustomRolePermissionDTO, PermissionResourceService, PermissionDTO, CustomRoleResourceService, CustomRoleDTO } from 'api-gest';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-permission-custom-new',
    templateUrl: './permission-custom-new.component.html',
    styleUrls: ['./permission-custom-new.component.scss']
})
export class AigPermissionCustomNewComponent implements OnInit {
    @Input()
    customRole: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private customRolePermissionResourceService: CustomRolePermissionResourceService,
        private permissionResourceService: PermissionResourceService,
        private customRoleResourceService: CustomRoleResourceService,
        private eventService: EventService,
    ) { }

    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    addPermissionToCustomRoleForm: FormGroup;

    permissions: PermissionDTO[];
    roles: CustomRoleDTO[];
    filteredPermissions: Observable<PermissionDTO[]>;
    filteredRoles: Observable<CustomRoleDTO[]>;
    
    customRolePermissionDTO: CustomRolePermissionDTO;

    ngOnInit(): void {
        this.addPermissionToCustomRoleForm = this._formBuilder.group({
            role: ['', Validators.required],
            permission: ['', Validators.required],
        });

        this.customRoleResourceService.getAllCustomRolesUsingGET().subscribe(
            (value: CustomRoleDTO[]) => {
                this.roles = value;
                if(this.customRole != null){
                    let role =  this.roles.filter((role) => {
                        return role.id == this.customRole.id;
                    })[0];
                    this.addPermissionToCustomRoleForm.controls['role'].setValue(role);
                }
            }
        );
        this.permissionResourceService.getAllPermissionsUsingGET().subscribe(
            (value: PermissionDTO[]) => {
                this.permissions = value;
            }
        );

        this.filteredRoles = this.addPermissionToCustomRoleForm.controls['role'].valueChanges.pipe(
            startWith(''),
            map(value => this.roleFilter(value))
        );

        this.filteredPermissions = this.addPermissionToCustomRoleForm.controls['permission'].valueChanges.pipe(
            startWith(''),
            map(value => this.permissionFilter(value))
        );
    }

    private roleFilter(value: any): any[] {
        if (typeof value === "string") {
            if (value.length > 2) {
                const filterValue = value.toLowerCase();
                return this.roles.filter(option => option.name.toLowerCase().includes(filterValue));
            }
        }
    }

    private permissionFilter(value: any): any[] {
        if (typeof value === "string") {
            if (value.length > 2) {
                const filterValue = value.toLowerCase();
                return this.permissions.filter(option => option.name.toLowerCase().includes(filterValue));
            }
        }
    }

    roleDisplayFn(customRole?: CustomRoleDTO): string | undefined {
        return customRole ? customRole.name : undefined;
    }

    permissionDisplayFn(permission?: PermissionDTO): string | undefined {
        return permission ? permission.name : undefined;
    }

    addPermissionToCustomRole() {
        if (!this.addPermissionToCustomRoleForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let customRolePermissionDTO: CustomRolePermissionDTO = {
            filtered: false,
            allView: true,
            roleId: this.addPermissionToCustomRoleForm.value.role.id,
            permissionCode: this.addPermissionToCustomRoleForm.value.permission.permissionCode,
        }

        this.customRolePermissionResourceService.createCustomRolePermissionUsingPOST(customRolePermissionDTO).subscribe(
            (value: CustomRolePermissionDTO) => {
                this.eventService.reloadCurrentPage();
                this.customRolePermissionDTO = value;
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
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

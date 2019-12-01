import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ContextGroupDTO, UserDTO, CustomRoleDTO, RoleDTO, RoleAssignationResourceService, RoleAssignationDTO } from 'api-gest';
import { Observable } from 'rxjs';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';
import { AigValidatorService } from '../../services/form/validator.service';

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
        private aigAutocompleteFilterService: AigAutocompleteFilterService,
        public aigAutocompleteFunctionService: AigAutocompleteFunctionService,
        private aigValidatorService: AigValidatorService,
        private roleAssignationResourceService: RoleAssignationResourceService,
        private eventService: EventService,
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
    roleSystem: RoleDTO;
    @Input()
    roleCustom: CustomRoleDTO;
    @Input()
    group: ContextGroupDTO;
    @Input()
    user: UserDTO;


    // Iteractions Objects
    filteredSystemRoles: Observable<RoleDTO[]>;
    filteredCustomRoles: Observable<CustomRoleDTO[]>;
    filteredGroups: Observable<ContextGroupDTO[]>;
    filteredUsers: Observable<UserDTO[]>;











    ngOnInit(): void {
        // PREPARE FORM
        this.formGroup = this._formBuilder.group({
            roleSystem: [''],
            roleCustom: [''],
            group: [''],
            user: [''],
        },{ 
            validator: [
                this.aigValidatorService.getFirstOrSecondValidator('roleSystem', 'roleCustom'),
                this.aigValidatorService.getFirstOrSecondValidator('group', 'user'),
            ]
        });


        // PRECOMPILE
        if (this.roleSystem != null) {
            this.formGroup.controls['roleSystem'].setValue(this.roleSystem);
        }
        if (this.roleCustom != null) {
            this.formGroup.controls['roleCustom'].setValue(this.roleCustom);
        }
        if (this.group != null) {
            this.formGroup.controls['group'].setValue(this.group);
        }
        if (this.user != null) {
            this.formGroup.controls['user'].setValue(this.user);
        }


        // EVENT ON ITERACTION
        this.filteredSystemRoles = this.aigAutocompleteFilterService.filterSystemRole(this.formGroup.controls['roleSystem'].valueChanges);
        this.filteredCustomRoles = this.aigAutocompleteFilterService.filterCustomRole(this.formGroup.controls['roleCustom'].valueChanges);
        this.filteredGroups = this.aigAutocompleteFilterService.filterGroups(this.formGroup.controls['group'].valueChanges);
        this.filteredUsers = this.aigAutocompleteFilterService.filterUsers(this.formGroup.controls['user'].valueChanges);
    }
































    submit() {
        if (!this.formGroup.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let roleAssignation: RoleAssignationDTO = {
            roleCode: this.formGroup.controls['roleSystem'].value.roleCode,
            customRoleId: this.formGroup.controls['roleCustom'].value.id,
            groupId: this.formGroup.controls['group'].value.id,
            userId: this.formGroup.controls['user'].value.id,
        };

        this.roleAssignationResourceService.createRoleAssignationUsingPOST(roleAssignation).subscribe(
            (value: RoleAssignationDTO) => {
                this.eventService.reloadCurrentPage();
                let userOrGroup = (value.groupId == null) ? 'user' : 'group';
                this._snackBar.open("Role added to " + userOrGroup + ".", null, { duration: 5000, });
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

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

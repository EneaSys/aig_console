import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigManagementAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';
import { Observable } from 'rxjs';
import { ApplicationModuleDTO, RoleDTO, RoleResourceService } from 'aig-management';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-role-new-update-form',
    templateUrl: './role-new-update-form.component.html',
    styleUrls: ['./role-new-update-form.component.scss']
})
export class AigRoleNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder,
        private eventService: EventService,
        private _fuseProgressBarService: FuseProgressBarService,
        private roleResourceService: RoleResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    role: RoleDTO;

	@Input()
    applicationModule: ApplicationModuleDTO;

    isUpdate: boolean = false;

    roleNewUpdateForm: FormGroup;

    filteredApplicationModules: Observable<ApplicationModuleDTO[]>;

    ngOnInit(): void {
        this.roleNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            roleCode: ['', Validators.required],
            applicationModule: [this.applicationModule, [Validators.required, AigValidator.haveId]],
        })

        if (this.role != null) {
            this.roleNewUpdateForm.patchValue(this.role);
        }
        this.filteredApplicationModules = this.managementAutocompleteFilterService.applicationModuleFilter(this.roleNewUpdateForm.controls['applicationModule'].valueChanges);

    }

    async submit() {
        if (!this.roleNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let role= this.roleNewUpdateForm.value;

        role.moduleId = this.roleNewUpdateForm.value.applicationModule.id;
        
        
        try {
            let postOrPut;
            if (role.id != 0) {
                await this.roleResourceService.updateRoleUsingPUT(role).toPromise();
                postOrPut = "updated";
            } else {
                await this.roleResourceService.createRoleUsingPOST(role).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Role: '${role.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }


    newRole() {
        this.setStep("form");
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

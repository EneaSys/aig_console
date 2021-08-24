import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigManagementAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';
import { Observable } from 'rxjs';
import { ApplicationModuleDTO, PermissionDTO, PermissionResourceService, RoleDTO } from 'aig-management';

@Component({
    selector: 'aig-permission-new-update-form',
    templateUrl: './permission-new-update-form.component.html',
    styleUrls: ['./permission-new-update-form.component.scss']
})
export class AigPermissionNewUpdateFormComponent implements OnInit {
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
        private permissionResourceService: PermissionResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
  
    ) { }

    @Input()
    permission: PermissionDTO;

    isUpdate: boolean = false;

    permissionNewUpdateForm: FormGroup;

	filteredApplicationModules: Observable<ApplicationModuleDTO[]>;

    ngOnInit(): void {
        this.permissionNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            permissionCode: ['', Validators.required],
            applicationModule: ['', Validators.required],
        });

        if (this.permission != null) {
            this.permissionNewUpdateForm.patchValue(this.permission);
        }

		this.filteredApplicationModules = this.managementAutocompleteFilterService.applicationModuleFilter(this.permissionNewUpdateForm.controls['applicationModule'].valueChanges);
    }

    async submit() {
        if (!this.permissionNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");
    
        let permission: PermissionDTO = {
            name: this.permissionNewUpdateForm.value.name,
            permissionCode: this.permissionNewUpdateForm.value.permissionCode,
            id: this.permissionNewUpdateForm.value.id,
            moduleId: this.permissionNewUpdateForm.value.applicationModule.id,
            
        }
        
        try {
            let postOrPut;
            if (permission.id != 0) {
                await this.permissionResourceService.updatePermissionUsingPUT (permission).toPromise();
                postOrPut = "updated";
            } else {
                await this.permissionResourceService.createPermissionUsingPOST (permission).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Permission: '${permission.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    newPermission() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}


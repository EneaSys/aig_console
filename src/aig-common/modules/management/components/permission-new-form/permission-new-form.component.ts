import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApplicationModuleDTO, PermissionDTO, PermissionResourceService } from 'api-gest';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigManagementAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';

@Component({
    selector: 'aig-permission-new-form',
    templateUrl: './permission-new-form.component.html',
    styleUrls: ['./permission-new-form.component.scss']
})
export class AigPermissionNewFormComponent implements OnInit {
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    constructor(
        public autocompleteDisplayService: AigManagementAutocompleteFunctionService,
        private _formBuilder: FormBuilder,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private permissionResourceService: PermissionResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    permission: PermissionDTO;
    
    filteredApplicationModule: Observable<ApplicationModuleDTO[]>;

    permissionNewForm: FormGroup;

    


    ngOnInit(): void {
        this.permissionNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            permissionCode: ['', Validators.required],
            applicationModule:['',Validators.required],
        })


        if (this.permission != null) {
            this.permissionNewForm.patchValue(this.permission);
        }

        this.filteredApplicationModule = this.managementAutocompleteFilterService.filterApplicationModule(this.permissionNewForm.controls['permissionCode'].valueChanges);
    }

    async submit() {
        if (!this.permissionNewForm.valid) {
            return;
            }
        this._fuseProgressBarService.show();
            this.setStep("loading");
    
        let permission: PermissionDTO = {
			id: this.permissionNewForm.value.id,
			name: this.permissionNewForm.value.name,
			permissionCode: this.permissionNewForm.value.permissionCode,
            moduleId: this.permissionNewForm.value.applicationModule.id,
		};
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

            this._snackBar.open(`Ipp Permission: '${permission.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newInventoryItem() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

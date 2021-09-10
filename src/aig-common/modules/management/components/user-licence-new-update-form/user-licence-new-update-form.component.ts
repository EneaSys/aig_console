import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import {  ApplicationModuleDTO, LicenzeDTO, LicenzeResourceService, PermissionDTO, UserLicenzeDTO, UserLicenzeResourceService } from "aig-management";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-user-licence-new-update-form',
    templateUrl: './user-licence-new-update-form.component.html',
    styleUrls: ['./user-licence-new-update-form.component.scss']
})
export class AigUserLicenceNewUpdateFormComponent implements OnInit {
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
        private userLicenceResourceService: UserLicenzeResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    userLicence: UserLicenzeDTO;

    isUpdate: boolean = false;


    userLicenceNewUpdateForm: FormGroup;

    filteredLicence: Observable<LicenzeDTO[]>;

    ngOnInit(): void { 
        this.userLicenceNewUpdateForm = this._formBuilder.group({
            id:[''],
            licenceName: ['', Validators.required],
            userUserCode:[''],


           
        });


        if (this.userLicence != null) {
            this.userLicenceNewUpdateForm.patchValue(this.userLicence);
            this.isUpdate = true;
        }

        this.filteredLicence = this.managementAutocompleteFilterService.licenceFilter(this.userLicenceNewUpdateForm.controls['licenceName'].valueChanges);
       


    }

    async submit() {
        if (!this.userLicenceNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");
    
        let userLicence: UserLicenzeDTO = this.userLicenceNewUpdateForm.value;
        userLicence.licenze = this.userLicenceNewUpdateForm.value.licenceName.id;
    

        try {
            let postOrPut;
            if (userLicence.id != 0) {
                await this.userLicenceResourceService.updateUserLicenzeUsingPUT (userLicence).toPromise();
                postOrPut = "updated";
            } else {
                await this.userLicenceResourceService.createUserLicenzeUsingPOST (userLicence).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`user Licence: '${userLicence.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    
    newUserLicence() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
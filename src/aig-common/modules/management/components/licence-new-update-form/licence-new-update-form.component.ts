import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import {  ApplicationModuleDTO, LicenzeDTO, LicenzeResourceService, PermissionDTO } from "aig-management";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-licence-new-update-form',
    templateUrl: './licence-new-update-form.component.html',
    styleUrls: ['./licence-new-update-form.component.scss']
})
export class AigLicenceNewUpdateFormComponent implements OnInit {
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
        private licenceResourceService: LicenzeResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    licence: LicenzeDTO;

    isUpdate: boolean = false;


    licenceNewUpdateForm: FormGroup;

    filteredApplicationModules: Observable<ApplicationModuleDTO[]>;


    ngOnInit(): void { 
        this.licenceNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            applicationModule: [''],
        });


        if (this.licence != null) {
            this.licenceNewUpdateForm.patchValue(this.licence);
           
        }

        this.filteredApplicationModules = this.managementAutocompleteFilterService.applicationModuleFilter(this.licenceNewUpdateForm.controls['applicationModule'].valueChanges);
        
    }

    async submit() {
        if (!this.licenceNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");
    
        let licence: LicenzeDTO = this.licenceNewUpdateForm.value;
        licence.moduleId = this.licenceNewUpdateForm.value.applicationModule.id;
    

        try {
            let postOrPut;
            if (licence.id != 0) {
                await this.licenceResourceService.updateLicenzeUsingPUT (licence).toPromise();
                postOrPut = "updated";
            } else {
                await this.licenceResourceService.createLicenzeUsingPOST (licence).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Licence: '${licence.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    
    newLicence() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
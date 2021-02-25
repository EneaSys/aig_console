import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-context-user-new-update-form',
    templateUrl: './context-user-new-update-form.component.html',
    styleUrls: ['./context-user-new-update-form.component.scss']
})
export class AigContextUserNewUpdateFormComponent implements OnInit {
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
        private contextUserResourceService: ContextUserResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    contextUser: ContextUserDTO;

    contextUserNewUpdateForm: FormGroup;

	filteredTenantContexts: Observable<TenantContextDTO[]>;


    ngOnInit(): void { 
        this.contextUserNewUpdateForm = this._formBuilder.group({
            id:[''],
            userCode: ['', Validators.required],
            tenantContext: ['', Validators.required],
        });


        if (this.contextUser != null) {
            this.contextUserNewUpdateForm.patchValue(this.contextUser);
        }

		this.filteredTenantContexts = this.managementAutocompleteFilterService.tenantContextFilter(this.contextUserNewUpdateForm.controls['tenantContext'].valueChanges);
    }

    async submit() {
        if (!this.contextUserNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");
    
        let contextUser: ContextUserDTO = {
            id: this.contextUserNewUpdateForm.value.id,
            status: this.contextUserNewUpdateForm.value.status,
            type: this.contextUserNewUpdateForm.value.type, 
            userCode: this.contextUserNewUpdateForm.value.user.code,
            userMemberOfs: this.contextUserNewUpdateForm.value.user.member.ofs,  
        }; 

        try {
            let postOrPut;
            if (contextUser.id != 0) {
                await this.contextUserResourceService.updateContextUserUsingPUT (contextUser).toPromise();
                postOrPut = "updated";
            } else {
                await this.contextUserResourceService.createContextUserUsingPOST (contextUser).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Context User: '${contextUser.userCode}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    newContextUser() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
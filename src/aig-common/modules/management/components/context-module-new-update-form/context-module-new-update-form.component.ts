import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ApplicationModuleDTO, ContextModuleDTO, ContextModuleResourceService, TenantContextDTO } from 'aig-management';
import { Observable } from 'rxjs';
import { AigManagementAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigManagementAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';

@Component({
    selector: 'aig-context-module-new-update-form',
    templateUrl: './context-module-new-update-form.component.html',
    styleUrls: ['./context-module-new-update-form.component.scss']
})
export class AigContextModuleNewUpdateFormComponent implements OnInit {
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
        private contextModuleResourceService: ContextModuleResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
  ) { }

    @Input()
    contextModule: ContextModuleDTO;

	@Input()
	applicationModule: ApplicationModuleDTO;

    isUpdate: boolean = false;

    contextModuleNewUpdateForm: FormGroup;

    filteredApplicationModules: Observable<ApplicationModuleDTO[]>;
    filteredTenantContexts: Observable<TenantContextDTO[]>;

    ngOnInit(): void {
        this.contextModuleNewUpdateForm = this._formBuilder.group({
            id:[''],
            active: [false],
            applicationModule: [this.applicationModule, Validators.required],
            tenantContext: ['', Validators.required]
        })
        
        if (this.contextModule != null) {
            this.contextModuleNewUpdateForm.patchValue(this.contextModule);
            this.isUpdate = true;
        }    

        this.filteredApplicationModules = this.managementAutocompleteFilterService.applicationModuleFilter(this.contextModuleNewUpdateForm.controls['applicationModule'].valueChanges);
        this.filteredTenantContexts = this.managementAutocompleteFilterService.tenantContextFilter(this.contextModuleNewUpdateForm.controls['tenantContext'].valueChanges);
    }    
    async submit() {
        if (!this.contextModuleNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let contextModule: any = this.contextModuleNewUpdateForm.value;
            contextModule.moduleId = this.contextModuleNewUpdateForm.value.applicationModule.id;
            contextModule.contextId = this.contextModuleNewUpdateForm.value.tenantContext.id; 

        try {
            let postOrPut;
            if ( this.isUpdate) {
                await this.contextModuleResourceService.updateContextModuleUsingPUT(contextModule).toPromise();
                postOrPut = "updated";
            } else {
                await this.contextModuleResourceService.createContextModuleUsingPOST(contextModule).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`ContextModule: '${contextModule.active}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }


    newContextModule() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

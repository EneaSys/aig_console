import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import { ApplicationModuleDTO } from "api-gest";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-personalization-new-update-form',
    templateUrl: './personalization-new-update-form.component.html',
    styleUrls: ['./personalization-new-update-form.component.scss']
})
export class AigPersonalizationNewUpdateFormComponent implements OnInit {
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
        private personalizationResourceService: PersonalizationResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
  ) { }

    @Input()
    personalization: PersonalizationDTO;

    personalizationNewUpdateForm: FormGroup;

    filteredApplicationModules: Observable<ApplicationModuleDTO[]>;

    ngOnInit(): void {
        this.personalizationNewUpdateForm = this._formBuilder.group({
            id:[''],
            active: ['', Validators.required],
            applicationModule: ['', Validators.required],
        })
        
        if (this.personalization != null) {
            this.personalizationNewUpdateForm.patchValue(this.personalization);
        }
    

    this.filteredApplicationModules = this.managementAutocompleteFilterService.applicationModuleFilter(this.personalizationNewUpdateForm.controls['applicationModule'].valueChanges);
    
}
    
    async submit() {
        if (!this.personalizationNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let personalization: PersonalizationDTO = {
            id: this.personalizationNewUpdateForm.value.id,
            active: this.personalizationNewUpdateForm.value.active,
            moduleId: this.personalizationNewUpdateForm.value.module.id,
            moduleName: this.personalizationNewUpdateForm.value.module.name,
            contextId: this.personalizationNewUpdateForm.value.context.id,
            contextName: this.personalizationNewUpdateForm.value.context.name,
         
        }; 
        try {
            let postOrPut;
            if ( personalization.id != 0) {
                await this.personalizationResourceService.updatePersonalizationUsingPUT(personalization).toPromise();
                postOrPut = "updated";
            } else {
                await this.personalizationResourceService.createPersonalizationUsingPOST(personalization).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Personalization: '${personalization.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }


    newPersonalization() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
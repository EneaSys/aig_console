import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import { ApplicationModuleDTO, EntityReferenceDTO, EntityReferenceResourceService } from "aig-management";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-entity-reference-new-update-form',
    templateUrl: './entity-reference-new-update-form.component.html',
    styleUrls: ['./entity-reference-new-update-form.component.scss']
})
export class AigEntityReferenceNewUpdateFormComponent implements OnInit {
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
        private entityReferenceResourceService: EntityReferenceResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    entityReference: EntityReferenceDTO;

    isUpdate: boolean = false;


    entityReferenceNewUpdateForm: FormGroup;

	filteredApplicationModules: Observable<ApplicationModuleDTO[]>;


    ngOnInit(): void { 
        this.entityReferenceNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            applicationModule: ['', Validators.required],
        });


        if (this.entityReference != null) {
            this.entityReferenceNewUpdateForm.patchValue(this.entityReference);
            this.isUpdate = true;
        }

		this.filteredApplicationModules = this.managementAutocompleteFilterService.applicationModuleFilter(this.entityReferenceNewUpdateForm.controls['applicationModule'].valueChanges);
    }

    async submit() {
        if (!this.entityReferenceNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");
    
        let entityReference: EntityReferenceDTO = {
            id: this.entityReferenceNewUpdateForm.value.id,
            name: this.entityReferenceNewUpdateForm.value.name,
            moduleId: this.entityReferenceNewUpdateForm.value.applicationModule.id, 
            moduleName: this.entityReferenceNewUpdateForm.value.applicationModule.name,  
        }; 

        try {
            let postOrPut;
            if (entityReference.id != 0) {
                await this.entityReferenceResourceService.updateEntityReferenceUsingPUT (entityReference).toPromise();
                postOrPut = "updated";
            } else {
                await this.entityReferenceResourceService.createEntityReferenceUsingPOST (entityReference).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Entity Reference: '${entityReference.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    
    newEntityReference() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
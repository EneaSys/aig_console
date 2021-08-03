import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import {ApplicationModuleDTO, EntityReferenceDTO, ObjectReferenceDTO, ObjectReferenceResourceService, TenantContextDTO } from "aig-management";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-object-reference-new-update-form',
    templateUrl: './object-reference-new-update-form.component.html',
    styleUrls: ['./object-reference-new-update-form.component.scss']
})
export class AigObjectReferenceNewUpdateFormComponent implements OnInit {
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
        private objectReferenceResourceService: ObjectReferenceResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    objectReference: ObjectReferenceDTO;

    isUpdate: boolean = false;

    objectReferenceNewUpdateForm: FormGroup;

    filteredEntityReference: Observable<EntityReferenceDTO[]>;
    filteredApplicationModule: Observable<ApplicationModuleDTO[]>;



    ngOnInit(): void { 
        this.objectReferenceNewUpdateForm = this._formBuilder.group({
            id:[''],
            name:[''],
            isTypezed: [false],
            haveStatus: [false],
            haveGroup: [false],
            module:[''],
            entity:[''],
            moduleId:[''],
            entityId:[''],
        });


        if (this.objectReference != null) {
            this.objectReferenceNewUpdateForm.patchValue(this.objectReference);
            this.isUpdate = true;
        }

        this.filteredEntityReference = this.managementAutocompleteFilterService.entityReferenceFilter(this.objectReferenceNewUpdateForm.controls['entity'].valueChanges);
        this.filteredApplicationModule = this.managementAutocompleteFilterService.applicationModuleFilter(this.objectReferenceNewUpdateForm.controls['module'].valueChanges);

	
    }

    async submit() {
        if (!this.objectReferenceNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let objectReference: ObjectReferenceDTO = this.objectReferenceNewUpdateForm.value;
        objectReference.entityId = this.objectReferenceNewUpdateForm.value.entity.id;
        objectReference.moduleId = this.objectReferenceNewUpdateForm.value.module.id;
    

        try {
            let postOrPut;
            if (objectReference.id != 0) {
                await this.objectReferenceResourceService.updateObjectReferenceUsingPUT(objectReference).toPromise();
                postOrPut = "updated";
            } else {
                await this.objectReferenceResourceService.createObjectReferenceUsingPOST (objectReference).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`object Reference: '${objectReference.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    newObjectReference() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
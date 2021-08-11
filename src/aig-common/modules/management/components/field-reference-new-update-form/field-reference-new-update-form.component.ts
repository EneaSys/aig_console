import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import {ApplicationModuleDTO, EntityReferenceDTO, FieldReferenceDTO, FieldReferenceResourceService, ObjectReferenceDTO, ObjectReferenceResourceService, TenantContextDTO } from "aig-management";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-field-reference-new-update-form',
    templateUrl: './field-reference-new-update-form.component.html',
    styleUrls: ['./field-reference-new-update-form.component.scss']
})
export class AigFieldReferenceNewUpdateFormComponent implements OnInit {
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
        private fieldReferenceResourceService: FieldReferenceResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    fieldReference: FieldReferenceDTO;

    isUpdate: boolean = false;

    fieldReferenceNewUpdateForm: FormGroup;

    filteredEntityReference: Observable<EntityReferenceDTO[]>;




    ngOnInit(): void { 
        this.fieldReferenceNewUpdateForm = this._formBuilder.group({
            id:[''],
            name:[''],
            isRequired: [false],
            isUnique: [false],
            minLength:[''],
            entity:[''],
            maxLength:[''],
            entityId:[''],
            type:[''],
            patternValue:[''],
            minBytesValue:[''],
            maxBytesValue:[''],
        });


        if (this.fieldReference != null) {
            this.fieldReferenceNewUpdateForm.patchValue(this.fieldReference);
        }

        this.filteredEntityReference = this.managementAutocompleteFilterService.entityReferenceFilter(this.fieldReferenceNewUpdateForm.controls['entity'].valueChanges);
        

	
    }

    async submit() {
        if (!this.fieldReferenceNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let fieldReference: FieldReferenceDTO = this.fieldReferenceNewUpdateForm.value;
        fieldReference.entityId = this.fieldReferenceNewUpdateForm.value.entity.id;
    

        try {
            let postOrPut;
            if (fieldReference.id != 0) {
                await this.fieldReferenceResourceService.updateFieldReferenceUsingPUT(fieldReference).toPromise();
                postOrPut = "updated";
            } else {
                await this.fieldReferenceResourceService.createFieldReferenceUsingPOST (fieldReference).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`field Reference: '${fieldReference.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    newFieldReference() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
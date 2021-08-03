import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import {ApplicationModuleDTO, EntityReferenceDTO, ObjectReferenceDTO, ObjectReferenceResourceService, TenantContextDTO, TypeCategoryReferenceDTO, TypeCategoryReferenceResourceService } from "aig-management";
import { Observable } from "rxjs";
import { AigManagementAutocompleteFilterService } from "../../services/form/autocomplete-filter.service";
import { AigManagementAutocompleteFunctionService } from "../../services/form/autocomplete-function.service";

@Component({
    selector: 'aig-type-category-reference-new-update-form',
    templateUrl: './type-category-reference-new-update-form.component.html',
    styleUrls: ['./type-category-reference-new-update-form.component.scss']
})
export class AigTypeCategoryReferenceNewUpdateFormComponent implements OnInit {
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
        private typeCategoryReferenceResourceService: TypeCategoryReferenceResourceService,
        private managementAutocompleteFilterService: AigManagementAutocompleteFilterService,
        public managementAutocompleteFunctionService: AigManagementAutocompleteFunctionService,
    ) { }

    @Input()
    typeCategoryReference: TypeCategoryReferenceDTO;

    isUpdate: boolean = false;

    typeCategoryReferenceNewUpdateForm: FormGroup;
    filteredEntityReference: Observable<EntityReferenceDTO[]>;
    filteredObjectReference: Observable<ObjectReferenceDTO[]>;



    ngOnInit(): void { 
        this.typeCategoryReferenceNewUpdateForm = this._formBuilder.group({
            id:[''],
            name:[''],
            code:[''],
            entity:[''],
            object:[''],
        });


        if (this.typeCategoryReference != null) {
            this.typeCategoryReferenceNewUpdateForm.patchValue(this.typeCategoryReference);
            this.isUpdate = true;
        }
	
        this.filteredEntityReference = this.managementAutocompleteFilterService.entityReferenceFilter(this.typeCategoryReferenceNewUpdateForm.controls['entity'].valueChanges);
        this.filteredObjectReference = this.managementAutocompleteFilterService.objectReferenceFilter(this.typeCategoryReferenceNewUpdateForm.controls['object'].valueChanges);
    }

    async submit() {
        if (!this.typeCategoryReferenceNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let typeCategoryReference: TypeCategoryReferenceDTO = this.typeCategoryReferenceNewUpdateForm.value;
        typeCategoryReference.entityId = this.typeCategoryReferenceNewUpdateForm.value.entity.id;
        typeCategoryReference.objectReferenceId = this.typeCategoryReferenceNewUpdateForm.value.object.id;
    

        try {
            let postOrPut;
            if (typeCategoryReference.id != 0) {
                await this.typeCategoryReferenceResourceService.updateTypeCategoryReferenceUsingPUT(typeCategoryReference).toPromise();
                postOrPut = "updated";
            } else {
                await this.typeCategoryReferenceResourceService.createTypeCategoryReferenceUsingPOST (typeCategoryReference).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`type category Reference: '${typeCategoryReference.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }
    newTypeCategoryReference() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
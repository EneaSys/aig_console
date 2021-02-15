import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import { AigAutocompleteDisplayService } from "aig-common/modules/commerce/service/autocomplete-display.service";
import { AigCommerceAutocompleteService } from "aig-common/modules/commerce/service/autocomplete-filter.service";
import { ApplicationModuleDTO, EntityReferenceDTO, EntityReferenceResourceService } from "api-gest";
import { Observable } from "rxjs";

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
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		private _fuseProgressBarService: FuseProgressBarService,
        private entityReferenceResourceService: EntityReferenceResourceService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    entityReference: EntityReferenceDTO;

    entityReferenceNewUpdateForm: FormGroup;

	filteredApplicationModule: Observable<ApplicationModuleDTO[]>;


    ngOnInit(): void { 
        this.entityReferenceNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            applicationModule: ['', Validators.required],
        });


        if (this.entityReference != null) {
            this.entityReferenceNewUpdateForm.patchValue(this.entityReference);
        }

		this.filteredApplicationModule = this.commerceAutocompleteService.filterEntityReference(this.entityReferenceNewUpdateForm.controls['applicationModule'].valueChanges);
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

            this._snackBar.open(`Ipp Social: '${entityReference.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
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
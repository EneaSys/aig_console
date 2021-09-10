import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { PartecipationDTO, PreparationDTO, PreparationModalityDTO, PreparationResourceService, PreparationStatusDTO } from 'aig-italianlegislation';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-preparation-new-update-form',
    templateUrl: './preparation-new-update-form.component.html',
    styleUrls: ['./preparation-new-update-form.component.scss']
})
export class AigPreparationNewUpdateFormComponent implements OnInit {
	@Input()
    preparation: PreparationDTO;

    @Input()
    partecipation: PartecipationDTO;
    
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private preparationResourceService: PreparationResourceService,
        private eventService: EventService,
        private ippAutocompleteFilterService:  AigIppAutocompleteService,
        public ippAutocompleteDisplayService: AigIppAutocompleteDisplayService,
        public genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
    ) { }
	
	step: any = {
        form: true,
        loading: false,
        complete: false
    };



    preparationNewUpdateForm: FormGroup;

    isUpdate: boolean = false;

    preparationResult: any;

    filteredEopoo: Observable<EopooDTO[]>;
    filteredPartecipation: Observable<PartecipationDTO[]>;
	filteredPreparationModality: Observable<PreparationModalityDTO[]>;
    filteredPreparationStatus: Observable<PreparationStatusDTO[]>;

    ngOnInit(): void {
        this.preparationNewUpdateForm = this._formBuilder.group({
            id: [''],
            companyPreparatorEopoo: ['',[Validators.required, AigValidator.haveId] ],
            partecipation: [this.partecipation,[Validators.required, AigValidator.haveId] ],
            note: [''],
			modality: ['',[Validators.required, AigValidator.haveId] ],
            status: ['',[Validators.required, AigValidator.haveId] ],
        })
        
        if (this.preparation != null) {
            this.preparationNewUpdateForm.patchValue(this.preparation);
            this.isUpdate = true;
        }
        
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.preparationNewUpdateForm.controls['companyPreparatorEopoo'].valueChanges);
        this.filteredPartecipation = this.ippAutocompleteFilterService.filterPartecipation(this.preparationNewUpdateForm.controls['partecipation'].valueChanges);
		this.filteredPreparationModality = this.ippAutocompleteFilterService.filterPreparationModality(this.preparationNewUpdateForm.controls['modality'].valueChanges);
        this.filteredPreparationStatus = this.ippAutocompleteFilterService.filterPreparationStatus(this.preparationNewUpdateForm.controls['status'].valueChanges);
    }

    async submit() {
        if (!this.preparationNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let preparation: PreparationDTO = this.preparationNewUpdateForm.value;
        preparation.partecipationId = this.preparationNewUpdateForm.value.partecipation.id;
        preparation.companyPreparatorEopooCode = this.preparationNewUpdateForm.value.companyPreparatorEopoo.id;
        preparation.statusId = this.preparationNewUpdateForm.value.status.id;
		preparation.modalityId = this.preparationNewUpdateForm.value.modality.id;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.preparationResourceService.updatePreparationUsingPUT(preparation).toPromise();
                postOrPut = "updated";
            } else {
                await this.preparationResourceService.createPreparationUsingPOST(preparation).toPromise();
                postOrPut = "created";
            }

            this.preparationResult = preparation;
            
            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newPreparation() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }

}
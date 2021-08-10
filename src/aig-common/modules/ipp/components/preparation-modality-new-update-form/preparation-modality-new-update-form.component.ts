import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { PartecipationDTO, PartecipationResourceService, PartecipationStatusDTO, PreparationModalityDTO, PreparationModalityResourceService, ProcurementLotDTO } from 'aig-italianlegislation';
import { IlPpPartecipationTypeDTO } from 'aig-standard';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-preparation-modality-new-update-form',
    templateUrl: './preparation-modality-new-update-form.component.html',
    styleUrls: ['./preparation-modality-new-update-form.component.scss']
})
export class AigPreparationModalityNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private preparationModalityResourceService: PreparationModalityResourceService,
        private eventService: EventService,
        public ippAutocompleteDisplayService: AigIppAutocompleteDisplayService,
        private ippAutocompleteService: AigIppAutocompleteService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
        private standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public standardAutocompleteFunctionService: AigStandardAutocompleteDisplayService,
    ) { }

    @Input()
    preparationModality: PreparationModalityDTO;

    @Input()
    preparationModalityNewUpdateForm: FormGroup;

    isUpdate: boolean = false;

    preparationModalityResult: any;
    
   
    ngOnInit(): void {
        this.preparationModalityNewUpdateForm = this._formBuilder.group({
            id:[''],
            description:[''],
           
        })
        
        if (this.preparationModality != null && this.preparationModality.id != null) {
            this.preparationModalityNewUpdateForm.patchValue(this.preparationModality);
            this.isUpdate = true;
        }
        
        
    }

    async submit() {
        if (!this.preparationModalityNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

       let preparationModality: PreparationModalityDTO = this.preparationModalityNewUpdateForm.value;
       
        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.preparationModalityResourceService.updatePreparationModalityUsingPUT(preparationModality).toPromise();
                postOrPut = "updated";
            } else {
                await this.preparationModalityResourceService.createPreparationModalityUsingPOST(preparationModality).toPromise();
                postOrPut = "created";
            }
        

            this.preparationModalityResult = preparationModality;
            

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newPreparationModality() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }

}
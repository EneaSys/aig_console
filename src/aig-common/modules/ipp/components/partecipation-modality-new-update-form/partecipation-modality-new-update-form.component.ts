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
import { PartecipationDTO, PartecipationModalityDTO, PartecipationModalityResourceService, PartecipationResourceService, PartecipationStatusDTO, ProcurementLotDTO } from 'aig-italianlegislation';
import { IlPpPartecipationTypeDTO } from 'aig-standard';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-partecipation-modality-new-update-form',
    templateUrl: './partecipation-modality-new-update-form.component.html',
    styleUrls: ['./partecipation-modality-new-update-form.component.scss']
})
export class AigPartecipationModalityNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private partecipationModalityResourceService: PartecipationModalityResourceService,
        private eventService: EventService,
        public ippAutocompleteDisplayService: AigIppAutocompleteDisplayService,
        private ippAutocompleteService: AigIppAutocompleteService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
        private standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public standardAutocompleteFunctionService: AigStandardAutocompleteDisplayService,
    ) { }

    @Input()
    partecipationModality: PartecipationModalityDTO;

    @Input()
    partecipationModalityNewUpdateForm: FormGroup;

    isUpdate: boolean = false;

    partecipationModalityResult: any;
    
   
    ngOnInit(): void {
        this.partecipationModalityNewUpdateForm = this._formBuilder.group({
            id:[''],
            description:[''],
           
        })
        
        if (this.partecipationModality != null) {
            this.partecipationModalityNewUpdateForm.patchValue(this.partecipationModality);
            this.isUpdate = true;
        }
        
        
    }

    async submit() {
        if (!this.partecipationModalityNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

       let partecipationModality: PartecipationModalityDTO = this.partecipationModalityNewUpdateForm.value;
       
        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.partecipationModalityResourceService.updatePartecipationModalityUsingPUT(partecipationModality).toPromise();
                postOrPut = "updated";
            } else {
                await this.partecipationModalityResourceService.createPartecipationModalityUsingPOST(partecipationModality).toPromise();
                postOrPut = "created";
            }
        

            this.partecipationModalityResult = partecipationModality;
            

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newPartecipationModality() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }

}
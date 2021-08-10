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
import { PartecipationDTO, PartecipationModalityDTO, PartecipationResourceService, PartecipationStatusDTO, ProcurementLotDTO } from 'aig-italianlegislation';
import { IlPpPartecipationTypeDTO } from 'aig-standard';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-partecipation-new-update-form',
    templateUrl: './partecipation-new-update-form.component.html',
    styleUrls: ['./partecipation-new-update-form.component.scss']
})
export class AigPartecipationNewUpdateFormComponent implements OnInit {
	@Input()
    partecipation: PartecipationDTO;

    @Input()
    procurementLot: ProcurementLotDTO;

	@Input()
    proposerEopoo: EopooDTO;


    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private partecipationResourceService: PartecipationResourceService,
        private eventService: EventService,
        public ippAutocompleteDisplayService: AigIppAutocompleteDisplayService,
        private ippAutocompleteService: AigIppAutocompleteService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
        private standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public standardAutocompleteFunctionService: AigStandardAutocompleteDisplayService,
    ) { }



    partecipationNewUpdateForm: FormGroup;

    isUpdate: boolean = false;

    partecipationResult: any;
    
    filteredProcurementLot: Observable<ProcurementLotDTO[]>;
    filteredEopoo: Observable<EopooDTO[]>;
	filteredPartecipationModality: Observable<PartecipationModalityDTO[]>;
    filteredPartecipationStatus: Observable<PartecipationStatusDTO[]>;
    filteredPartecipationType: Observable<IlPpPartecipationTypeDTO[]>;
    
    ngOnInit(): void {
        this.partecipationNewUpdateForm = this._formBuilder.group({
            id: [null],

            procurementLot: [this.procurementLot, [Validators.required, AigValidator.haveId]],
            proposerEopoo: [this.proposerEopoo, [Validators.required, AigValidator.haveId]],

			modality: [null, [Validators.required, AigValidator.haveId]],
            status: [null, [Validators.required, AigValidator.haveId]],
            
			type: [null, [AigValidator.haveId]],

            siteInspection: [false],
        })
        
        if (this.partecipation != null && this.partecipation.id != null) {
            this.partecipationNewUpdateForm.patchValue(this.partecipation);
            this.isUpdate = true;
        }
        
        this.filteredProcurementLot = this.ippAutocompleteService.filterProcurementLot(this.partecipationNewUpdateForm.controls['procurementLot'].valueChanges);
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationNewUpdateForm.controls['proposerEopoo'].valueChanges);
        this.filteredPartecipationModality = this.ippAutocompleteService.filterPartecipationModality(this.partecipationNewUpdateForm.controls['modality'].valueChanges);
		this.filteredPartecipationStatus = this.ippAutocompleteService.filterPartecipationStatus(this.partecipationNewUpdateForm.controls['status'].valueChanges);
        this.filteredPartecipationType = this.standardAutocompleteFilterService.filterIlPpPartecipationType(this.partecipationNewUpdateForm.controls['type'].valueChanges);
    }

    async submit() {
        if (!this.partecipationNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let partecipation: PartecipationDTO = this.partecipationNewUpdateForm.value;
        
		partecipation.procurementLotId = this.partecipationNewUpdateForm.value.procurementLot.id;
        partecipation.proposerEopooCode = this.partecipationNewUpdateForm.value.proposerEopoo.id;
        
		partecipation.statusId = this.partecipationNewUpdateForm.value.status.id;
		partecipation.modalityId = this.partecipationNewUpdateForm.value.modality.id;
        
		partecipation.partecipationTypeCode = (this.partecipationNewUpdateForm.value.type) ? this.partecipationNewUpdateForm.value.type.code : null;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.partecipationResourceService.updatePartecipationUsingPUT(partecipation).toPromise();
                postOrPut = "updated";
            } else {
                await this.partecipationResourceService.createPartecipationUsingPOST(partecipation).toPromise();
                postOrPut = "created";
            }

            this.partecipationResult = partecipation;
            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newPartecipation() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }

}
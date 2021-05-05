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
import { PartecipationDTO, PartecipationResourceService, PartecipationStatusDTO, ProcurementLotDTO } from 'aig-italianlegislation';
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

    @Input()
    partecipation: PartecipationDTO;

    partecipationNewUpdateForm: FormGroup;
    
    filteredPartecipationType: Observable<IlPpPartecipationTypeDTO[]>;

    filteredEopoo: Observable<EopooDTO[]>;

    filteredProcurementLot: Observable<ProcurementLotDTO[]>;
    filteredPartecipationStatus: Observable<PartecipationStatusDTO[]>;
    

    ngOnInit(): void {
        this.partecipationNewUpdateForm = this._formBuilder.group({
            id: [''],

            status: ['', [Validators.required, AigValidator.haveId]],
            procurementLot: ['', [Validators.required, AigValidator.haveId]],

            partecipationType: ['', [Validators.required, AigValidator.haveId]],
            proposerEopoo: ['', [Validators.required, AigValidator.haveId]],

            siteInspection: [true],
        })
        
        if (this.partecipation != null) {
            this.partecipationNewUpdateForm.patchValue(this.partecipation);
        }
        
        this.filteredPartecipationType = this.standardAutocompleteFilterService.filterIlPpPartecipationType(this.partecipationNewUpdateForm.controls['partecipationType'].valueChanges);
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationNewUpdateForm.controls['proposerEopoo'].valueChanges);

        this.filteredProcurementLot = this.ippAutocompleteService.filterProcurementLot(this.partecipationNewUpdateForm.controls['procurementLot'].valueChanges);
        this.filteredPartecipationStatus = this.ippAutocompleteService.filterPartecipationStatus(this.partecipationNewUpdateForm.controls['status'].valueChanges);

    }

    async submit() {
        if (!this.partecipationNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let partecipation: PartecipationDTO = this.partecipationNewUpdateForm.value;
        partecipation.partecipationTypeCode = this.partecipationNewUpdateForm.value.partecipationType.code;
        partecipation.proposerEopooCode = this.partecipationNewUpdateForm.value.proposerEopoo.id;
        partecipation.statusId = this.partecipationNewUpdateForm.value.status.id;
        partecipation.procurementLotId = this.partecipationNewUpdateForm.value.procurementLot.id;

        try {
            let postOrPut: string;

            if (this.partecipation.id > 0) {
                await this.partecipationResourceService.updatePartecipationUsingPUT(partecipation).toPromise();
                postOrPut = "updated";
            } else {
                await this.partecipationResourceService.createPartecipationUsingPOST(partecipation).toPromise();
                postOrPut = "created";
            }
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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteFunctionService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { PartecipationDTO, PartecipationResourceService, ProcurementLotDTO } from 'aig-italianlegislation';
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
        public ippAutocompleteDisplayService : AigIppAutocompleteDisplayService,
        private ippAutocompleteService :AigIppAutocompleteService,
        private genericAutocompleteFilterService :AigGenericAutocompleteFilterService,
        public genericAutocompleteFunctionService :AigGenericAutocompleteFunctionService,
    ) { }

    @Input()
    partecipation: PartecipationDTO;

    partecipationNewUpdateForm: FormGroup;

    filteredProcurementLot: Observable<ProcurementLotDTO[]>;
    filteredEopoo: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.partecipationNewUpdateForm = this._formBuilder.group({
            id: [''],
            siteInspection: [''],

            status: [''],
            procurementLot: [''],
            partecipationType: [''],

            proposerEopoo: [''],
        })
        
        if (this.partecipation != null) {
            this.partecipationNewUpdateForm.patchValue(this.partecipation);
        }
        
        this.filteredProcurementLot = this.ippAutocompleteService.filterProcurementLot(this.partecipationNewUpdateForm.controls['procurementLot'].valueChanges);
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.partecipationNewUpdateForm.controls['proposerEopoo'].valueChanges);
    }

    async submit() {
        if (!this.partecipationNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let partecipation: PartecipationDTO = this.partecipationNewUpdateForm.value;

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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';

import { ProcurementDTO, ProcurementLotDTO, ProcurementLotResourceService,  } from 'aig-italianlegislation';
import { CpvDTO, ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotTypeDTO } from 'aig-standard';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-procurement-lot-new-update-form',
    templateUrl: './procurement-lot-new-update-form.component.html',
    styleUrls: ['./procurement-lot-new-update-form.component.scss']
})
export class AigProcurementLotNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementLotResourceService: ProcurementLotResourceService,
        
        private standardAutocompleteFilterService : AigStandardAutocompleteFilterService,
        public standardAutocompleteDisplayService : AigStandardAutocompleteDisplayService,
        
        private ippAutocompleteFilterService : AigIppAutocompleteService,
        public ippAutocompleteDisplayService : AigIppAutocompleteDisplayService,
        
        private eventService: EventService,
    ) { }

    @Input()
    procurementLot: ProcurementLotDTO;

    procurementLotNewUpdateForm: FormGroup;

    filteredProcurement: Observable<ProcurementDTO[]>;
    filteredIppLotType: Observable<ItalianPublicProcurementLotTypeDTO[]>;
    filteredIppLotCategory: Observable<ItalianPublicProcurementLotCategoryDTO[]>;
    filteredCpv: Observable<CpvDTO[]>;




    ngOnInit(): void {
        this.procurementLotNewUpdateForm = this._formBuilder.group({
            id: [''],
            procurement: ['', [Validators.required, AigValidator.haveId] ],
            cig: ['', Validators.required],
            description: ['', Validators.required],
            offerExpiryDate: ['', Validators.required],
            baseAmount: ['', Validators.required],
            securityAmount: [''],
            istatCode: [''],
            nustCode: [''],
            ippLotType: ['', [Validators.required, AigValidator.haveId] ],
            ippLotCategory: ['', [Validators.required, AigValidator.haveId] ],
            cpv: ['', [Validators.required, AigValidator.haveId]],
            awardCriterion: [''],
            procurementLotStatus: [''],
        })
        
        if (this.procurementLot != null) {
            this.procurementLotNewUpdateForm.patchValue(this.procurementLot);
        }

        this.filteredProcurement = this.ippAutocompleteFilterService.filterProcurement(this.procurementLotNewUpdateForm.controls['procurement'].valueChanges);
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.procurementLotNewUpdateForm.controls['ippLotType'].valueChanges);
        this.filteredIppLotCategory = this.standardAutocompleteFilterService.filterIppLotCategory(this.procurementLotNewUpdateForm.controls['ippLotCategory'].valueChanges);
        this.filteredCpv = this.standardAutocompleteFilterService.filterCpv(this.procurementLotNewUpdateForm.controls['cpv'].valueChanges);


    }

    async submit() {
        if (!this.procurementLotNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procurementLot: ProcurementLotDTO = this.procurementLotNewUpdateForm.value;
        procurementLot.procurementId = this.procurementLotNewUpdateForm.value.procurement.id;
        procurementLot.ippLotCategoryCode = this.procurementLotNewUpdateForm.value.ippLotCategory.id;
        procurementLot.ippLotTypeCode = this.procurementLotNewUpdateForm.value.ippLotType.id;
        procurementLot.cpvCode = this.procurementLotNewUpdateForm.value.cpv.id;
        procurementLot.awardCriterionCode = "1";
        procurementLot.procurementLotStatusCode = "1";


        

        try {
            let postOrPut: string;

            if (this.procurementLot.id > 0) {
                await this.procurementLotResourceService.updateProcurementLotUsingPUT(procurementLot).toPromise();
                postOrPut = "updated";
            } else {
                await this.procurementLotResourceService.createProcurementLotUsingPOST(procurementLot).toPromise();
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

    newProcurement() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

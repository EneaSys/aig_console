import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';

import { ProcurementLotDTO, ProcurementLotResourceService,  } from 'aig-italianlegislation';
import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotTypeDTO } from 'aig-standard';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';

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
        private standardAutocompleteDisplayService : AigStandardAutocompleteDisplayService,
        private ippAutocompleteDisplayService : AigIppAutocompleteDisplayService,
        
        private eventService: EventService,
    ) { }

    @Input()
    procurementLot: ProcurementLotDTO;

    procurementLotNewUpdateForm: FormGroup;

    filteredIppLotType: Observable<ItalianPublicProcurementLotTypeDTO[]>;
    filteredIppLotCategory: Observable<ItalianPublicProcurementLotCategoryDTO[]>;




    ngOnInit(): void {
        this.procurementLotNewUpdateForm = this._formBuilder.group({
            id: [''],
            cig: ['', Validators.required],
            description: ['', Validators.required],
            offerExpiryDate: ['', Validators.required],
            baseAmount: ['', Validators.required],
            securityAmount: [''],
            istatCode: [''],
            nustCode: [''],
            ippLotType: ['', Validators.required],
            ippLotCategory: ['', Validators.required],
            cpvCode: ['', Validators.required],
            awardCriterionCode: [''],
            procurementLotStatusCode: [''],
        })
        
        if (this.procurementLot != null) {
            this.procurementLotNewUpdateForm.patchValue(this.procurementLot);
        }
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.procurementLotNewUpdateForm.controls['ippLotType'].valueChanges);
        this.filteredIppLotCategory = this.standardAutocompleteFilterService.filterIppLotCategory(this.procurementLotNewUpdateForm.controls['ippLotCategory'].valueChanges);


    }

    async submit() {
        if (!this.procurementLotNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procurementLot: ProcurementLotDTO = {
            baseAmount: this.procurementLotNewUpdateForm.value.baseAmount,
            cig: this.procurementLotNewUpdateForm.value.cig,
            cpvCode: this.procurementLotNewUpdateForm.value.cpvCode,
            description: this.procurementLotNewUpdateForm.value.description,
            ippLotCategoryCode: this.procurementLotNewUpdateForm.value.ippLotCategory.id,
            ippLotTypeCode: this.procurementLotNewUpdateForm.value.ippLotType,
            offerExpiryDate: this.procurementLotNewUpdateForm.value.offerExpiryDate,
            id: this.procurementLotNewUpdateForm.value.id,
            istatCode: this.procurementLotNewUpdateForm.value.istatCode,
            nutsCode: this.procurementLotNewUpdateForm.value.nutsCode,
            securityAmount: this.procurementLotNewUpdateForm.value.securityAmount,
            procurementId:1,
            awardCriterionCode: this.procurementLotNewUpdateForm.value.awardCriterionCode,
            procurementLotStatusCode: this.procurementLotNewUpdateForm.value.procurementLotStatusCode,
        }
        

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

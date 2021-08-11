import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { DesignatedCompanyDTO, DesignatedCompanyResourceService,IlPpProcurementLotCategoryDTO,PartecipationDTO, ProcurementLotCategoryDTO, ProcurementLotCategoryResourceService, ProcurementLotDTO } from 'aig-italianlegislation';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';

@Component({
    selector: 'aig-procurement-lot-category-new-update-form',
    templateUrl: './procurement-lot-category-new-update-form.component.html',
    styleUrls: ['./procurement-lot-category-new-update-form.component.scss']
})
export class AigProcurementLotCategoryNewUpdateFormComponent implements OnInit {
	@Input()
    procurementLotCategory: ProcurementLotCategoryDTO;
	
	@Input()
    procurementLot: ProcurementLotDTO;


    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementLotCategoryResourceService: ProcurementLotCategoryResourceService,
        private eventService: EventService,
        private ippAutocompleteService: AigIppAutocompleteService,
        public standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public standardAutocompleteDisplayService: AigStandardAutocompleteDisplayService,
        public ippAutoCompleteDisplayService: AigIppAutocompleteDisplayService,
    ) { }

    procurementLotCategoryNewUpdateForm: FormGroup;

    isUpdate: boolean = false;

    procurementLotCategoryResult: any;

    filteredCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredProcurementLot: Observable<ProcurementLotDTO[]>;

    ngOnInit(): void {
        this.procurementLotCategoryNewUpdateForm = this._formBuilder.group({
            id: [null],
            procurementLot: [this.procurementLot, [Validators.required, AigValidator.haveId]],
            category: [null, [Validators.required, AigValidator.haveId]],
            level: [null, [Validators.required]],
        })
        
        if (this.procurementLotCategory != null) {
            this.procurementLotCategoryNewUpdateForm.patchValue(this.procurementLotCategory);
            this.isUpdate = true;
        }

        this.filteredProcurementLot = this.ippAutocompleteService.filterProcurementLot(this.procurementLotCategoryNewUpdateForm.controls['procurementLot'].valueChanges);
        this.filteredCategory = this.standardAutocompleteFilterService.filterIppLotCategory(this.procurementLotCategoryNewUpdateForm.controls['category'].valueChanges);
    }

    async submit() {
        if (!this.procurementLotCategoryNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procurementLotCategory: ProcurementLotCategoryDTO = this.procurementLotCategoryNewUpdateForm.value;
        procurementLotCategory.categoryCode = this.procurementLotCategoryNewUpdateForm.value.category.code;
        procurementLotCategory.procurementLotId = this.procurementLotCategoryNewUpdateForm.value.procurementLot.id;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.procurementLotCategoryResourceService.updateProcurementLotCategoryUsingPUT(procurementLotCategory).toPromise();
                postOrPut = "updated";
            } else {
                await this.procurementLotCategoryResourceService.createProcurementLotCategoryUsingPOST(procurementLotCategory).toPromise();
                postOrPut = "created";
            }

            this.procurementLotCategoryResult = procurementLotCategory;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newProcurementLotCategory() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}
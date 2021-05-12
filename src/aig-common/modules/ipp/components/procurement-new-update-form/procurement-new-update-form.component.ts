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
import { ProcurementDTO, ProcurementResourceService } from 'aig-italianlegislation';
import { IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO, IlPpProcurementStatusDTO } from 'aig-standard';
import { Observable } from 'rxjs';

@Component({
    selector: 'aig-procurement-new-update-form',
    templateUrl: './procurement-new-update-form.component.html',
    styleUrls: ['./procurement-new-update-form.component.scss']
})
export class AigProcurementNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        public genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        private standardAutocompleteFilterService: AigStandardAutocompleteFilterService,
        public standardAutocompleteDisplayService: AigStandardAutocompleteDisplayService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementResourceService: ProcurementResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    procurement: ProcurementDTO;

    procurementNewUpdateForm: FormGroup;

    filteredEopoo: Observable<EopooDTO[]>;
    filteredProcurementStatus: Observable<IlPpProcurementStatusDTO[]>;
    filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
    filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;


    ngOnInit(): void {
        this.procurementNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            description: ['', Validators.required],
            totalAmount: ['', Validators.required],
            ref:[''],

            contractorEopoo: ['',[Validators.required, AigValidator.haveId]],
            status: ['', [Validators.required, AigValidator.haveId]],
            sector: ['', [Validators.required, AigValidator.haveId]],
            procedure: ['', [Validators.required, AigValidator.haveId]],
            modality: ['', [Validators.required, AigValidator.haveId]],
        })
        
        if (this.procurement != null) {
            this.procurementNewUpdateForm.patchValue(this.procurement);
        }
        
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.procurementNewUpdateForm.controls['contractorEopoo'].valueChanges);
        this.filteredProcurementStatus = this.standardAutocompleteFilterService.filterIlPpProcurementStatus(this.procurementNewUpdateForm.controls['status'].valueChanges);
        this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.procurementNewUpdateForm.controls['procedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.procurementNewUpdateForm.controls['sector'].valueChanges);
        this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementNewUpdateForm.controls['modality'].valueChanges);
    }

    async submit() {
        if (!this.procurementNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        
        this.setStep("loading");

        let procurement: any = this.procurementNewUpdateForm.value;
        
        procurement.contractorEopooCode = this.procurementNewUpdateForm.value.contractorEopoo.id;
        procurement.statusCode = this.procurementNewUpdateForm.value.status.code;
        procurement.procedureCode = this.procurementNewUpdateForm.value.procedure.code;
        procurement.sectorCode = this.procurementNewUpdateForm.value.sector.code;
        procurement.modalityCode = this.procurementNewUpdateForm.value.modality.code;

        try {
            let postOrPut: string;

            if (this.procurement.id > 0) {
                await this.procurementResourceService.updateProcurementUsingPUT(procurement).toPromise();
                postOrPut = "updated";
            } else {
                await this.procurementResourceService.createProcurementUsingPOST(procurement).toPromise();
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
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { ProcurementDTO, ProcurementResourceService } from 'aig-italianlegislation';
import { Observable } from 'rxjs';

@Component({
    selector: 'aig-procurement-new-update-form',
    templateUrl: './procurement-new-update-form.component.html',
    styleUrls: ['./procurement-new-update-form.component.scss']
})
export class AigProcurementNewUpdateFormComponent implements OnInit {
	@Input()
    procurement: ProcurementDTO;

	@Input()
    notSubmit: boolean = false;
	@Output()
	procurementChange = new EventEmitter<ProcurementDTO>();
	
    constructor(
        private _formBuilder: FormBuilder,
        public genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementResourceService: ProcurementResourceService,
        private eventService: EventService,
    ) { }

    procurementNewUpdateForm: FormGroup;

    isUpdate: boolean = false;
    procurementResult: any;

    filteredEopoo: Observable<EopooDTO[]>;

    ngOnInit(): void {
        this.procurementNewUpdateForm = this._formBuilder.group({
            id: [null],
            contractorEopoo: [null, [Validators.required, AigValidator.haveId]],
            
			description: [null, Validators.required],
            
			code: [null],
            ref:[null],
        })
        
        if (this.procurement != null && this.procurement.id != null) {
            this.procurementNewUpdateForm.patchValue(this.procurement);
            this.isUpdate = true;
        }
        
        this.filteredEopoo = this.genericAutocompleteFilterService.filterEopoo(this.procurementNewUpdateForm.controls['contractorEopoo'].valueChanges);
    }

	submitError: string = undefined;

    async submit() {
        if (!this.procurementNewUpdateForm.valid) {
            return;
        }

        let procurement: any = this.procurementNewUpdateForm.value;
		{
			procurement.contractorEopooCode = this.procurementNewUpdateForm.value.contractorEopoo.id;
		}
		this.procurementResult = procurement;
		
		if(!this.notSubmit) {
			try {
				this._fuseProgressBarService.show();
				this.setStep("loading");
				this.submitError = undefined;
	
				let postOrPut: string;
	
				if (this.isUpdate) {
					await this.procurementResourceService.updateProcurementUsingPUT(procurement).toPromise();
					postOrPut = "updated";
				} else {
					await this.procurementResourceService.createProcurementUsingPOST(procurement).toPromise();
					postOrPut = "created";
				}
				this.eventService.reloadCurrentPage();
			} catch (e) {
				this.submitError = "Error: " + e.error.title;
				this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
			} finally {
				this._fuseProgressBarService.hide();
			}
		}

		this.procurementChange.emit(this.procurementResult);
		this.setStep("complete");
    }

    newProcurement() {
        this.setStep("form");
    }

	step: any = {
        form: true,
        loading: false,
        complete: false
    };

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }

}
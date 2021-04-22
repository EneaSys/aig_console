import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { EopooDTO, ReferentDTO, ReferentResourceService } from 'aig-generic';
import { Observable } from 'rxjs';
import { AigGenericAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigGenericAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';

@Component({
    selector: 'aig-referent-new-update-form',
    templateUrl: './referent-new-update-form.component.html',
    styleUrls: ['./referent-new-update-form.component.scss']
})
export class AigReferentNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private referentResourceService: ReferentResourceService,
        private eventService: EventService,
        public genericAutocompleteFunctionService: AigGenericAutocompleteFunctionService,
        private aigGenericAutocompleteFilterService: AigGenericAutocompleteFilterService,
    ) { }

    @Input()
    referent: ReferentDTO;

    @Input()
    eopoo: EopooDTO;

    referentNewUpdateForm: FormGroup;

    filteredEopoos: Observable<EopooDTO[]>;

    ngOnInit(): void {
        
        this.referentNewUpdateForm = this._formBuilder.group({
            id: [''],
            eopoo: ['', [Validators.required, AigValidator.haveId]],
            firstname: ['', Validators.required],
            lastname: [''],
            position: [''],
        })
        
        if (this.referent != null) {
            this.referentNewUpdateForm.patchValue(this.referent);
        }

        if(this.eopoo != null){
            this.referentNewUpdateForm.controls['eopoo'].patchValue(this.eopoo); 
        }

        this.filteredEopoos = this.aigGenericAutocompleteFilterService.filterEopoo(this.referentNewUpdateForm.controls['eopoo'].valueChanges);
    }

    async submit() {
        if (!this.referentNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let referentDTO: ReferentDTO = this.referentNewUpdateForm.value;
        referentDTO.eopooId = this.referentNewUpdateForm.value.eopoo.id;

        try {
            await this.referentResourceService.createReferentUsingPOST(referentDTO).toPromise();
            this.eventService.reloadCurrentPage();
            this._snackBar.open("Referent created", null, { duration: 5000, });
            this.setStep("complete");
        } catch(e) {
            this._snackBar.open("Error: " + e.error.message, null, { duration: 10000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
     }

     newReferent() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
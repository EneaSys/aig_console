import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteFunctionService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { EopooDTO } from 'aig-generic';
import { DesignatedCompanyDTO, DesignatedCompanyResourceService, DossierDTO, DossierResourceService, PartecipationDTO } from 'aig-italianlegislation';
import { Observable } from 'rxjs';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-designated-company-new-update-form',
    templateUrl: './designated-company-new-update-form.component.html',
    styleUrls: ['./designated-company-new-update-form.component.scss']
})
export class AigDesignatedCompanyNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private designatedCompanyResourceService: DesignatedCompanyResourceService,
        private eventService: EventService,
        private ippAutocompleteService: AigIppAutocompleteService,
        private genericAutocompleteFunctionService: AigGenericAutocompleteFunctionService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public autocompleteDisplayService: AigAutocompleteDisplayService,
    ) { }

    @Input()
    designatedCompany: DossierDTO;

    designatedCompanyNewUpdateForm: FormGroup;

    filteredEopoos: Observable<EopooDTO[]>;
    filteredPartecipations: Observable<PartecipationDTO[]>;

    ngOnInit(): void {
        this.designatedCompanyNewUpdateForm = this._formBuilder.group({
            companyEopooCode: ['', Validators.required],
            note: ['', Validators.required],
            partecipation: ['', Validators.required],
        
        })
        
        if (this.designatedCompany != null) {
            this.designatedCompanyNewUpdateForm.patchValue(this.designatedCompany);
        }

        this.filteredEopoos = this.genericAutocompleteFilterService.filterEopoo(this.designatedCompanyNewUpdateForm.controls['companyEopooCode'].valueChanges);
        this.filteredPartecipations = this.ippAutocompleteService.filterPartecipation(this.designatedCompanyNewUpdateForm.controls['partecipation'].valueChanges);
    }

    async submit() {
        if (!this.designatedCompanyNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let designatedCompany: DesignatedCompanyDTO = this.designatedCompanyNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.designatedCompany.id > 0) {
                await this.designatedCompanyResourceService.updateDesignatedCompanyUsingPUT(designatedCompany).toPromise();
                postOrPut = "updated";
            } else {
                await this.designatedCompanyResourceService.createDesignatedCompanyUsingPOST(designatedCompany).toPromise();
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

    newDesignatedCompany() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}
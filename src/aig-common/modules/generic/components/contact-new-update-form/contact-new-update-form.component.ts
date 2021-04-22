import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContactDTO, ContactResourceService, EopooDTO, ReferentDTO } from 'aig-generic';
import { Observable } from 'rxjs';
import { AigGenericAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigGenericAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';

@Component({
    selector: 'aig-contact-new-update-form',
    templateUrl: './contact-new-update-form.component.html',
    styleUrls: ['./contact-new-update-form.component.scss']
})
export class AigContactNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private contactResourceService: ContactResourceService,
        private eventService: EventService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteDisplayService: AigGenericAutocompleteFunctionService,
    ) { }

    @Input()
    contact: ContactDTO;

    contactNewUpdateForm: FormGroup;

    filteredEopoos: Observable<EopooDTO[]>;
    filteredReferents: Observable<ReferentDTO[]>;

    ngOnInit(): void {
        
        this.contactNewUpdateForm = this._formBuilder.group({
            id: [''],
            
            referent: ['', [Validators.required, AigValidator.haveId]],
            eopoo: ['', [Validators.required, AigValidator.haveId]],

            contactType: ['', Validators.required],
            value: ['', Validators.required],
        })
        
        if (this.contact != null) {
            this.contactNewUpdateForm.patchValue(this.contact);
        }

        this.filteredReferents = this.genericAutocompleteFilterService.filterReferent(this.contactNewUpdateForm.controls['referent'].valueChanges);

        this.filteredEopoos = this.genericAutocompleteFilterService.filterEopoo(this.contactNewUpdateForm.controls['eopoo'].valueChanges);
    }

    async submit() {
        if (!this.contactNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let contact: ContactDTO = this.contactNewUpdateForm.value;
        contact.referentId = this.contactNewUpdateForm.value.referent.id;
        contact.eopooId = this.contactNewUpdateForm.value.eopoo.id;
        //contact.contactTypeCode = this.contactNewUpdateForm.value.contactType.id; //TODO
        contact.contactTypeCode = this.contactNewUpdateForm.value.contactType;

        try {
            let postOrPut;
            if (contact.id != 0) {
                await this.contactResourceService.updateContactUsingPUT(contact).toPromise();
                postOrPut = "updated";
            } else {
                await this.contactResourceService.createContactUsingPOST(contact).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Contact: '${contact.value}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
     }

     newContact() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
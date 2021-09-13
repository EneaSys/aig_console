import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContactDTO, ContactResourceService, EopooDTO, ReferentDTO } from 'aig-generic';
import { Observable } from 'rxjs';
import { AigGenericAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from '../../services/form/autocomplete-function.service';

@Component({
    selector: 'aig-contact-new-update-form',
    templateUrl: './contact-new-update-form.component.html',
    styleUrls: ['./contact-new-update-form.component.scss']
})
export class AigContactNewUpdateFormComponent implements OnInit {
    @Input()
    contact: ContactDTO;

    @Input()
    eopoo: EopooDTO;

	@Input()
    referent: ReferentDTO;

    isUpdate: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private contactResourceService: ContactResourceService,
        private eventService: EventService,
        private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public genericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
    ) { }

	contactNewUpdateForm: FormGroup;

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    filteredEopoos: Observable<EopooDTO[]>;
    filteredReferents: Observable<ReferentDTO[]>;

	contactResult: any;

    ngOnInit(): void {
        this.contactNewUpdateForm = this._formBuilder.group({
            id: [''],
            
            referent: [this.referent, [] ],
            eopoo: [this.eopoo, [] ],

            contactTypeCode: ['', ],
            value: ['', [Validators.required]],
        })
        
        if (this.contact != null && this.contact.id != null) {
            this.contactNewUpdateForm.patchValue(this.contact);
            this.isUpdate = true;
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
		
		if(this.contactNewUpdateForm.value.referent){
			contact.referentId = this.contactNewUpdateForm.value.referent.id;
        }
        if(this.contactNewUpdateForm.value.eopoo){
			contact.eopooId = this.contactNewUpdateForm.value.eopoo.id;
        }
        

        try {
            let postOrPut : string;
            if (this.isUpdate) {
                await this.contactResourceService.updateContactUsingPUT(contact).toPromise();
                postOrPut = "updated";
            } else {
                await this.contactResourceService.createContactUsingPOST(contact).toPromise();
                postOrPut = "created";
            }

            this.contactResult = contact;

            this.eventService.reloadCurrentPage();

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

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
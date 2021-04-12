import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ContactDTO, ContactResourceService } from 'aig-generic';

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
        //public autocompleteDisplayService: AigAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        //private commerceAutocompleteService: AigCommerceAutocompleteService,
        private contactResourceService: ContactResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    contact: ContactDTO;

    isUpdate: boolean = false;

    contactNewUpdateForm: FormGroup;

    ngOnInit(): void {
        
        this.contactNewUpdateForm = this._formBuilder.group({
            id: [''],
            contactTypeCode: ['', Validators.required],
            value: ['', Validators.required],
            referentLastname: ['', Validators.required],
            eopooTaxNumber: ['', Validators.required],
        })
        
        if (this.contact != null) {
            this.contactNewUpdateForm.patchValue(this.contact);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.contactNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let contact: ContactDTO = {
            id: this.contactNewUpdateForm.value.id,
            contactTypeCode: this.contactNewUpdateForm.value.contactTypeCode,
            value: this.contactNewUpdateForm.value.value,
            referentLastname: this.contactNewUpdateForm.value.referentLastname,
            eopooTaxNumber: this.contactNewUpdateForm.value.eopooTaxNumber,
        }

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
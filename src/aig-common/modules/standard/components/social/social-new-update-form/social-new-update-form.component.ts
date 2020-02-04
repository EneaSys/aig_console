import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { SocialDTO, SocialResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-social-new-update-form',
    templateUrl: './social-new-update-form.component.html',
    styleUrls: ['./social-new-update-form.component.scss']
})
export class AigSocialNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippSocialResourceService: SocialResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippSocial: SocialDTO;

    ippSocialNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippSocialNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
    }

    async submit() {
        if (!this.ippSocialNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippSocial: SocialDTO = {
            name: this.ippSocialNewUpdateForm.value.name,
            code: this.ippSocialNewUpdateForm.value.code,
            wikiCode: this.ippSocialNewUpdateForm.value.wikiCode
        };

        try {
            let postOrPut;
            if (ippSocial.id != 0) {
                await this.ippSocialResourceService.updateSocialUsingPUT(ippSocial).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippSocialResourceService.createSocialUsingPOST(ippSocial).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Social: '${ippSocial.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

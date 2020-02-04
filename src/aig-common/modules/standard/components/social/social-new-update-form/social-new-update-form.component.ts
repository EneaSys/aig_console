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
        private socialResourceService: SocialResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    social: SocialDTO;

    socialNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.socialNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
    }

    async submit() {
        if (!this.socialNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let social: SocialDTO = {
            name: this.socialNewUpdateForm.value.name,
            code: this.socialNewUpdateForm.value.code,
            wikiCode: this.socialNewUpdateForm.value.wikiCode
        };

        try {
            let postOrPut;
            if (social.id != 0) {
                await this.socialResourceService.updateSocialUsingPUT(social).toPromise();
                postOrPut = "updated";
            } else {
                await this.socialResourceService.createSocialUsingPOST(social).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Social: '${social.name}' ${postOrPut}.`, null, { duration: 2000, });
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

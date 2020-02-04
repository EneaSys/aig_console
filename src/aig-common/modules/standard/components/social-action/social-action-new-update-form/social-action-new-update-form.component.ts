import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { SocialActionDTO, SocialActionResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-social-action-new-update-form',
    templateUrl: './social-action-new-update-form.component.html',
    styleUrls: ['./social-action-new-update-form.component.scss']
})
export class AigSocialActionNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippSocialActionResourceService: SocialActionResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippSocialAction: SocialActionDTO;

    ippSocialActionNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippSocialActionNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
    }

    async submit() {
        if (!this.ippSocialActionNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippSocialAction: SocialActionDTO = {
            name: this.ippSocialActionNewUpdateForm.value.name,
            code: this.ippSocialActionNewUpdateForm.value.code,
            wikiCode: this.ippSocialActionNewUpdateForm.value.wikiCode
        };

        try {
            let postOrPut;
            if (ippSocialAction.id != 0) {
                await this.ippSocialActionResourceService.updateSocialActionUsingPUT(ippSocialAction).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippSocialActionResourceService.createSocialActionUsingPOST(ippSocialAction).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp SocialAction: '${ippSocialAction.name}' ${postOrPut}.`, null, { duration: 2000, });
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

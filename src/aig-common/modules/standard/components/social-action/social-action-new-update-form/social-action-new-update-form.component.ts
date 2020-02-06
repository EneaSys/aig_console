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
        private socialActionResourceService: SocialActionResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    socialAction: SocialActionDTO;

    socialActionNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.socialActionNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
    }

    async submit() {
        if (!this.socialActionNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let socialAction: SocialActionDTO = {
            name: this.socialActionNewUpdateForm.value.name,
            code: this.socialActionNewUpdateForm.value.code,
            wikiCode: this.socialActionNewUpdateForm.value.wikiCode
        };

        try {
            let postOrPut;
            if (socialAction.id != 0) {
                await this.socialActionResourceService.updateSocialActionUsingPUT(socialAction).toPromise();
                postOrPut = "updated";
            } else {
                await this.socialActionResourceService.createSocialActionUsingPOST(socialAction).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp SocialAction: '${socialAction.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newSocialAction() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

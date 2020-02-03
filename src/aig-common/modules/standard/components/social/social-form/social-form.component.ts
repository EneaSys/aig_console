import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { SocialDTO, SocialResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-social-form',
    templateUrl: './social-form.component.html',
    styleUrls: ['./social-form.component.scss']
})
export class AigSocialFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private socialResourceService: SocialResourceService,
        private eventService: EventService,
    ) { }

    private ippSocialNewUpdateForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public social: SocialDTO;

    ngOnInit(): void {
        this.ippSocialNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
    }

    public createSocial(){
        if (!this.ippSocialNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let social: SocialDTO = {
            name: this.ippSocialNewUpdateForm.value.name,
            code: this.ippSocialNewUpdateForm.value.code,
            wikiCode: this.ippSocialNewUpdateForm.value.wikiCode
        };

        this.socialResourceService.createSocialUsingPOST(social).subscribe(
            (value: SocialDTO) => {
                this.social = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Social: " + value.name + " created.", null, {duration: 2000,});
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.title, null, {duration: 5000,});
                this._fuseProgressBarService.hide();
                this.setStep("form");
            }
        );
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}

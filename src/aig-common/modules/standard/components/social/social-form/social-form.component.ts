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

    private socialNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public socialDTO: SocialDTO;

    ngOnInit(): void {
        this.socialNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['', Validators.required]
        })
    }

    public createSocial(){
        if (!this.socialNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let socialDTO: SocialDTO = {
            name: this.socialNewForm.value.name,
            code: this.socialNewForm.value.code,
            wikiCode: this.socialNewForm.value.wikiCode
        };

        this.socialResourceService.createSocialUsingPOST(socialDTO).subscribe(
            (value: SocialDTO) => {
                this.socialDTO = value;

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

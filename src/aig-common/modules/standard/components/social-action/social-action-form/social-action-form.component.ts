import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { SocialActionDTO, SocialActionResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-social-action-form',
    templateUrl: './social-action-form.component.html',
    styleUrls: ['./social-action-form.component.scss']
})
export class AigSocialActionFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private actionResourceService: SocialActionResourceService,
        private eventService: EventService,
    ) { }

    private actionNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public actionDTO: SocialActionDTO;

    ngOnInit(): void {
        this.actionNewForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
    }

    public createAction(){
        if (!this.actionNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let actionDTO: SocialActionDTO = {
            name: this.actionNewForm.value.name,
            code: this.actionNewForm.value.code,
            wikiCode: this.actionNewForm.value.wikiCode
        };

        this.actionResourceService.createSocialActionUsingPOST(actionDTO).subscribe(
            (value: SocialActionDTO) => {
                this.actionDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Social Action: " + value.name + " created.", null, {duration: 2000,});
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

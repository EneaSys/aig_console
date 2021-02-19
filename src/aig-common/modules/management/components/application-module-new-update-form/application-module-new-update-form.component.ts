import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import { ApplicationModuleDTO, ApplicationModuleResourceService } from "api-gest";

@Component({
    selector: 'aig-application-module-new-update-form',
    templateUrl: './application-module-new-update-form.component.html',
    styleUrls: ['./application-module-new-update-form.component.scss']
})
export class AigApplicationModuleNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private applicationModuleResourceService: ApplicationModuleResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    applicationModule: ApplicationModuleDTO;

    applicationModuleNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.applicationModuleNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],           
        })
        
        if (this.applicationModule != null) {
            this.applicationModuleNewUpdateForm.patchValue(this.applicationModule);
        }
    }

    async submit() {
        if (!this.applicationModuleNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let applicationModule: ApplicationModuleDTO = this.applicationModuleNewUpdateForm.value;

        try {
            let postOrPut: string;
            if (applicationModule.id != 0) {
                await this.applicationModuleResourceService.updateApplicationModuleUsingPUT(applicationModule).toPromise();
                postOrPut = "updated";
            } else {
                await this.applicationModuleResourceService.createApplicationModuleUsingPOST(applicationModule).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newApplicationModule() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}

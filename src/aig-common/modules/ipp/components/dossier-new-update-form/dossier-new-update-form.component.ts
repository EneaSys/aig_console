import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { DossierDTO, DossierResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'aig-dossier-new-update-form',
    templateUrl: './dossier-new-update-form.component.html',
    styleUrls: ['./dossier-new-update-form.component.scss']
})
export class AigDossierNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dossierResourceService: DossierResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    dossier: DossierDTO;

    dossierNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.dossierNewUpdateForm = this._formBuilder.group({
            id:[''],
            description: ['', Validators.required],
            code: ['', Validators.required],
            
        })
        
        if (this.dossier != null) {
            this.dossierNewUpdateForm.patchValue(this.dossier);
        }
    }

    async submit() {
        if (!this.dossierNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let dossier: DossierDTO = this.dossierNewUpdateForm.value;

        console.log(this.dossier);
        try {
            let postOrPut: string;

            if (this.dossier.id > 0) {
                await this.dossierResourceService.updateDossierUsingPUT(dossier).toPromise();
                postOrPut = "updated";
            } else {
                await this.dossierResourceService.createDossierUsingPOST(dossier).toPromise();
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

    newDossier() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

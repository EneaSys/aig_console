import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { PartecipationStatusDTO, PartecipationStatusResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'aig-partecipation-status-new-update-form',
    templateUrl: './partecipation-status-new-update-form.component.html',
    styleUrls: ['./partecipation-status-new-update-form.component.scss']
})
export class AigPartecipationStatusNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private partecipationStatusResourceService: PartecipationStatusResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    partecipationStatus: PartecipationStatusDTO;

    partecipationStatusNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.partecipationStatusNewUpdateForm = this._formBuilder.group({
            id:[''],
            
        })
        
        if (this.partecipationStatus != null) {
            this.partecipationStatusNewUpdateForm.patchValue(this.partecipationStatus);
        }
    }

    async submit() {
        if (!this.partecipationStatusNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let partecipationStatus: PartecipationStatusDTO = this.partecipationStatusNewUpdateForm.value;

        console.log(this.partecipationStatus);
        try {
            let postOrPut: string;

            if (this.partecipationStatus.id > 0) {
                await this.partecipationStatusResourceService.updatePartecipationStatusUsingPUT(partecipationStatus).toPromise();
                postOrPut = "updated";
            } else {
                await this.partecipationStatusResourceService.createPartecipationStatusUsingPOST(partecipationStatus).toPromise();
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

    newPartecipationStatus() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}

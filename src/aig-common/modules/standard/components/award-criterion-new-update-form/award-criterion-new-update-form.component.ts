import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotAwardCriterionResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-award-criterion-new-update-form',
    templateUrl: './award-criterion-new-update-form.component.html',
    styleUrls: ['./award-criterion-new-update-form.component.scss']
})
export class AigAwardCriterionNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private awardCriterionResourceService: IlPpProcurementLotAwardCriterionResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    awardCriterion: IlPpProcurementLotAwardCriterionDTO;

    awardCriterionNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.awardCriterionNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: [''],
            description: ['', Validators.required],
            name: [''],
            wikiCode: [''],
        })

        if (this.awardCriterion != null) {
            this.awardCriterionNewUpdateForm.patchValue(this.awardCriterion);
        }
    }

    async submit() {
        if (!this.awardCriterionNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let awardCriterion: IlPpProcurementLotAwardCriterionDTO = this.awardCriterionNewUpdateForm.value;

        try {
            let postOrPut;
            if (awardCriterion.id != 0) {
                await this.awardCriterionResourceService.updateIlPpProcurementLotAwardCriterionUsingPUT(awardCriterion).toPromise();
                postOrPut = "updated";
            } else {
                await this.awardCriterionResourceService.createIlPpProcurementLotAwardCriterionUsingPOST(awardCriterion).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Award Criterion: '${awardCriterion.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newAwardCriterion() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
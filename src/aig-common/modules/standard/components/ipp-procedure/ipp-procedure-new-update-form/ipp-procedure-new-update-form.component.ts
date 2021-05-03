import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlPpProcurementProcedureDTO, IlPpProcurementProcedureResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-procedure-new-update-form',
    templateUrl: './ipp-procedure-new-update-form.component.html',
    styleUrls: ['./ipp-procedure-new-update-form.component.scss']
})
export class AigIppProcedureNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippProcedureResourceService: IlPpProcurementProcedureResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippProcedure: IlPpProcurementProcedureDTO;

    ippProcedureNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippProcedureNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })

        if (this.ippProcedure != null) {
            this.ippProcedureNewUpdateForm.patchValue(this.ippProcedure);
        }
    }

    async submit() {
        if (!this.ippProcedureNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippProcedure: IlPpProcurementProcedureDTO = this.ippProcedureNewUpdateForm.value;

         try {
            let postOrPut;
            if (ippProcedure.id != 0) {
                await this.ippProcedureResourceService.updateIlPpProcurementProcedureUsingPUT(ippProcedure).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippProcedureResourceService.createIlPpProcurementProcedureUsingPOST(ippProcedure).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Procedure: '${ippProcedure.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newIppProcedure() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

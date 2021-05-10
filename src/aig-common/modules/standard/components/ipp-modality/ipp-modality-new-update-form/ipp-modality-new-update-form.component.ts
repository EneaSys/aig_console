import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlPpProcurementModalityDTO, IlPpProcurementModalityResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-modality-new-update-form',
    templateUrl: './ipp-modality-new-update-form.component.html',
    styleUrls: ['./ipp-modality-new-update-form.component.scss']
})
export class AigIppModalityNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippModalityResourceService: IlPpProcurementModalityResourceService,
        private eventService: EventService,
    ) { }
    
    @Input()
    ippModality: IlPpProcurementModalityDTO;

    ippModalityNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippModalityNewUpdateForm = this._formBuilder.group({
            id: [''],
            description: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })

        if (this.ippModality != null) {
            this.ippModalityNewUpdateForm.patchValue(this.ippModality);
        }
    }

    async submit() {
        if (!this.ippModalityNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippModality: IlPpProcurementModalityDTO = this.ippModalityNewUpdateForm.value;

        try {
            let postOrPut;
            if (ippModality.id != 0) {
                await this.ippModalityResourceService.updateIlPpProcurementModalityUsingPUT(ippModality).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippModalityResourceService.createIlPpProcurementModalityUsingPOST(ippModality).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Modality: '${ippModality.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newIppModality() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

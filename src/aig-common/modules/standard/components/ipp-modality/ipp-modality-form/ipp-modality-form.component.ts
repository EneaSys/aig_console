import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO  } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-modality-form',
    templateUrl: './ipp-modality-form.component.html',
    styleUrls: ['./ipp-modality-form.component.scss']
})
export class AigIppModalityFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
        private eventService: EventService,
    ) { }
    
    @Input()
    ippModality: ItalianPublicProcurementModalityDTO;

    ippModalityNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippModalityNewUpdateForm = this._formBuilder.group({
            id: [''],
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

        let ippModality = this.ippModalityNewUpdateForm.value;

        try {
            let postOrPut;
            if (ippModality.id != null && ippModality.id != "") {
                await this.ippModalityResourceService.updateItalianPublicProcurementModalityUsingPUT(ippModality).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippModalityResourceService.createItalianPublicProcurementModalityUsingPOST(ippModality).toPromise();
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

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

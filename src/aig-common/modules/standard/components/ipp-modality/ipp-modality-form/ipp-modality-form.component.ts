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
    ippModalityDTO: ItalianPublicProcurementModalityDTO;

    ippModalityNewForm: FormGroup;

    ngOnInit(): void {
        this.ippModalityNewForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })

        if (this.ippModalityDTO != null) {
            this.ippModalityNewForm.patchValue(this.ippModalityDTO);
        }
    }

    async submit() {
        if (!this.ippModalityNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippModalityDTO = this.ippModalityNewForm.value;

        try {
            let postOrPut;
            if (ippModalityDTO.id != null && ippModalityDTO.id != "") {
                await this.ippModalityResourceService.updateItalianPublicProcurementModalityUsingPUT(ippModalityDTO).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippModalityResourceService.createItalianPublicProcurementModalityUsingPOST(ippModalityDTO).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Modality: '${ippModalityDTO.name}' ${postOrPut}.`, null, { duration: 2000, });
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

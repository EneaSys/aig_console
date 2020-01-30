import { Component, OnInit } from '@angular/core';
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
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
        private eventService: EventService,
    ) { }

    private ippModalityNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public ippModalityDTO: ItalianPublicProcurementModalityDTO;

    ngOnInit(): void {
        this.ippModalityNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['', Validators.required]
        })
    }

    public createIppModality(){
        if (!this.ippModalityNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippModalityDTO: ItalianPublicProcurementModalityDTO = {
            name: this.ippModalityNewForm.value.name,
            code: this.ippModalityNewForm.value.code,
            wikiCode: this.ippModalityNewForm.value.wikiCode
        };

        this.ippModalityResourceService.createItalianPublicProcurementModalityUsingPOST(ippModalityDTO).subscribe(
            (value: ItalianPublicProcurementModalityDTO) => {
                this.ippModalityDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Ipp Modality: " + value.name + " created.", null, {duration: 2000,});
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

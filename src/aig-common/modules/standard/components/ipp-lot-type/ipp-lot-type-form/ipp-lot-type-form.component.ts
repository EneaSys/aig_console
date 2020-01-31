import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ItalianPublicProcurementLotTypeDTO, ItalianPublicProcurementLotTypeResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-lot-type-form',
    templateUrl: './ipp-lot-type-form.component.html',
    styleUrls: ['./ipp-lot-type-form.component.scss']
})
export class AigIppLotTypeNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private lotResourceService: ItalianPublicProcurementLotTypeResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    lotDTO: ItalianPublicProcurementLotTypeDTO;

    lotNewForm: FormGroup;
    

    ngOnInit(): void {
        this.lotNewForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })

        if (this.lotDTO != null) {
            this.lotNewForm.patchValue(this.lotDTO);
        }
    }

    async submit() {
        if (!this.lotNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let lotDTO = this.lotNewForm.value;

        try {
            let postOrPut;
            if (lotDTO.id != null && lotDTO.id != "") {
                await this.lotResourceService.updateItalianPublicProcurementLotTypeUsingPUT(lotDTO).toPromise();
                postOrPut = "updated";
            } else {
                await this.lotResourceService.createItalianPublicProcurementLotTypeUsingPOST(lotDTO).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp LotType: '${lotDTO.name}' ${postOrPut}.`, null, { duration: 2000, });
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

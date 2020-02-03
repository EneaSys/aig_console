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
        private ippLotTypeResourceService: ItalianPublicProcurementLotTypeResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippLotType: ItalianPublicProcurementLotTypeDTO;

    ippLotTypeNewUpdateForm: FormGroup;
    

    ngOnInit(): void {
        this.ippLotTypeNewUpdateForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })

        if (this.ippLotType != null) {
            this.ippLotTypeNewUpdateForm.patchValue(this.ippLotType);
        }
    }

    async submit() {
        if (!this.ippLotTypeNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippLotType = this.ippLotTypeNewUpdateForm.value;

        try {
            let postOrPut;
            if (ippLotType.id != null && ippLotType.id != "") {
                await this.ippLotTypeResourceService.updateItalianPublicProcurementLotTypeUsingPUT(ippLotType).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippLotTypeResourceService.createItalianPublicProcurementLotTypeUsingPOST(ippLotType).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp LotType: '${ippLotType.name}' ${postOrPut}.`, null, { duration: 2000, });
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

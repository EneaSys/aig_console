import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlPpProcurementLotTypeDTO, IlPpProcurementLotTypeResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-lot-type-new-update-form',
    templateUrl: './ipp-lot-type-new-update-form.component.html',
    styleUrls: ['./ipp-lot-type-new-update-form.component.scss']
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
        private ippLotTypeResourceService: IlPpProcurementLotTypeResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippLotType: IlPpProcurementLotTypeDTO;

    isUpdate: boolean = false;

    ippLotTypeResult: any;

    ippLotTypeNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippLotTypeNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            wikiCode:[''],
            expirationDate:[''],
        })

        if (this.ippLotType != null && this.ippLotType.id != null) {
            this.ippLotTypeNewUpdateForm.patchValue(this.ippLotType);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.ippLotTypeNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippLotType: IlPpProcurementLotTypeDTO = this.ippLotTypeNewUpdateForm.value;

        try {
            let postOrPut: string;
            if (this.isUpdate) {
                await this.ippLotTypeResourceService.updateIlPpProcurementLotTypeUsingPUT(ippLotType).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippLotTypeResourceService.createIlPpProcurementLotTypeUsingPOST(ippLotType).toPromise();
                postOrPut = "created";
            }

            this.ippLotTypeResult = ippLotType;

            this.eventService.reloadCurrentPage();

            this.setStep("complete");

        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newIppLotType() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
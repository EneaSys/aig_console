import { Component, OnInit } from '@angular/core';
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
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private lotResourceService: ItalianPublicProcurementLotTypeResourceService,
        private eventService: EventService,
    ) { }

    private lotNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public lotDTO: ItalianPublicProcurementLotTypeDTO;

    ngOnInit(): void {
        this.lotNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['', Validators.required]
        })
    }

    public createLot(){
        if (!this.lotNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let lotDTO: ItalianPublicProcurementLotTypeDTO = {
            name: this.lotNewForm.value.name,
            code: this.lotNewForm.value.code,
            wikiCode: this.lotNewForm.value.wikiCode
        };

        this.lotResourceService.createItalianPublicProcurementLotTypeUsingPOST(lotDTO).subscribe(
            (value: ItalianPublicProcurementLotTypeDTO) => {
                this.lotDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Ipp LotType: " + value.name + " created.", null, {duration: 2000,});
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

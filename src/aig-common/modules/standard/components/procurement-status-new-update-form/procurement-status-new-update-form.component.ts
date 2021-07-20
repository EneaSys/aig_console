import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { IlPpProcurementStatusDTO, IlPpProcurementStatusResourceService } from 'aig-standard';

@Component({
    selector: 'aig-procurement-status-new-update-form',
    templateUrl: './procurement-status-new-update-form.component.html',
    styleUrls: ['./procurement-status-new-update-form.component.scss']
})
export class AigProcurementStatusNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementStatusResourceService: IlPpProcurementStatusResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    procurementStatus: IlPpProcurementStatusDTO;

    isUpdate: boolean = false;

    procurementStatusResult: any;

    procurementStatusNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.procurementStatusNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            wikiCode:['']
        })
        
        if (this.procurementStatus != null && this.procurementStatus.id != null) {
            this.procurementStatusNewUpdateForm.patchValue(this.procurementStatus);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.procurementStatusNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procurementStatus: IlPpProcurementStatusDTO = this.procurementStatusNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.procurementStatusResourceService.updateIlPpProcurementStatusUsingPUT(procurementStatus).toPromise();
                postOrPut = "updated";
            } else {
                await this.procurementStatusResourceService.createIlPpProcurementStatusUsingPOST(procurementStatus).toPromise();
                postOrPut = "created";
            }

            this.procurementStatusResult = procurementStatus;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");

        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }

        this._fuseProgressBarService.hide();
    }

    newProcurementStatus() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;	
        this.step[stepToShow] = true;
    }
}
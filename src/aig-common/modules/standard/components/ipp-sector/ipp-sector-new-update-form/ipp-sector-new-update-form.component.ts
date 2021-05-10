import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlPpProcurementSectorDTO, IlPpProcurementSectorResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-sector-new-update-form',
    templateUrl: './ipp-sector-new-update-form.component.html',
    styleUrls: ['./ipp-sector-new-update-form.component.scss']
})
export class AigIppSectorNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippSectorResourceService: IlPpProcurementSectorResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippSector: IlPpProcurementSectorDTO;

    ippSectorNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippSectorNewUpdateForm = this._formBuilder.group({
            id:[''],
            description:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })

        if (this.ippSector != null) {
            this.ippSectorNewUpdateForm.patchValue(this.ippSector);
        }
    }

    async submit() {
        if (!this.ippSectorNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippSector: IlPpProcurementSectorDTO = this.ippSectorNewUpdateForm.value;

        try {
            let postOrPut;
            if (ippSector.id != 0) {
                await this.ippSectorResourceService.updateIlPpProcurementSectorUsingPUT(ippSector).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippSectorResourceService.createIlPpProcurementSectorUsingPOST(ippSector).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Sector: '${ippSector.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newIppSector() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

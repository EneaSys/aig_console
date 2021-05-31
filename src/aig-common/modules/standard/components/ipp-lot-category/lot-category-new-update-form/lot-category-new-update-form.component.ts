import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { IlPpProcurementLotCategoryDTO, IlPpProcurementLotCategoryResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-lot-category-new-update-form',
    templateUrl: './lot-category-new-update-form.component.html',
    styleUrls: ['./lot-category-new-update-form.component.scss']
})
export class AigLotCategoryNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippLotCategoryResourceService: IlPpProcurementLotCategoryResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippLotCategory: IlPpProcurementLotCategoryDTO;

    ippLotCategoryNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippLotCategoryNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            wikiCode:['']
        })

        if (this.ippLotCategory != null) {
            this.ippLotCategoryNewUpdateForm.patchValue(this.ippLotCategory);
        }
    }

    async submit() {
        if (!this.ippLotCategoryNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");
        let ippLotCategory: IlPpProcurementLotCategoryDTO = this.ippLotCategoryNewUpdateForm.value;

        try {
            let postOrPut;
            if (ippLotCategory.id != 0) {
                await this.ippLotCategoryResourceService.updateIlPpProcurementLotCategoryUsingPUT(ippLotCategory).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippLotCategoryResourceService.createIlPpProcurementLotCategoryUsingPOST(ippLotCategory).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Lot Category: '${ippLotCategory.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newIppLotCategory() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}

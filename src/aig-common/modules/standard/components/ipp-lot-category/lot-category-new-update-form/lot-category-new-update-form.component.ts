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

    isUpdate: boolean = false;

    ippLotCategoryResult: any;

    ippLotCategoryNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.ippLotCategoryNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: [''],
            wikiCode:[''],
            expirationDate :[''],
        })

        if (this.ippLotCategory != null && this.ippLotCategory.id != null) {
            this.ippLotCategoryNewUpdateForm.patchValue(this.ippLotCategory);
            this.isUpdate = true;
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
            let postOrPut: string;
            if (this.isUpdate) {
                await this.ippLotCategoryResourceService.updateIlPpProcurementLotCategoryUsingPUT(ippLotCategory).toPromise();
                postOrPut = "updated";
            } else {
                await this.ippLotCategoryResourceService.createIlPpProcurementLotCategoryUsingPOST(ippLotCategory).toPromise();
                postOrPut = "created";
            }

            this.ippLotCategoryResult = ippLotCategory;

            this.eventService.reloadCurrentPage();

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

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
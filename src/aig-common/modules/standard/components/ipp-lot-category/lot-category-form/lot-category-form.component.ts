import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-lot-category-form',
    templateUrl: './lot-category-form.component.html',
    styleUrls: ['./lot-category-form.component.scss']
})
export class AigLotCategoryNewUpdateFormComponent implements OnInit {

    private step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private categoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    ippLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO;

    lotcategoryNewForm: FormGroup;

    ngOnInit(): void {
        this.lotcategoryNewForm = this._formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })

        if (this.ippLotCategoryDTO != null) {
            this.lotcategoryNewForm.patchValue(this.ippLotCategoryDTO);
        }
    }

    async submit() {
        if (!this.lotcategoryNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let ippLotCategoryDTO = this.lotcategoryNewForm.value;

        try {
            let postOrPut;
            if (ippLotCategoryDTO.id != null && ippLotCategoryDTO.id != "") {
                await this.categoryResourceService.updateItalianPublicProcurementLotCategoryUsingPUT(ippLotCategoryDTO).toPromise();
                postOrPut = "updated";
            } else {
                await this.categoryResourceService.createItalianPublicProcurementLotCategoryUsingPOST(ippLotCategoryDTO).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Lot Category: '${ippLotCategoryDTO.name}' ${postOrPut}.`, null, { duration: 2000, });
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

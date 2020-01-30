import { Component, OnInit } from '@angular/core';
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
export class AigLotCategoryFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private categoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        private eventService: EventService,
    ) { }

    private categoryNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public categoryDTO: ItalianPublicProcurementLotCategoryDTO;

    ngOnInit(): void {
        this.categoryNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['', Validators.required]
        })
    }

    public createCategory(){
        if (!this.categoryNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let categoryDTO: ItalianPublicProcurementLotCategoryDTO = {
            name: this.categoryNewForm.value.name,
            code: this.categoryNewForm.value.code,
            wikiCode: this.categoryNewForm.value.wikiCode
        };

        this.categoryResourceService.createItalianPublicProcurementLotCategoryUsingPOST(categoryDTO).subscribe(
            (value: ItalianPublicProcurementLotCategoryDTO) => {
                this.categoryDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Lot Category: " + value.name + " created.", null, {duration: 2000,});
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

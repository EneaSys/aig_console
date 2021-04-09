import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { GenericEopooDTO } from 'aig-generic';

@Component({
    selector: 'aig-generic-eopoo-new-update-form',
    templateUrl: './generic-eopoo-new-update-form.component.html',
    styleUrls: ['./generic-eopoo-new-update-form.component.scss']
})
export class AigGenericEopooNewUpdateFormComponent implements OnInit {

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        //public autocompleteDisplayService: AigAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        //private commerceAutocompleteService: AigCommerceAutocompleteService,
        //private priceListResourceService: PriceListResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    genericEopoo: GenericEopooDTO;

    isUpdate: boolean = false;

    genericEopooNewUpdateForm: FormGroup;

    ngOnInit(): void {
        
        this.genericEopooNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
        })
        
        if (this.genericEopoo != null) {
            this.genericEopooNewUpdateForm.patchValue(this.genericEopoo);
            this.isUpdate = true;
        }

        /*if(this.catalog != null){
            this.priceListNewUpdateForm.controls['catalog'].patchValue(this.catalog);
        }*/

        //this.filteredCatalog = this.commerceAutocompleteService.filterCatalog(this.priceListNewUpdateForm.controls['catalog'].valueChanges);
    }

    async submit() {
        if (!this.genericEopooNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let genericEopoo: GenericEopooDTO = {
            id: this.genericEopooNewUpdateForm.value.id,
            name: this.genericEopooNewUpdateForm.value.name,
        }

        try {
            let postOrPut;
            if (genericEopoo.id != 0) {
                /*await this.priceListResourceService.updatePriceListUsingPUT(priceList).toPromise();
                postOrPut = "updated";
            } else {
                await this.priceListResourceService.createPriceListUsingPOST(priceList).toPromise();
                postOrPut = "created";*/
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Generic Eopoo: '${genericEopoo.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
     }

     newGenericEopoo() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
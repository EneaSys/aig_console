import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogItemDTO, PriceListDTO, PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-price-list-item-new-update-form',
    templateUrl: './price-list-item-new-update-form.component.html',
    styleUrls: ['./price-list-item-new-update-form.component.scss']
})
export class AigPriceListItemNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        public autocompleteDisplayService: AigAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private commerceAutocompleteService: AigCommerceAutocompleteService,
        private priceListItemResourceService: PriceListItemResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    priceListItem: PriceListItemDTO;

    priceListItemNewUpdateForm: FormGroup;
    
    filteredCatalogItem: Observable<CatalogItemDTO[]>;

    filteredPriceList: Observable<PriceListDTO[]>;

    ngOnInit(): void {
        this.priceListItemNewUpdateForm = this._formBuilder.group({
            id:[''],
            amount:['', Validators.required],
            catalogItem:['', Validators.required],
            priceList: ['', Validators.required],
        })
        
        if (this.priceListItem != null) {
            this.priceListItemNewUpdateForm.patchValue(this.priceListItem);
        }

        this.filteredCatalogItem = this.commerceAutocompleteService.filterCatalogItem(this.priceListItemNewUpdateForm.controls['catalogItem'].valueChanges);

        this.filteredPriceList = this.commerceAutocompleteService.filterPriceList(this.priceListItemNewUpdateForm.controls['priceList'].valueChanges);
    }

    async submit() {
        if (!this.priceListItemNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let priceListItem: PriceListItemDTO = {
            id: this.priceListItemNewUpdateForm.controls.id.value,
            amount: this.priceListItemNewUpdateForm.controls.amount.value,
            catalogItemId: this.priceListItemNewUpdateForm.controls.catalogItem.value.id,
            priceListId: this.priceListItemNewUpdateForm.controls.priceList.value.id,
        }

        try {
            let postOrPut;
            if (priceListItem.id != 0) {
                await this.priceListItemResourceService.updatePriceListItemUsingPUT(priceListItem).toPromise();
                postOrPut = "updated";
            } else {
                await this.priceListItemResourceService.createPriceListItemUsingPOST(priceListItem).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`PriceListItem: '${priceListItem.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
     }

     newPriceListItem() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
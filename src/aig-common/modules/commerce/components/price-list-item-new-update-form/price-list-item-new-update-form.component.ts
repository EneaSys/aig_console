import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogItemDTO, PriceListDTO, PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

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
        public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
        private priceListItemResourceService: PriceListItemResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    priceListItem: PriceListItemDTO;

    @Input()
    priceList: PriceListDTO;

    @Input()
    catalogItem: CatalogItemDTO;

    priceListItemNewUpdateForm: FormGroup;
    
    filteredCatalogItem: Observable<CatalogItemDTO[]>;

    filteredPriceList: Observable<PriceListDTO[]>;

    catalogId: number;

    isUpdate: boolean = false;

    ngOnInit(): void {
        this.priceListItemNewUpdateForm = this._formBuilder.group({
            id:[''],
            amount:['', [Validators.required]],
            catalogItem: ['', [Validators.required, AigValidator.haveId]],
            priceList: ['', [Validators.required, AigValidator.haveId]],
        })
        
        if (this.priceListItem != null) {
            this.isUpdate = true;
            this.priceListItemNewUpdateForm.patchValue(this.priceListItem);
        }
        
        if(this.catalogItem != null) {
            this.priceListItemNewUpdateForm.controls['catalogItem'].patchValue(this.catalogItem);
        }
        
        if (this.priceList != null) {
            this.priceListItemNewUpdateForm.controls['priceList'].patchValue(this.priceList);
        }

        this.filteredPriceList = this.commerceAutocompleteService.filterPriceList(this.priceListItemNewUpdateForm.controls['priceList'].valueChanges);

        this.priceListItemNewUpdateForm.controls['priceList'].valueChanges.subscribe(
			(priceList: PriceListDTO) => {
				this.priceListItemNewUpdateForm.controls['catalogItem'].setValue("");
				if(priceList.id) {
					this.filteredCatalogItem = this.commerceAutocompleteService.filterCatalogItemByCatalog(priceList.catalogId, this.priceListItemNewUpdateForm.controls['catalogItem'].valueChanges);
				}
			}
		);
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
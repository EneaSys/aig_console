import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogDTO, CatalogItemDTO, PriceListDTO, PriceListResourceService } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-price-list-new-update-form',
    templateUrl: './price-list-new-update-form.component.html',
    styleUrls: ['./price-list-new-update-form.component.scss']
})
export class AigPriceListNewUpdateFormComponent implements OnInit {

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
        private priceListResourceService: PriceListResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    priceList: PriceListDTO;

    @Input()
    catalog: CatalogDTO;
    
    isUpdate: boolean = false;

    priceListNewUpdateForm: FormGroup;

    filteredCatalog: Observable<CatalogDTO[]>;

    ngOnInit(): void {
        
        this.priceListNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', [Validators.required]],
            catalog: [this.catalog, [Validators.required, AigValidator.haveId]],
        })
        
        if (this.priceList != null) {
            this.priceListNewUpdateForm.patchValue(this.priceList);
            this.isUpdate = true;
        }

        if(this.catalog != null){
            //this.priceListNewUpdateForm.controls['catalog'].patchValue(this.catalog);
        }

        this.filteredCatalog = this.commerceAutocompleteService.filterCatalog(this.priceListNewUpdateForm.controls['catalog'].valueChanges);
    }

    async submit() {
        if (!this.priceListNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let priceList: PriceListDTO = {
            id: this.priceListNewUpdateForm.value.id,
            name: this.priceListNewUpdateForm.value.name,
            catalogId: this.priceListNewUpdateForm.value.catalog.id
        }

        try {
            let postOrPut;
            if (priceList.id != 0) {
                await this.priceListResourceService.updatePriceListUsingPUT(priceList).toPromise();
                postOrPut = "updated";
            } else {
                await this.priceListResourceService.createPriceListUsingPOST(priceList).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Catalog: '${priceList.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
     }

     newPriceList() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogDTO, CatalogItemDTO, CatalogItemResourceService, InventoryItemCombinationDTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-catalog-item-new-update-form',
    templateUrl: './catalog-item-new-update-form.component.html',
    styleUrls: ['./catalog-item-new-update-form.component.scss']
})
export class AigCatalogItemNewUpdateFormComponent implements OnInit {
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
        private catalogItemResourceService: CatalogItemResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    catalogItem: CatalogItemDTO;

    catalogItemNewUpdateForm: FormGroup;

    filteredInventoryItemCombination: Observable<InventoryItemCombinationDTO[]>;

    filteredCatalog: Observable<CatalogDTO[]>;

    ngOnInit(): void {
        this.catalogItemNewUpdateForm = this._formBuilder.group({
            id:[''],
            active:[false, Validators.required],
            inventoryItemCombination: ['', Validators.required],
            catalog: ['', Validators.required],
        })
        
        if (this.catalogItem != null) {
            this.catalogItemNewUpdateForm.patchValue(this.catalogItem);
        }

        this.filteredInventoryItemCombination = this.commerceAutocompleteService.filterInventoryItemCombination(this.catalogItemNewUpdateForm.controls['inventoryItemCombination'].valueChanges);

        this.filteredCatalog = this.commerceAutocompleteService.filterCatalog(this.catalogItemNewUpdateForm.controls['catalog'].valueChanges);
    }

    async submit() {
        if (!this.catalogItemNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let catalogItem: CatalogItemDTO = {
            id: this.catalogItemNewUpdateForm.controls.id.value,
            active: this.catalogItemNewUpdateForm.controls.active.value,
            inventoryItemCombinationId: this.catalogItemNewUpdateForm.controls.inventoryItemCombination.value.id,
            catalogId: this.catalogItemNewUpdateForm.controls.catalog.value.id,
        }

        try {
            let postOrPut;
            if (catalogItem.id != 0) {
                await this.catalogItemResourceService.updateCatalogItemUsingPUT(catalogItem).toPromise();
                postOrPut = "updated";
            } else {
                await this.catalogItemResourceService.createCatalogItemUsingPOST(catalogItem).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`CatalogItem: '${catalogItem.id}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
     }

     newCatalogItem() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
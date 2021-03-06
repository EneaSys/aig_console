import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogDTO, CatalogItemDTO, CatalogItemResourceService, InventoryItemCombinationDTO } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

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
        public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
        private catalogItemResourceService: CatalogItemResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    catalogItem: CatalogItemDTO;

    @Input()
    staticCatalog: CatalogDTO;

    @Input()
    catalog: CatalogDTO;

    isUpdate: boolean = false;

    catalogItemResult: any;

    catalogItemNewUpdateForm: FormGroup;

    filteredInventoryItemCombination: Observable<InventoryItemCombinationDTO[]>;

    filteredCatalog: Observable<CatalogDTO[]>;

    ngOnInit(): void {
        this.catalogItemNewUpdateForm = this._formBuilder.group({
            id:[''],
            active:[false, [Validators.required]],
            inventoryItemCombination: ['', [Validators.required, AigValidator.haveId]],
            catalog: ['', [Validators.required, AigValidator.haveId]],
        })
        
        if (this.catalogItem != null) {
            this.catalogItemNewUpdateForm.patchValue(this.catalogItem);
            this.isUpdate = true
        }

        if (this.staticCatalog != null) {
            this.catalogItemNewUpdateForm.controls['catalog'].patchValue(this.staticCatalog);
            this.isUpdate = false
        }

        if (this.catalog && this.catalogItem.inventoryItemCombination == null) {
            this.catalogItemNewUpdateForm.controls['catalog'].patchValue(this.catalog);
            this.isUpdate = false
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
            let postOrPut: string;
            if (this.isUpdate) {
                await this.catalogItemResourceService.updateCatalogItemUsingPUT(catalogItem).toPromise();
                postOrPut = "updated";
            } else {
                await this.catalogItemResourceService.createCatalogItemUsingPOST(catalogItem).toPromise();
                postOrPut = "created";
            }

            this.catalogItemResult = catalogItem;

            this.eventService.reloadCurrentPage();

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

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[stepToShow] = true;
    }
}
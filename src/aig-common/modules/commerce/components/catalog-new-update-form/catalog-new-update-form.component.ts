import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CatalogDTO, CatalogResourceService, SellerDTO } from 'aig-commerce';
import { EventService } from 'aig-common/event-manager/event.service';
import { Observable } from 'rxjs';
import { AigCommerceAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-catalog-new-update-form',
    templateUrl: './catalog-new-update-form.component.html',
    styleUrls: ['./catalog-new-update-form.component.scss']
})
export class AigCatalogNewUpdateFormComponent implements OnInit {
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
        private catalogResourceService: CatalogResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    catalog: CatalogDTO;

    catalogNewUpdateForm: FormGroup;

    filteredSeller: Observable<SellerDTO[]>;

    ngOnInit(): void {
        this.catalogNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            seller: ['', Validators.required],
        })
        
        if (this.catalog != null) {
            this.catalogNewUpdateForm.patchValue(this.catalog);
        }

        this.filteredSeller = this.commerceAutocompleteService.filterSeller(this.catalogNewUpdateForm.controls['seller'].valueChanges);
    }

    async submit() {
        if (!this.catalogNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let catalog: CatalogDTO = {
            id: this.catalogNewUpdateForm.value.id,
            name: this.catalogNewUpdateForm.value.name,
            sellerId: this.catalogNewUpdateForm.value.seller.id,
        }

        try {
            let postOrPut;
            if (catalog.id != 0) {
                await this.catalogResourceService.updateCatalogUsingPUT(catalog).toPromise();
                postOrPut = "updated";
            } else {
                await this.catalogResourceService.createCatalogUsingPOST(catalog).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Catalog: '${catalog.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (error) {
            this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
     }

     newCatalog() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
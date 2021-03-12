import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PriceListItemDTO, PriceListItemResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPriceListItemNewUpdateDialogComponent } from '../price-list-item-new-update-dialog/price-list-item-new-update-dialog.component';

@Component({
    selector: 'aig-price-list-item-list-page',
    templateUrl: './price-list-item-list-page.component.html',
    styleUrls: ['./price-list-item-list-page.component.scss']
})
export class AigPriceListItemListPageComponent extends GenericComponent {
    constructor(
		private priceListItemResourceService: PriceListItemResourceService,
		public autocompleteDisplayService: AigAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	priceListItemFilters = {
		amountEquals: null,
	}

	async loadPage() {
		this.priceListItemDC = ["id", "catalog", "priceList", "inventoryItemCombination", "amount", "buttons"];
		this.priceListItemDTOs = await this.priceListItemResourceService.getAllPriceListItemsUsingGET(this.priceListItemFilters).toPromise();
	}

	reloadPage() {
	}

	//			---- PRICE LIST ITEM TABLE AND SEARCH SECTION ----

	priceListItemDTOs: PriceListItemDTO[];
	priceListItemDC: string[];
	priceListItemError: any;
	
	//			---- !PRICE LIST ITEM TABLE AND SEARCH SECTION ----

	newPriceListItem(): void {
        this.dialog.open(AigPriceListItemNewUpdateDialogComponent, { data: { priceListItem: {} } });
    }
}
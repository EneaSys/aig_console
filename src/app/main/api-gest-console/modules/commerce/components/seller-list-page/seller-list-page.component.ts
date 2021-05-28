import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SellerResourceService, SellerDTO } from 'aig-commerce';
import { AigSellerNewUpdateDialogComponent } from '../seller-new-update-dialog/seller-new-update-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigCommerceGenericComponent } from '../commerce-generic-component';
import { AigCommerceAutocompleteDisplayService } from 'aig-common/modules/commerce/service/autocomplete-display.service';
import { AigCommerceAutocompleteFilterService } from 'aig-common/modules/commerce/service/autocomplete-filter.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './seller-list-page.component.html',
    styleUrls: ['./seller-list-page.component.scss']
})
export class AigSellerListPageComponent extends AigCommerceGenericComponent {
    constructor(
        private sellerResourceService: SellerResourceService,
		public autocompleteDisplayService: AigCommerceAutocompleteDisplayService,
		private commerceAutocompleteService: AigCommerceAutocompleteFilterService,
        private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initSellerSearch();

		this.showAllSeller();
	}

	reloadPage() {
		this.showAllSeller();
	}

    //			---- SELLER TABLE AND SEARCH SECTION ----

	sellerDTOs: SellerDTO[];
	sellerDC: string[];
	sellerError: any;

	sellerSearchFormGroup: FormGroup;
	sellerFilters: any;

	sellerPaginationSize: number;
	sellerLength: number;

	filteredSeller: Observable<SellerDTO[]>;

	
	private initSellerSearch() {
		this.sellerPaginationSize = 10;

		this.sellerSearchFormGroup = this._formBuilder.group({
			id: [''],
			seller: [''],
		});

		this.filteredSeller = this.commerceAutocompleteService.filterSeller(this.sellerSearchFormGroup.controls['seller'].valueChanges);

		this.sellerDC = ["id", "name", "buttons"];
	}

	private clearFiltersSeller() {
		this.sellerFilters = {
			sellerIDEquals: null,
			sellerNameEquals: null,
			page: 0,
		}
	}

	private async searchSeller(page: number) {
		this.sellerDTOs = null;

		this.sellerFilters.page = page;
		this.sellerFilters.size = this.sellerPaginationSize;

		this.filteredSeller = this.commerceAutocompleteService.filterSeller(this.sellerSearchFormGroup.controls['seller'].valueChanges);

		try {                                                                       
			this.sellerLength = await this.sellerResourceService.countSellersUsingGET(this.sellerFilters).toPromise();  
			
			if(this.sellerLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.sellerDTOs = [];
				return;
			}

			this.sellerDTOs = await this.sellerResourceService.getAllSellersUsingGET(this.sellerFilters,).toPromise();
		} catch (e) {
			this.sellerError = e;
		}
	}

	showAllSeller() {
		this.resetFiltersSeller();
	}

	resetFiltersSeller() {
		this.sellerSearchFormGroup.reset();
		this.clearFiltersSeller();
		this.searchSeller(0);
	}

	sellerPaginationEvent(pageEvent: PageEvent) {
		this.sellerPaginationSize = pageEvent.pageSize;
		this.searchSeller(pageEvent.pageIndex);
	}

	sellerSearchWithFilter() {
		let searchedId = this.sellerSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersSeller();
			this.sellerSearchFormGroup.reset();
			this.sellerFilters.sellerIDEquals = searchedId;
			this.searchSeller(0);
			return;
		}
		this.sellerFilters.sellerIDEquals = null;

		if (this.sellerSearchFormGroup.controls.seller.value) {
			this.sellerFilters.sellerNameEquals = this.sellerSearchFormGroup.controls.seller.value.name;
		}

		this.searchSeller(0);
	}

	//			---- !SELLER TABLE AND SEARCH SECTION ----

    newSeller() {
		this.dialog.open(AigSellerNewUpdateDialogComponent, { data: { seller: {} } });
	}
	
}
